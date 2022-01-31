<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">

                                <div class="form-group" style="width: 25%; padding-left: 10px">
                                    <input v-model="search" class="form-control custom-select" placeholder="Поиск">
                                </div>
                                <Table
                                        v-if="sims"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"

                                />

                                <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                                <div v-else class="aligned-text">Нет сим карт</div>
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
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="500">500</option>
                                            <option value="1000">1000</option>
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
    import { getTableHeaders, getTableFields } from '@/utils/mappers/SimsAll';

    export default {
        name: 'Users',
        components: {
            Table,
          ExportExcel
        },
        data: () => ({

            orderKey: null,
            orderDesc: null,
            sims: [],
            offset: 0,
            limit:100,
            savedLimit :100,
            search: "",
        }),
        apollo: {
            sims: {
                query: gql`
                    query($input: AllSimsInput) {
                      getAllSims(input: $input) {
                            imsi
                            number

                        }
                    }
                `,
                variables () {
                    return {
                        input: {
                            offset: Number(this.offset),
                            limit: Number(this.limit),
                        }
                    };
                },
                update (data) {

                  return data.getAllSims

                }
            }
        },
        methods: {
            nextPage() {
                if(!this.users || !this.users.length) {
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

        },
        computed: {
            userSearch(){
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
                return this.users.filter(user => {
                    // id
                    // kktModel
                    // kktFactoryNumber
                    // kktRegNumber
                    // kktFNNumber
                    if(!this.search) return true
                    const r1 = new RegExp(this.search.toUpperCase())
                    const res1 = r1.test(user.legalInfo.inn.toUpperCase())
                    if(res1) return res1
                    const r2 = new RegExp(this.search.toUpperCase())
                    const res2 = r2.test(user.legalInfo.companyName.toUpperCase())
                    if(res2) return res2
                    const r3 = new RegExp(this.search.toUpperCase())
                    const res3 = r3.test(user.phone.toUpperCase())
                    if(res3) return res3

                    const r4 = new RegExp('^'+this.search.toUpperCase())
                    const res4 = r4.test(user.email.toUpperCase())
                    if(res4) return res4
                    return false

                })
            },
            getTableHeaders,
            getTableFields () { return getTableFields(this.sims) }
        }
    }
</script>
