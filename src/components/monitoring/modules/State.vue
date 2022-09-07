<template>
	<div>
		<template v-if="machines.length > 0 && !$apollo.loading">

			<div class="text-wrap">
				<div class="example top-buttons-container top-buttons">
					<div class="top-buttons__left-container"></div>

					<div >
						<div class="row gutters-xs">
							<ExportExcel class="disabled-small" :table="{ headers: getTableHeaders, fields: getTableFields }"/>
						</div>
					</div>
				</div>
			</div>

			<Table v-if="false" :headers="getTableHeadersC" :fields="getTableFieldsC" className="monitoring-table" />
			<Table :headers="getTableHeaders" :fields="getTableFields" className="monitoring-table" />
		</template>

		<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
    <div v-else class="aligned-text">Нет автоматов</div>


    <div class="modal fade"  id="resetSimMonitoring" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="resetSim" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="width: 400px">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="width: 100%; text-align: center">Сброс SIM</h5>

          </div>
          <div class="modal-footer ">
            <button type="button" class="btn btn-secondary " style="width: 50%" data-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-primary" style="width: 50%" data-dismiss="modal" @click.prevent="simReset()">Сбросить SIM</button>
          </div>
        </div>
      </div>
    </div>

	</div>
</template>

<script>
	import gql from 'graphql-tag';

	import Table from '@/modules/table/Table';
	import ExportExcel from '@/modules/table/ExportExcel';
	import { getTableHeaders, getTableFields } from '@/utils/mappers/MonitoringState';
	import { getTableHeadersC, getTableFieldsC } from '@/utils/mappers/MonitoringStateControllers';

	export default {
		name: 'State',
		components: {
			Table,
			ExportExcel
		},
		data: () => ({
			machines: []
		}),
		apollo: {
			machines: {
				query: gql`
					query {
						getMachines {
							id
							name
							lastSaleTime
							terminalStatus
							kktStatus
							banknoteCollectorStatus
							coinCollectorStatus
							controller {
								uid
								sim
								cmdInfo
								status
								registrationTime
								lastState {
									billAmount
									registrationTime
									coinAmount
                  attentionRequired
									coinAcceptorStatus
									billAcceptorStatus
								}
							}
						}
					}
				`,
                pollInterval: 60000,
				update: data => data.getMachines
			}
		},
		computed: {
			getTableHeaders,
			getTableHeadersC,
			getTableFieldsC () { return getTableFieldsC(this.machines.reduce((acc, item) => {

				if( item.controller?.status !== "DISABLED") {
					acc[0].count++
				}
				else {
					acc[1].count++
				}
				return acc
			}, [{status: "Автоматов работает", count: 0}, {status: "Автоматов не работает", count: 0}])) },
			getTableFields () { return getTableFields(this.machines.filter(mach => mach.controller?.status === "ENABLED")); }
		},
    methods: {
      async simReset () {
        const sim = String(window.tempSim)
        try{
          await this.$apollo.mutate({
            mutation: gql`
                        mutation ($sim: String!) {
                            simReset (sim: $sim)
                        }
                    `,
            variables: { sim }
          });
        }catch (e) {

          alert("Сброс сим карты не удался")
        }


      },
  },
  }
</script>
