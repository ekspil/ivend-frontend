<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <div class="top-buttons__left-container">
                                    <router-link to="/fiscal/add" class="btn btn-primary">Добавить кассу</router-link>

                                </div>
                              <div v-if="kkts && kkts.length > 0" class="top-buttons__left-container">
                                <button  type="button" class="btn btn-primary ml-auto" data-toggle="modal" data-target="#exampleModal">Удалить кассу</button>
                              </div>


                                <Table
                                        v-if="kkts && kkts.length > 0"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                />


                                <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                                <div v-else class="aligned-text">Нет ККТ</div>


                              <div v-if="kkts && kkts.length > 0" class="modal fade" id="exampleModal" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel">Удаление кассы</h5>

                                    </div>
                                    <div class="modal-body">
                                      <select class="form-control custom-select" v-model="selectedKkt.id">
                                        <option v-for="kkt in kkts"
                                                :key="kkt.id" :value="kkt.id">
                                          {{'id: '+kkt.id+', модель: '+kkt.kktModel+ ', ЗН: ' + (kkt.kktFactoryNumber || '-')}}
                                        </option>
                                      </select>

                                      <label class="default-checkbox" :for="'checkbox-11'">
                                        <input class="auth-block__checkbox" type="checkbox"
                                               :id="'checkbox-11'" v-model="selectedKkt.agree"/>
                                        <br/>
                                        <span class="auth-block__checkbox-label">Я понимаю, что операция безвозвратная</span>
                                      </label>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="selectedKkt.agree = false">Закрыть</button>
                                      <button type="button" class="btn btn-primary" @click.prevent="deleteKkt()" :disabled="!(selectedKkt.agree && selectedKkt.id)">Удалить</button>
                                    </div>
                                  </div>
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
    import { getTableHeaders, getTableFields } from '@/utils/mappers/Kkts';

    export default {
        name: 'Kkts',
        components: {
            Table
        },
        data: () => ({
            kkts: [],
            selectedKkt: {
              id: null,
              kktFactoryNumber: null,
              agree: false,
            }
        }),
        apollo: {
            kkts: {
                query: gql`
                    query {
                      getUserKkts {
                            id
                            kktModel
                            kktFactoryNumber
                            kktRegNumber
                            kktFNNumber
                            kktActivationDate
                            kktBillsCount
                            kktOFDRegKey

                             }
                    }
                `,
                update (data) {
                    return data.getUserKkts;
                }
            }
        },
        methods: {
          async deleteKkt(){
            if(!this.selectedKkt.agree) return
            $('#exampleModal').modal('hide')
            await this.$apollo.mutate({
              mutation: gql`
                        mutation ($id: Int!) {
                            userDeleteKkt (id: $id)
                        }
                    `,
              variables: { id: this.selectedKkt.id }
            });
            this.kkts = this.kkts.filter(controller => controller.id !== this.selectedKkt.id);

            this.selectedKkt.agree = false
            this.selectedKkt.id = null
          }

        },
        computed: {
            getTableHeaders,
            getTableFields () { return getTableFields(this.kkts); }
        }
    }
</script>