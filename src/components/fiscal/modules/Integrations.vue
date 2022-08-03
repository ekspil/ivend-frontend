<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">

                                <div class="form-group" style="width: 25%; padding-left: 10px">
                                    <input v-model="searchTemp" class="form-control custom-select" placeholder="Поиск" @keydown.enter="search = searchTemp">
                                </div>

                              <div class="form-group " style="width: 25%; padding-left: 10px">
                                <select class="form-control custom-select" v-model="selectedStatus">
                                  <option key="null" :value="null" selected="selected">Все</option>
                                  <option key="7" value="active" >Несопоставленные</option>
                                  <option key="6" value="not_active" >Сопоставленные</option>
                                </select>
                              </div>
                                <span class="col-auto">
                                            <ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
                                </span>

                                <Table
                                        v-if="integrations"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                        sortBy="traffic"
                                        :order="false"

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

    import ExportExcel from '@/modules/table/ExportExcel';
    import { getTableHeaders, getTableFields } from '@/utils/mappers/IntegrationsAll';

    export default {
        name: 'Users',
        components: {
            Table,
          ExportExcel
        },
        data: () => ({

            orderKey: null,
            selectedStatus: null,
            orderDesc: null,
            integrations: [],
            offset: 0,
            limit:100,
            savedLimit :100,
            searchTemp: null,
            search: "",
        }),
        apollo: {
            integrations: {
                query: gql`
                    query($input: AllIntegrationsInput) {
                      getControllerIntegrations(input: $input) {
                            id
                            imei
                            type
                            controllerId
                            controllerUid
                            userId
                            serial
                            user{
                              companyName
                            }

                        }
                    }
                `,
              variables () {
                return {
                  input: {
                    offset: Number(this.offset),
                    limit: Number(this.limit),
                    search: this.search
                  }
                };
              },
                update (data) {

                  return data.getControllerIntegrations

                }
            }
        },
        methods: {
            nextPage() {
                if(!this.sims || !this.sims.length) {
                    return
                }
                this.offset += this.limit
            },

          async updateUid (id, uid) {
            try {
              const data = {
                id: Number(id),
                controllerUid: uid
              };

              const result = await this.$apollo.mutate({
                mutation: gql `mutation change($data: ControllerIntegrationInput! ){
                                         updateControllerIntegration(input: $data){
                                         id
                                         controllerUid
                                         type
                                         }
                                                }

          `,
                variables: {
                  data
                }
              });
              console.log(result)

              this.integrations = this.integrations.map(item => {
                if (item.id === id){
                  item.controllerUid = uid
                  return user
                }
                return item
              })
            } catch (error) {

            }
          },

            prevPage() {
                if(this.offset - this.limit < 0) {
                    return
                }

                this.offset -= this.limit
            },


        },
        computed: {
            getTableHeaders,
            getTableFields () { return getTableFields(this.integrations, {
              controllerIntegrationUidUpdate: this.updateUid
            }) }
        }
    }
</script>
