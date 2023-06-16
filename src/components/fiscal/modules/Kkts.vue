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
<!--                              <div  class="top-buttons__left-container">-->
<!--                                <button  type="button" class="btn btn-primary ml-auto" :disabled="sendQuery" @click="requestOrder">Получить счет на ФН</button>-->
<!--                              </div>-->

                              <div class="">
                                <a href="javascript:void(0)" data-toggle="dropdown" class="icon" >
                                  <button  type="button" class="btn btn-primary ml-auto" :disabled="sendQuery || !kkts.length" @click="">Получить счет на ФН</button>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right">
                                  <a href="#" class="dropdown-item" @click.prevent="requestOrder(false)">
                                    <i class="dropdown-icon fe fe-list"></i> Счет на ФН без регистрации в ФНС (выполняете самостоятельно)»
                                  </a>
                                  <a href="#" class="dropdown-item" @click.prevent="requestOrder(true)">
                                    <i class="dropdown-icon fe fe-list"></i> Счет на ФН с нашей услугой регистрации в ФНС (+2500 руб.)
                                  </a>
                                </div>
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
                                          {{'id: '+kkt.id+', модель: '+getKktModel(kkt.kktModel)+ ', ЗН: ' + (kkt.kktFactoryNumber || '-')}}
                                        </option>
                                      </select>

                                      <label class="default-checkbox" :for="'checkbox-12'">
                                        <input class="auth-block__checkbox" type="checkbox"
                                               :id="'checkbox-12'" v-model="selectedKkt.delKktHelp"/>
                                        <br/>
                                        <span class="auth-block__checkbox-label">Услуга снятия с учета онлайн кассы в  ФНС (2500 руб.)</span>
                                      </label>
                                        <br/>

                                      <label class="default-checkbox" :for="'checkbox-11'">
                                        <input class="auth-block__checkbox" type="checkbox"
                                               :id="'checkbox-11'" v-model="selectedKkt.agree"/>
                                        <br/>
                                        <span class="auth-block__checkbox-label">Я понимаю, что операция безвозвратная</span>
                                      </label>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="selectedKkt.agree = false">Закрыть</button>
                                      <button type="button" class="btn btn-primary" @click.prevent="deleteKkt()" :disabled="!(selectedKkt.agree && selectedKkt.id) || sendQuery">Отключить</button>
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
            depositSum: 0,
            services: [],
            tempServices: {
              fn36: {
                name: "Фискальный накопитель ФН36",
                count: 1,
                price: 15000
              },
              fn15: {
                name: "Фискальный накопитель ФН15",
                count: 1,
                price: 11000
              },
              orangeRent: {
                name: "Предоставление во временное пользование ККТ OrangeData (1 год)",
                count: 1,
                price: 2000
              },
              fnsNew: {
                name: "Услуга регистрации онлайн-кассы в ФНС",
                count: 1,
                price: 2500
              },
              fnsRenew: {
                name: "Услуга регистрации замены ФН в ФНС",
                count: 1,
                price: 2500
              },
              fnsDel: {
                name: "Услуга снятия с учета онлайн кассы в ФНС",
                count: 1,
                price: 2500
              },

            },
            selectedKkt: {
              id: null,
              kktFactoryNumber: null,
              agree: false,
              delKktHelp: false,
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
                    this.services=[]
                    this.depositSum = 0
                    if(data.getUserKkts.length === 1){
                      const kkt = data.getUserKkts[0]
                      this.setBaseServices(kkt)
                    }
                    else if(data.getUserKkts.length > 1){
                      let kkt = this.isKktNew(JSON.parse(JSON.stringify(data.getUserKkts)))
                      if(!kkt){
                        kkt = this.findOldesKKt(JSON.parse(JSON.stringify(data.getUserKkts)))
                      }
                      this.setBaseServices(kkt)

                    }
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
          getKktModel(model){
            switch(model){
              case "ORANGE_15":
                return "PAYONLINE-01-ФА ФН15"
              case "ORANGE_36":
                return "PAYONLINE-01-ФА ФН36"
              default:
                return model
            }
          },
          addService(...s){
            const arr = [...s]
            for( let i of arr){

              this.services.push(i)
              this.depositSum += i.price
            }
          },
          isKktNew(kkts){
            const list = kkts || this.kkts
            for(let kkt of list){
              if(kkt.kktFNNumber) continue
              return kkt
            }
            return false
          },
          findOldesKKt(kkts){
            const list = kkts || this.kkts

            list.sort(function(a, b) {

                let yearA = Number(a.kktActivationDate.replace(/[,-/ ]/g, ".").split('.')[2])
                let monthA = Number(a.kktActivationDate.replace(/[,-/ ]/g, ".").split('.')[1])
                let yearB = Number(b.kktActivationDate.replace(/[,-/ ]/g, ".").split('.')[2])
                let monthB = Number(b.kktActivationDate.replace(/[,-/ ]/g, ".").split('.')[1])




              if ((yearA > yearB) || (yearA === yearB && monthA > monthB)) return 1;
              if (yearA === yearB && monthA === monthB) return 0;
              if ((yearA < yearB) || (yearA === yearB && monthA < monthB)) return -1;
            })

            return list[0]
          },
          setBaseServices(kkt){
            switch(kkt.kktModel){
              case "УМКА-01-ФА (ФН36)":
                this.addService(this.tempServices.fn36)
                break
              case "УМКА-01-ФА (ФН15)":
                this.addService(this.tempServices.fn15)
                break
              case "ORANGE_15":
                this.addService(this.tempServices.fn15, this.tempServices.orangeRent)
                break
              case "ORANGE_36":
                this.addService(this.tempServices.fn36, this.tempServices.orangeRent)
                break
              default:
                break
            }
          },
          async requestOrder (needHelp, serv) {

            let services = JSON.parse(JSON.stringify(this.services))
            let sum = this.depositSum
            if(needHelp && !serv){
              if (this.isKktNew()){
                services.push(this.tempServices.fnsNew)
                sum += this.tempServices.fnsNew.price
              }
              else {
                services.push(this.tempServices.fnsRenew)
                sum += this.tempServices.fnsRenew.price
              }
            }
            else if (serv){
              services = [serv]
              sum = serv.price
            }
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
                    amount: parseFloat(sum),
                    inn: this.legalInfo.inn,
                    companyName: this.legalInfo.companyName,
                    services: JSON.stringify(services),
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
            if(this.selectedKkt.delKktHelp){

              await this.requestOrder(false, this.tempServices.fnsDel)

            }


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