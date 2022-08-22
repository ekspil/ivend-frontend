<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">

                                <div class="form-group " style="width: 70%; padding-left: 0px">
                                    <input v-model="searchTemp" class="form-control custom-select" placeholder="Поиск" @keydown.enter="searchTemp.length > 2 ? search = searchTemp : search = '' ">
                                </div>

                              <div class="form-group " style="width: 30%; padding-left: 5px">
                                <select class="form-control custom-select" v-model="selectedStatus">
                                  <option key="null" :value="null" selected="selected">Все</option>
                                  <option key="9997" value="payed" >Оплаченные</option>
                                  <option key="9996" value="not_payed" >Неоплаченные</option>
                                </select>
                              </div>
<!--                                <span class="col-auto">-->
<!--                                            <ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>-->
<!--                                </span>-->
                              <div class="stats-top-menu__date-buttons">
                                <Period @onChange="onPeriodChange" :allTime="true"/>
                              </div>
                                <Table
                                        v-if="bills"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                        sortBy="createdAt"
                                        :order="false"

                                />

                                <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                                <div v-else class="aligned-text">Нет платежей</div>
                                <div class="card-body row" style="padding: 4px;">
                                    <ul class="pagination col">
                                        <li class="page-item page-prev"> <a class="page-link" v-on:click="prevPage()">Пред</a> </li>
                                        <li class="page-item page-next"> <a class="page-link" v-on:click="nextPage()">След</a> </li>
                                    </ul>
                                    <div class="form-label f-b col">{{(this.offset/this.limit) + 1}} страница</div>
                                    <div class="form-group col" style="width: 20%; padding-left: 10px">
                                        <label class="form-label f-b col">Показывать по:</label>
                                    </div>
                                    <div class="form-group kol">
                                        <select v-model="limit" class="form-control custom-select">
                                            <option :value="100">100</option>
                                            <option :value="500">500</option>
                                            <option :value="1000">1000</option>
                                            <option :value="5000">5000</option>
                                            <option :value="99999">ВСЕ</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!-- section-wrapper -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import Table from '@/modules/table/Table';

    import Period from '@/modules/PeriodLarge';
    import ExportExcel from '@/modules/table/ExportExcel';
    import { getTableHeaders, getTableFields } from '@/utils/mappers/BillsAll';

    export default {
        name: 'Users',
        components: {
            Table,
          ExportExcel,
          Period
        },
        data: () => ({

            orderKey: null,
            selectedStatus: null,
            orderDesc: null,
            bills: [],
            offset: 0,
            limit:100,
            savedLimit :100,
            searchTemp: null,
            search: "",
            period: {
              from: new Date().getTime() - 31 * 24 * 60 * 60 * 1000,
              to: new Date().getTime()
            }
        }),
        apollo: {
            bills: {
                query: gql`
                    query ($input: AllBillsInput!) {
                        getAllBills(input: $input) {
                            id,
                            applied
                            meta
                            userId
                            amount
                            type
                            startedAt
                            createdAt
                            userName
                            userInn
                         }
                    }
                `,
                variables () {
                  const notCustomDate = !this.period.from && !this.period.to;
                  if (notCustomDate) {

                      this.period = {
                        from: this.period,
                        to: Date.now()
                      }
                  }
                    return {
                        input: {
                            period: this.period,
                            offset: Number(this.offset),
                            limit: Number(this.limit),
                            status: this.selectedStatus,
                            search: this.search
                        }
                    };
                },
                update (data) {

                  return data.getAllBills

                }
            }
        },
        methods: {

            onPeriodChange (period) {
              if(period.to <= period.from){
                period.to = period.from
              }
              this.period = period;
            },
            nextPage() {
                if(!this.bills || !this.bills.length) {
                    return
                }
                this.offset += this.limit
            },

            prevPage() {
                if(this.offset - this.limit < 0) {
                    return
                }

                this.offset -= this.limit
            },
          descFunc(key, desc){
            this.orderKey = key
            this.orderDesc = desc
          },

        },
        computed: {
            getTableHeaders,
            getTableFields () { return getTableFields(this.bills, {
              routeKey: "userName",
              routeId: "userId",
              route: "/fiscalAll/userEdit/",
              simResetNumber: this.simReset
            }) }
        }
    }
</script>
