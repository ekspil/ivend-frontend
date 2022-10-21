<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
<!--                                <div class="top-buttons__left-container">-->
<!--                                    <router-link to="/fiscalAll/add" class="btn btn-primary">Добавить кассу</router-link>-->
<!--                                </div>-->

                                <div class="form-group" style="width: 50%; padding-left: 10px">
                                  <input v-model="searchTemp" class="form-control custom-select" placeholder="Поиск" @focusout="search = searchTemp" @keydown.enter="search = searchTemp">
                                </div>

                              <div class="form-group " style="width: 25%; padding-left: 10px">
                                <select class="form-control custom-select" v-model="selectedStatus">
                                  <option key="null" :value="null" selected="selected">Все</option>
                                  <option key="7" :value="0" selected="selected">0: Ожидание</option>
                                  <option key="6" :value="1" selected="selected">1: Удаление</option>
                                  <option key="5" :value="2" selected="selected">2: Ошибка</option>
                                  <option key="4" :value="3" selected="selected">3: Внимание</option>
                                  <option key="3" :value="4" selected="selected">4: Регистрация</option>
                                  <option key="3" :value="5" selected="selected">5: Активация</option>
                                  <option key="3" :value="6" selected="selected">6: Зарегистрирована</option>
                                  <option key="0" :value="7" selected="selected">7: Работает</option>
                                </select>
                              </div>

                              <span class="col-auto">
                                            <ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
                            </span>


                                <Table
                                        v-if="kkts && kkts.length > 0"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                        sortBy="activationDate"
                                        :order="true"
                                />

                                <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                                <div v-else class="aligned-text">Нет ККТ</div>
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
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="99999">ВСЕ</option>
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

    import ExportExcel from '@/modules/table/ExportExcel';
    import { getTableHeaders, getTableFields } from '@/utils/mappers/KktsAll';

    export default {
        name: 'Kkts',
        components: {
            Table,
          ExportExcel
        },
        data: () => ({
            selectedStatus: null,
            kkts: [],
            offset: 0,
            limit:50,
            savedLimit :50,
            search: "",
            searchTemp: "",
        }),
        apollo: {
            kkts: {
                query: gql`
                    query($offset: Int, $limit: Int, $status: Int, $search: String) {
                      getAllKkts(offset: $offset, limit: $limit, status: $status, search: $search) {
                            id
                            kktModel
                            kktStatus
                            kktFactoryNumber
                            kktRegNumber
                            kktFNNumber
                            kktActivationDate
                            kktBillsCount
                            kktOFDRegKey
                            companyName
                            kktLastBill
                            server
                            status
                            action

                             }
                    }
                `,
                variables () {
                    const vars = {
                        offset: Number(this.offset),
                        limit: Number(this.limit),
                        search: this.search
                    };
                    if(this.selectedStatus!==null){
                      vars.status = this.selectedStatus
                    }
                    return vars
                },
                update (data) {
                    return data.getAllKkts;
                }
            }
        },
        methods: {
            nextPage() {
                if(!this.kkts || !this.kkts.length) {
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
            async removeKkt (id) {
                await this.$apollo.mutate({
                    mutation: gql`
                        mutation ($id: Int!) {
                            deleteKkt (id: $id)
                        }
                    `,
                    variables: { id }
                });

                this.kkts = this.kkts.filter(controller => controller.id !== id);
            }

        },
        computed: {
            getTableHeaders,
            getTableFields () { return getTableFields(this.kkts, {
                remove: this.removeKkt
            }); }
        }
    }
</script>