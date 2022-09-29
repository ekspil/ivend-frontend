<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                          <div class="example top-buttons-container top-buttons">
                            <div class="form-group" style="width: 50%; padding-left: 10px">
                              <input v-model="searchTemp" class="form-control custom-select" placeholder="Поиск" @keydown.enter="search = searchTemp">

                            </div>

<!--                            <div class="form-group " style="width: 25%; padding-left: 10px">-->
<!--                              <select class="form-control custom-select" v-model="selectedRole">-->
<!--                                <option v-for="type in selectionRoles[0].values"-->
<!--                                        :key="type" :value="type">-->
<!--                                  {{ type }}-->
<!--                                </option>-->
<!--                              </select>-->
<!--                            </div>-->
                            <span class="col-auto">
                                            <ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
                            </span>
                          </div>
                        </div>

                        <Table
                            v-if="controllers"
                            :headers="getTableHeaders"
                            :fields="getTableFields"
                            :selections="selections"
                            :filterAction="filterBy"
                            :orderAll="desc"
                            className="settings-table"
                        />
                        <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                        <div v-else class="aligned-text">Нет контроллеров</div>
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
                                    <option value="100">100</option>
                                    <option value="1000">1000</option>
                                    <option value="9999">ВСЕ</option>
                                </select>
                            </div>
                        </div>


                    </div>
                    <!-- section-wrapper -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    import Table from '@/modules/table/Table';

    import ExportExcel from '@/modules/table/ExportExcel';
    import { getTableHeaders, getTableFields } from '@/utils/mappers/ControllersAll';
    import {controllerTerminal, controllerFiscalType, controllerStates } from '@/utils/lists/Controller';

    export default {
        name: 'Controllers',
        components: {
            Table,
          ExportExcel
        },
        data: () => ({
            offset: 0,
            limit:100,
            savedLimit :100,
            controllers: [],
            search: "",
            searchTemp: "",
            orderKey: null,
            orderDesc: null,
            selectedRole: "VENDOR",
            savedSelectedRole: "VENDOR",
            selectionRoles: [
              {
              key: "role",
              values: [
                "ALL",
                "VENDOR",
                "CLOSED"
                ]
             }
            ],
            selected_registrationTime: "ALL",
            selected_status: "ALL",
            selected_simCardNumber: "ALL",
            selected_bankTerminalMode: "ALL",
            selected_controllerRegistrationTime: "ALL",
            selected_remotePrinterId: "ALL",
            selected_terminal: "ALL",
            selected_fiscalizationMode: "ALL",
            selections: [
                {
                    key: "registrationTime",
                    values: [
                        "OK",
                        "WARNING",
                        "ALERT",
                        "NO"
                    ]
                },
                {
                    key: "status",
                    values: [
                        ...controllerStates.map(item => item.value)
                    ]
                },
                {
                    key: "simCardNumber",
                    values: [
                        "ENABLED",
                        "DISABLED",
                    ]
                },
                {
                    key: "bankTerminalMode",
                    values: [

                        "ENABLED",
                        "DISABLED",
                    ]
                },
                {
                    key: "remotePrinterId",
                    values: [

                        "ENABLED",
                        "DISABLED",
                    ]
                },
                {
                    key: "controllerRegistrationTime",
                    values: [

                        "ENABLED",
                        "DISABLED",
                    ]
                },
                {
                    key: "terminal",
                    values: [

                        "OK",
                        "24H",
                        "ERROR",
                    ]
                },
                {
                    key: "fiscalizationMode",
                    values: [


                        "ENABLED",
                        "DISABLED",
                    ]
                },

            ]
        }),
        apollo: {
            controllers: {
                query: gql`
                    query($offset: Int, $limit: Int, $status: String, $connection: String, $terminal: String, $fiscalizationMode: String, $bankTerminalMode: String , $printer: String , $registrationTime: String , $terminalStatus: String  , $orderDesc: Boolean  , $orderKey: String, $userRole: String , $search: String , $userId: String ) {
                      getAllControllers(offset: $offset, limit: $limit, status: $status, connection: $connection, terminal: $terminal, fiscalizationMode: $fiscalizationMode, bankTerminalMode: $bankTerminalMode , terminalStatus: $terminalStatus , registrationTime: $registrationTime , printer: $printer,  orderDesc: $orderDesc,   orderKey: $orderKey,   userRole: $userRole,  search: $search, userId: $userId,  ) {
                        id
                        uid
                        mode
                        simCardNumber
                        sim
                        bankTerminalMode
                        registrationTime
                        status
                        fiscalizationMode
                        firmwareId
                        remotePrinterId
                        machine {
                            id
                            name
                            terminalStatus
                            lastSaleTime
                        }
                        lastState {
                          registrationTime
                          attentionRequired
                        }
                        user {
                            email
                            companyName
                            inn

                        }

                      }
                    }
                `,
            variables () {
                    // selected_registrationTime: "ALL",
                    // selected_status: "ALL",
                    // selected_simCardNumber: "ALL",
                    // selected_bankTerminalMode: "ALL",
                    // selected_fiscalizationMode: "ALL",
              let userId
                if(this.$route.query.userId){
                  userId = this.$route.query.userId
                }
                else {
                  userId = null
                }

                return {
                    offset: Number(this.offset),
                    limit: Number(this.limit),
                    connection: this.selected_registrationTime,
                    status: this.selected_status,
                    terminal: this.selected_simCardNumber,
                    bankTerminalMode: this.selected_bankTerminalMode,
                    terminalStatus: this.selected_terminal,
                    printer: this.selected_remotePrinterId,
                    registrationTime: this.selected_controllerRegistrationTime,
                    fiscalizationMode: this.selected_fiscalizationMode,
                    orderKey: this.orderKey,
                    orderDesc: this.orderDesc,
                    userRole: this.selectedRole,
                    search: this.search,
                    userId

                };
            },
                update (data) {

                    return data.getAllControllers;
                }
            }
        },
        methods: {
            nextPage() {
                if(!this.controllers || !this.controllers.length) {
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
            getStatus (status) {
                switch (status) {
                    case 'ENABLED': return '<span class="status-icon bg-success"></span> Активирован';
                    case 'DISABLED': return '<span class="status-icon bg-danger"></span> Деактивирован';
                    case 'PAUSED': return '<span class="status-icon bg-secondary"></span> Приостановлен';
                    case 'DEBUG': return '<span class="status-icon bg-yellow"></span> Отладка';
                    case 'TRAINING': return '<span class="status-icon bg-info"></span> Обучение';
                }
            },

            async removeController (id) {
                await this.$apollo.mutate({
                    mutation: gql`
                        mutation ($id: Int!) {
                            deleteController (id: $id) {
                                name
                            }
                        }
                    `,
                    variables: { id }
                });

                this.controllers = this.controllers.filter(controller => controller.id !== id);
            },
            async simReset (sim) {
              try{
                await this.$apollo.mutate({
                  mutation: gql`
                        mutation ($sim: String!) {
                            simReset (sim: $sim)
                        }
                    `,
                  variables: { sim }
                });
              }catch (e) {

                alert("Неудача")
              }


            },
            async desc(key, desc){
                this.orderKey = key
                this.orderDesc = desc
            },
            async filterBy (key, value) {
                if(key === "registrationTime"){
                    this.selected_registrationTime = value
                }
                if(key === "status"){
                    this.selected_status = value
                }
                if(key === "simCardNumber"){
                    this.selected_simCardNumber = value
                }
                if(key === "bankTerminalMode"){
                    this.selected_bankTerminalMode = value
                }
                if(key === "fiscalizationMode"){
                    this.selected_fiscalizationMode = value
                }
                if(key === "terminal"){
                    this.selected_terminal = value
                }
                if(key === "controllerRegistrationTime"){
                    this.selected_controllerRegistrationTime = value
                }
                if(key === "remotePrinterId"){
                    this.selected_remotePrinterId = value
                }
            }
        },
        computed: {
           controllersSearch(){
                // if(this.search.length > 3){
                //     if(this.limit < Number(1001)){
                //         this.savedLimit = this.limit
                //     }
                //
                //     this.limit = 9999
                // }
                // else if(this.search.length == 0){
                //
                // }
                // else{
                //     if(this.savedLimit < this.limit){
                //         this.limit = this.savedLimit
                //     }
                // }
                // return this.controllers.filter(controller => {
                //     if(!this.search) return true
                //     const r1 = new RegExp(this.search.toUpperCase())
                //     const res1 = r1.test(controller.uid.toUpperCase())
                //     if(res1) return res1
                //     const r2 = new RegExp(this.search.toUpperCase())
                //     const res2 = r2.test(controller.user?.companyName.toUpperCase())
                //     if(res2) return res2
                //     const r3 = new RegExp(this.search.toUpperCase())
                //     const res3 = r3.test(controller.user?.inn.toUpperCase())
                //     if(res3) return res3
                //
                //     let statusRus = ""
                //     switch (controller.status) {
                //         case 'ENABLED':
                //             statusRus =  'Работает';
                //             break;
                //         case 'DISABLED':
                //             statusRus = 'Не работает';
                //             break;
                //         case 'PAUSED':
                //             statusRus = 'Приостановлен';
                //             break;
                //         case 'DEBUG':
                //             statusRus = 'Отладка';
                //             break;
                //         case 'TRAINING':
                //             statusRus = 'Обучение';
                //             break;
                //         default: statusRus = '';
                //             break;
                //     }
                //     const r4 = new RegExp('^'+this.search.toUpperCase())
                //     const res4 = r4.test(statusRus.toUpperCase())
                //     if(res4) return res4
                //     return false
                //
                // })
            },
            getTableHeaders,
            getTableFields () {
                return getTableFields(this.controllers, {
                    remove: this.removeController,
                    simReset: this.simReset
                });
            }
        }
    }
</script>
