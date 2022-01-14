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
                                <button  type="button" class="btn btn-primary ml-auto" :disabled="sendQuery" @click="requestOrder">Получить счет на ФН</button>
                              </div>
                              <div v-if="kkts && kkts.length > 0" class="top-buttons__left-container">
                                <button  type="button" class="btn btn-primary ml-auto" data-toggle="modal" data-target="#exampleModal">Отключить кассу</button>
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
                                      <button type="button" class="btn btn-primary" @click.prevent="deleteKkt()" :disabled="!(selectedKkt.agree && selectedKkt.id)">Отключить</button>
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

    import { convertServerError } from '@/utils';
    import Table from '@/modules/table/Table';
    import { getTableHeaders, getTableFields } from '@/utils/mappers/Kkts';
    import {head, isEmpty} from "ramda";

    export default {
        name: 'Kkts',
        components: {
            Table
        },
        data: () => ({
            kkts: [],
            sendQuery: false,
            legalInfo: null,
            depositSum: 12000,
            services: [{
              name: "Фискальный накопитель ФН36",
              count: 1,
              price: 12000
            }],
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
                            action
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
            },
          legalInfo: {
            query: gql`
			query {
				getProfile {
                    legalInfo{
                        inn
                        companyName
            }
          }
			}
			`,
            update: function(data){
              if(data.getProfile.legalInfo){
                return data.getProfile.legalInfo
              }
              else {
                return {
                  inn: "012345678",
                  companyName: "ООО Не указано"
                }
              }

            }
          }
        },
        methods: {

          async requestOrder () {
            this.sendQuery = true
            try {
              const { errors, data } = await this.$apollo.mutate({
                mutation: gql`
          mutation RequestOrder ($input: pdfInput!) {
            generatePdf(input: $input) {
              url
            }
          }
          `,
                variables: {
                  input: {
                    amount: parseFloat(this.depositSum),
                    inn: this.legalInfo.inn,
                    companyName: this.legalInfo.companyName,
                    services: JSON.stringify(this.services),
                    prefix: "FN"
                  }
                }
              });

              if (errors && !isEmpty(errors)) {
                alert("Ошибка на сервере, попробуйте позже")
              } else {

                if (data.generatePdf.url) {
                  window.location.href = data.generatePdf.url;
                  this.sendQuery = false
                }
              }
            } catch (error) {
              alert(convertServerError(error.message));
            }
          },
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
            this.kkts = this.kkts.map(controller => {
              if (controller.id !== this.selectedKkt.id) return controller
              controller.action = "DELETE"
              return controller
            });

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