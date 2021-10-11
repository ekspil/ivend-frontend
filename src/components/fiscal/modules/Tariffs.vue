<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">

                              <div class="top-buttons__left-container">
                                <router-link to="/fiscalAll/addTariff" class="btn btn-primary">Изменить тариф</router-link>
                              </div>
<!--                                <div class="stats-top-menu__date-buttons">-->
<!--                                    <Period @onChange="onPeriodChange"/>-->
<!--                                </div>-->

                                <Table
                                        v-if="tariffs && partners"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                />

                                <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                                <div v-else class="aligned-text">Нет установленных тарифорв</div>
<!--                                <div class="card-body row" style="padding: 4px;">-->
<!--                                    <ul class="pagination col">-->
<!--                                        <li class="page-item page-prev"> <a class="page-link" v-on:click="prevPage()">Пред</a> </li>-->
<!--                                        <li class="page-item page-next"> <a class="page-link" v-on:click="nextPage()">След</a> </li>-->
<!--                                    </ul>-->
<!--                                    <div class="form-label f-b col">{{(this.offset/this.limit) + 1}} страница</div>-->
<!--                                    <div class="form-group col" style="width: 20%; padding-left: 10px">-->
<!--                                        <label class="form-label f-b col">Показывать по:</label>-->
<!--                                    </div>-->
<!--                                    <div class="form-group kol">-->
<!--                                        <select v-model="limit" class="form-control custom-select">-->
<!--                                            <option value="10">10</option>-->
<!--                                            <option value="20">20</option>-->
<!--                                            <option value="50">50</option>-->
<!--                                            <option value="100">100</option>-->
<!--                                        </select>-->
<!--                                    </div>-->
<!--                                </div>-->
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
    import { getTableHeaders, getTableFields } from '@/utils/mappers/Tariffs';

    export default {
        name: 'Tariffs',
        components: {
            Table
        },
        data: () => ({
            partners: null,
            orderKey: null,
            orderDesc: null,
            tariffs: null,
        }),
        apollo: {
          partners: {
            query: gql`
                    query($input: AllUsersInput) {
                      getAllUsers(input: $input) {
                            phone
                            id
                            email
                            inn
                            companyName
                    }
                    }
                `,
            variables () {
              return {
                input: {
                  role: "PARTNER"
                },
              };
            },
            update (data) {

              return data.getAllUsers
            }
          },
            tariffs: {
                query: gql`
                    query {
                      getTariffs {
                          id
                          telemetry
                          acquiring
                          fiscal
                          partnerId
                          startedAt
                          }
                    }
                `,
                variables () {
                },
                update (data) {
                    return data.getTariffs
                }
            }
        },
        methods: {
        },
        computed: {
            getTableHeaders,
            getTableFields () { return getTableFields(this.tariffs, this.partners) }
        }
    }
</script>
