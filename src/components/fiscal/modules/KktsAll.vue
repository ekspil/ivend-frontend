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
                                    <input v-model="search" class="form-control custom-select" placeholder="Поиск">
                                </div>

                              <div class="form-group " style="width: 25%; padding-left: 10px">
                                <select class="form-control custom-select" v-model="selectedStatus">
                                  <option key="null" :value="null" selected="selected">Все</option>
                                  <option key="6" value="6" selected="selected">6:Удаление</option>
                                  <option key="5" value="5" selected="selected">5:Ошибка</option>
                                  <option key="4" value="4" selected="selected">4:Регистрация</option>
                                  <option key="3" value="3" selected="selected">3:Внимание</option>
                                  <option key="0" value="0" selected="selected">0: НОРМА</option>
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
                                        :order="false"
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
            search: ""
        }),
        apollo: {
            kkts: {
                query: gql`
                    query($offset: Int, $limit: Int, $status: Int) {
                      getAllKkts(offset: $offset, limit: $limit, status: $status) {
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
                            action

                             }
                    }
                `,
                variables () {
                    const vars = {
                        offset: Number(this.offset),
                        limit: Number(this.limit)
                    };
                    if(this.selectedStatus!==null){
                      vars.status = Number(this.selectedStatus)
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
            kktsSearch(){
                if(this.search.length > 3){
                    if(this.limit < Number(1001)){
                        this.savedLimit = this.limit
                    }

                    this.limit = 9999
                }
                else if(this.search.length == 0){

                }
                else{
                    if(this.savedLimit < this.limit){
                        this.limit = this.savedLimit
                    }
                }
                return this.kkts.filter(kkt => {
                    // id
                    // kktModel
                    // kktFactoryNumber
                    // kktRegNumber
                    // kktFNNumber
                    if(!this.search) return true
                    const r1 = new RegExp(this.search.toUpperCase())
                    const res1 = r1.test(String(kkt.kktModel).toUpperCase())
                    if(res1) return res1
                    const r2 = new RegExp(this.search.toUpperCase())
                    const res2 = r2.test(String(kkt.companyName).toUpperCase())
                    if(res2) return res2
                    const r3 = new RegExp(this.search.toUpperCase())
                    const res3 = r3.test(String(kkt.kktFactoryNumber).toUpperCase())
                    if(res3) return res3

                    const r4 = new RegExp('^'+this.search.toUpperCase())
                    const res4 = r4.test(String(kkt.kktRegNumber).toUpperCase())
                    if(res4) return res4
                    const r5 = new RegExp('^'+this.search.toUpperCase())
                    const res5 = r5.test(String(kkt.kktFNNumber).toUpperCase())
                    if(res5) return res5
                    return false

                })
            },
            getTableHeaders,
            getTableFields () { return getTableFields(this.kktsSearch, {
                remove: this.removeKkt
            }); }
        }
    }
</script>