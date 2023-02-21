<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <div class="stats-top-menu__date-buttons">
                                    <Period @onChange="onPeriodChange" :allTime="true"/>
                                </div>

                                <Table
                                        v-if="users"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                        :orderAll="descFunc"
                                />

                                <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                                <div v-else class="aligned-text">Нет вендоров</div>
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
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
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



      <div class="modal fade" id="ModalPartnerApply" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="ModalPartnerApplyLabel" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Выплата партнеру</h5>

            </div>
            <div class="modal-body" v-if="selectedPayment">
              <div class="row">
                <div class="col-6">Cумма</div>
                <div class="col-6">{{Number(selectedPayment.sum).toFixed(2)}}</div>

                <div class="col-6">Статус</div>
                <div class="col-6">{{selectedPayment.status}}</div>

                <div class="col-6">Дата</div>
                <div class="col-6">{{new Date(selectedPayment.date).toLocaleDateString()}}</div>

                <div class="col-6">Акт</div>
                <div class="col-6"><button class="btn btn-primary ml-auto badge badge-primary" @click="getPartnerAct(selectedPayment.id)" :disabled="orderBusy">Скачать</button></div>

              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearWindow()">Закрыть</button>
              <button type="button" class="btn btn-primary" @click.prevent="setFeeSuccess(selectedPayment.id)" :disabled="selectedPayment && selectedPayment.status === 'SUCCESS'">Подтвердить</button>
            </div>
          </div>
        </div>
      </div>
      <Toast :message="message" :error="true" />

    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import Table from '@/modules/table/Table';
    import Period from '@/modules/PeriodLarge';
    import { getTableHeaders, getTableFields } from '@/utils/mappers/Partners';
    import {head, isEmpty} from "ramda";
    import { convertServerError } from '@/utils';
    import Toast from '@/modules/Toast';

    export default {
        name: 'Users',
        components: {
            Table,
            Period,
            Toast
        },
        data: () => ({
            period: {
              from: null,
              to: null
            },
            orderKey: null,
            message: null,
            orderDesc: null,
            users: null,
            offset: 0,
            limit:100,
            savedLimit :100,
            search: "",
            savedSelectedRole: "VENDOR",
            selectedPayment: null,
            interval1: null,
            orderBusy: false,
            selections: [
            ]
        }),
        apollo: {
            users: {
                query: gql`
                    query($input: AllUsersInput, $orderDesc: Boolean, $orderKey: String, $period: Period) {
                      getAllUsers(input: $input, orderDesc: $orderDesc, orderKey: $orderKey) {
                            phone
                            id
                            email
                            partnerFee(period: $period)
                            partnerInfo{
                              lastPayment
                              lastPaymentAmount
                              payments
                              paymentsAmount
                              lastPaymentStatus
                              lastPaymentId
                            }
                            vendors{
                                id
                                monthPay(period: $period)
                                controllers{
                                    id
                                    simCardNumber
                                }

                                kkts{
                                    id
                                }

                                billing{
                                    balance
                                    dailyBill
                                }
                            }
                            billing{
                                 balance
                                 dailyBill
                            }
                            legalInfo{
                                inn
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
                            role: "PARTNER"
                        },

                      orderKey: this.orderKey,
                      orderDesc: this.orderDesc,
                      period: this.period
                    };
                },
                update (data) {

                    const returnedData = data.getAllUsers.map(
                        (user) => {
                            if(!user.legalInfo){
                                user.legalInfo = {}
                                user.legalInfo.inn = "Не указан"
                                user.legalInfo.companyName = "Не указан"

                            }
                            return user
                        }
                    )
                    return returnedData;
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
            async showUsers (partnerId) {
            let routeData = this.$router.resolve({path: `fiscalAll#usersAll__${partnerId}`, query: {partnerId}});
            window.open(routeData.href, '_blank');
            // this.$emit("goToUserControllers", id)

            },
            nextPage() {
                if(!this.users || !this.users.length) {
                    return
                }
                this.offset += this.limit
            },

            descFunc(key, desc){
                this.orderKey = key
                this.orderDesc = desc
            },

            showModal(){
              $('#ModalPartnerApply').modal("show")
            },

          showMessage(text){
            alert(text)
          },

            async payFee(userId, sum){
              try {


                  const {errors, data} = await this.$apollo.mutate({
                    mutation: gql`
							mutation createFeeTransaction ($input: CreateFeeTransactionInput!) {
								createFeeTransaction(input: $input) {
									controllerFee
								}
							}
						`,
                    variables: {
                      input: {
                        userId: userId,
                        partnerId: userId,
                        controllerFee: -sum,
                        terminalFee: 0,
                        kkmFee: 0,
                      }
                    }
                  });


                  alert("Успешно списана коммисия")

              } catch (error) {
                  alert("Ошибка сохранения коммисии")
              }
            },

            async setFeeSuccess(id){
              try {


                  const {errors, data} = await this.$apollo.mutate({
                    mutation: gql`
							mutation successFeeTransaction ($id:Int!) {
								successFeeTransaction(id: $id)
							}
						`,
                    variables:{
                      id
                    }
                  });



                  alert("Успешно подтверждено")

              } catch (error) {
                  alert("Ошибка подтверждения")
              }
            },
            prevPage() {
                if(this.offset - this.limit < 0) {
                    return
                }

                this.offset -= this.limit
            },

            async filterBy (key, value) {
                if(key === "role"){
                    this.selectedRole = value
                }
            },

          getPayment(){
            if(!window.partnerPaymentId) return null
            if(!this.users) return null
            const id = Number(window.partnerPaymentId)

            const paymentUser = this.users.find(item => {
              if(!item.partnerInfo) return false
              if(item.partnerInfo.lastPaymentId !== id) return false

              return true
            })

            this.selectedPayment = {
              id: paymentUser.partnerInfo.lastPaymentId,
              status: paymentUser.partnerInfo.lastPaymentStatus,
              sum: paymentUser.partnerInfo.lastPaymentAmount,
              date: paymentUser.partnerInfo.lastPayment,
            }

          },
          clearWindow(){
            window.partnerPaymentId = undefined
            this.selectedPayment = null
          },

          async getPartnerAct (paymentId) {
            if(this.orderBusy === true)  return
            this.orderBusy = true
            try {
              const { errors, data } = await this.$apollo.mutate({
                mutation: gql`
          mutation RequestAct ($id: Int!) {
            generatePartnerAct(id: $id) {
              url
            }
          }
          `,
                variables: {
                  id: paymentId
                }
              });

              if (errors && !isEmpty(errors)) {
                const error = head().message || 'Ошибка сервера';
                this.showMessage(convertServerError(error));
              } else {

                if (data.generatePartnerAct.url) {
                  //window.location.href = data.generatePdf.url;
                  window.open(data.generatePartnerAct.url, '_blank');
                  this.sendQuery = false
                }
              }
            } catch (error) {
              this.showMessage(convertServerError(error.message));
            }
            finally {

              this.orderBusy = false
            }
          },


        },
        computed: {
            getTableHeaders,
            getTableFields () { return getTableFields(this.users, {
              payFee: this.payFee,
              sum: 0,
              payFeeKey: "fee",
              showUsersKey: "vendors",
              showUsers: this.showUsers,
            }) }
        },
      mounted() {
          this.interval1 = setInterval(()=>{
            if(this.selectedPayment) return
            this.getPayment()
          }, 500)
      },
      beforeDestroy() {
          if(this.interval1) clearInterval(this.interval1)

      }
    }
</script>
