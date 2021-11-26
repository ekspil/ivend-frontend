<template>
	<div class="container">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-md-12 col-lg-12">
					<div class="card">
						<div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
						<div class="card-header">
							<div class="card-title f-b" v-if="data && data.machine">Продажи автомата {{data.machine.name}} </div>
						</div>

						<div class="card-header-links">
							<router-link :to="`/stats/${$route.params.machineId}`" class="card-header-links__item">Вернуться назад</router-link>
						</div>

            <div class="stats-top-menu">
              <div class="stats-top-menu__content-container">
                <div class="stats-top-menu__date-buttons">
                  <Period @onChange="onPeriodChange"/>
                </div>

                <ExportExcel class="disabled-small" :table="{ headers: getTableHeaders, fields: getTableFieldsNoLimit }" v-if="data"/>
              </div>
            </div>


                        <div v-if="data">
                            <Table
                                    :headers="getTableHeaders"
                                    :fields="getTableFields"
                                    sortBy="timestamp"
                                    className="stats-table"
                                    :checkReSend="true"
                            />
                            <div class="card-body">
                                <ul class="pagination ">
                                    <li class="page-item page-prev"> <a class="page-link" v-on:click="prevPage()">Пред</a> </li>
                                    <li class="page-item page-next"> <a class="page-link" v-on:click="nextPage()">След</a> </li>
                                </ul>
                                <div>{{(this.offset/this.limit) + 1}} страница</div>
                            </div>
                        </div>

						<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
						<div v-else class="aligned-text">Нет продаж</div>

					</div>
					<!-- section-wrapper -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import Table from '@/modules/table/Table';
import ExportExcel from '@/modules/table/ExportExcel';
import { getTableHeaders, getTableFields, getTableFieldsNoLimit, getTableHeadersNoLimit } from '@/utils/mappers/MachineItemSales';
import Period from '@/modules/Period';

export default {
	name: 'salesMachineItem',
	components: {
		Table,
		ExportExcel,
    Period
	},
	data: () => ({
        offset: 0,
        limit:25,
        sales: null,
        data: null,
		machine: null,
    period: {
      from: new Date().getTime() - 24 * 60 * 60 * 100,
      to: new Date().getTime()
    }
	}),
	apollo: {
		data: {
			query: gql`
				query ($offset: Int!, $limit: Int!, $machineId: Int, $itemId: Int, $machineIdRequired: Int!, $period: Period) {
					sales: getSales(offset: $offset, limit: $limit, machineId: $machineId, itemId: $itemId, period: $period) {
						id
						price
						type
						createdAt
						item {
							name
						}
						receipt {
						  id
							timestamp
							paymentType
							status
						}
					},
					salesNoLimit: getSalesNoLimit(machineId: $machineId, itemId: $itemId, period: $period) {
						id
						price
						type
						createdAt
						item {
							name
						}
						status
					},
					machine: getMachineById (id: $machineIdRequired) {
						id
						name
					}
				}
			`,
			variables () {
				return {
					machineId: Number(this.$route.params.machineId),
					machineIdRequired: Number(this.$route.params.machineId),
					itemId: Number(this.$route.params.itemId),
					offset: this.offset,
					limit: this.limit,
          period: this.period
				};
			},

			update ({ sales, machine, salesNoLimit}) {
				return {
					sales,
					machine,
          salesNoLimit
				};
			}
		}
	},
	methods: {
	  async resend(id){
	    try {
        const { errors, data } = await this.$apollo.mutate({
          mutation: gql`
          mutation ($id: Int!) {
            reSendCheck (id: $id)

          }
        `,
          variables: {
            id
          }
        });

        const newResult = await this.$apollo.query({
          query: gql`
				query ($offset: Int!, $limit: Int!, $machineId: Int, $itemId: Int, $period: Period) {
					sales: getSales(offset: $offset, limit: $limit, machineId: $machineId, itemId: $itemId, period: $period) {
						id
						price
						type
						createdAt
						item {
							name
						}
						receipt {
						  id
							timestamp
							paymentType
							status
						}
					},
					salesNoLimit: getSalesNoLimit(machineId: $machineId, itemId: $itemId, period: $period) {
						id
						price
						type
						createdAt
						item {
							name
						}
						status
					}
				}
			`,
          variables: {
              machineId: Number(this.$route.params.machineId),
              machineIdRequired: Number(this.$route.params.machineId),
              itemId: Number(this.$route.params.itemId),
              offset: this.offset,
              limit: this.limit,
              period: this.period

          },
        });

        this.data.sales = newResult.data.sales
        this.data.salesNoLimit = newResult.data.salesNoLimit


      }catch (e) {
        alert("Ошибка повторной отправки, попробуйте позже!")
      }
    },
    onPeriodChange (period) {
      if(period.to <= period.from){
        period.to = period.from
      }
      this.period = period;
    },
	  nextPage() {
	    if(!this.data || !this.data.sales || !this.data.sales.length) {
	      return
        }
	    this.offset += this.limit
      },
	  prevPage() {
	    if(this.offset - this.limit < 0) {
	      return
        }

        this.offset -= this.limit
      }
    },
	computed: {
		getTableHeaders,
		getTableFields () { return getTableFields(this.data, {resend: this.resend}); },
		getTableFieldsNoLimit () { return getTableFieldsNoLimit(this.data); },
    getTableHeadersNoLimit
	}
}
</script>
