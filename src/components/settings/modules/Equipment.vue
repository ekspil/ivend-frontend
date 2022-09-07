<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">

                            <div class="example top-buttons-container top-buttons">
                                <div class="top-buttons__left-container">
                                    <router-link to="/controllers/add" class="btn btn-primary">Добавить <span class="disabled-small">контроллер</span></router-link>
                                </div>
                              <div class="" >
                                <input v-model="search" class="stats-top-menu__item" placeholder="Поиск">

                              </div>

                                <div class="">


                                    <div class="row gutters-xs">
                                      <select v-if="groups" v-model="selectedGroupId" class="select2 stats-top-menu__item" placeholder="Выберите группу">
                                        <option label="Все группы" :value="null"></option>
                                        <option v-for="group in groups" v-bind:value="group.id" :key="group.id">{{group.name}}</option>
                                      </select>


                                      <span class="col-auto ">
                                            <button class="btn btn-primary" type="button" @click.prevent="$router.push('/controllers/editGroup')"><i
                                                class="fe fe-settings"> Общие настройки</i>
                                            </button>
                                        </span>

                                      <span class="col-auto disabled-small">
                                            <button class="btn btn-primary" type="button"><i
                                                class="fe fe-upload"> Импорт</i>
                                            </button>
                                        </span>

                                        <span class="col-auto disabled-small">
                                            <ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
                                        </span>

<!--                                        <span class="col-auto">-->
<!--                                            <button class="btn btn-primary" type="button">Сохранить-->
<!--                                            </button>-->
<!--                                        </span>-->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Table
                            v-if="controllers && controllers.length > 0"
                            :headers="getTableHeaders"
                            :fields="getTableFields"
                            :order="true"
                            className="settings-table"
                            :short="true"
                        />

                        <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                        <div v-else class="aligned-text">Нет контроллеров</div>
                    </div>
                    <!-- section-wrapper -->
                </div>
            </div>
        </div>



      <div class="modal fade"  id="modalEncashment" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="modalEncashment" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="width: 450px">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" style="width: 100%; text-align: center">Обновление прошивки</h5>

            </div>
            <div class="modal-footer ">
              <button type="button" class="btn btn-secondary " style="width: 50%" data-dismiss="modal">Отмена</button>
              <button type="button" class="btn btn-primary" style="width: 50%" data-dismiss="modal" @click.prevent="update()">Выполнить обновление</button>
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
    import { getTableHeaders, getTableFields } from '@/utils/mappers/Controllers';

    export default {
        name: 'Equipment',
        components: {
            Table,
            ExportExcel
        },
        data: () => ({
            search: "",
            controllers: [],
            groups: null,
            selectedGroupId: null
        }),
        apollo: {
            controllers: {
                query: gql`
                    query {
                      getControllers {
                        id
                        uid
                        mode
                        bankTerminalMode
                        revision {
                            name
                        }
                        status
                        fiscalizationMode
                        firmwareId
                        remotePrinterId

                        machine {
                          id
                          name
                          group {
                            id
                          }
                          group2 {
                            id
                          }
                          group3 {
                            id
                          }
                        }
                      }
                    }
                `,
                update (data) {
                    return data.getControllers;
                }
            },

          groups: {
            query: gql`
			query {
				getMachineGroups {
					id
					name
				}
			}
			`,
            update: data => data.getMachineGroups
          },
        },
        methods: {
            getStatus (status) {
                switch (status) {
                    case 'ENABLED': return '<span class="status-icon bg-success"></span> Активирован';
                    case 'DISABLED': return '<span class="status-icon bg-danger"></span> Деактивирован';
                    case 'PAUSED': return '<span class="status-icon bg-secondary"></span> Приостановлен';
                    case 'DEBUG': return '<span class="status-icon bg-yellow"></span> Отладка';
                    case 'TRAINING': return '<span class="status-icon bg-info"></span> Обучение';
                }
            },

          async update(){
            const uid = String(window.tempId)
            try{
              await this.$apollo.mutate({
                mutation: gql`
                        mutation($input: RegisterEventInput!) {
          registerEvent(input: $input) {
            id
          }
        }
                    `,
                variables: {
                  input: {
                    controllerUid: uid,
                    eventType: "UPDATE",
                    timestamp: new Date().getTime()
                  }
                }
              });
            }catch (e) {

              alert("Инкассация не удалась")
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
            }
        },
        watch:{
          selectedGroupId(newVal, oldVal){
            if(this.$store.state.user.selectedGroupIdSe === newVal) return
            this.$store.state.user.selectedGroupIdSe = newVal
          }
        },
        mounted(){
          this.selectedGroupId = this.$store.state.user.selectedGroupIdSe
        },
        computed: {
          controllersSearch(){
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
            return this.controllers.filter(controller => {
              if(!this.search) return true
              const r1 = new RegExp(this.search.toUpperCase())
              const res1 = r1.test(controller.uid.toUpperCase())
              if(res1) return res1
              const r3 = new RegExp(this.search.toUpperCase())
              const res3 = r3.test(controller.machine?.name.toUpperCase())
              if(res3) return res3

              let statusRus = ""
              switch (controller.status) {
                case 'ENABLED':
                  statusRus =  'Разрешено';
                  break;
                case 'DISABLED':
                  statusRus = 'Запрещено';
                  break;
                case 'PAUSED':
                  statusRus = 'Приостановлен';
                  break;
                case 'DEBUG':
                  statusRus = 'Отладка';
                  break;
                case 'TRAINING':
                  statusRus = 'Обучение';
                  break;
                default: statusRus = '';
                  break;
              }
              const r4 = new RegExp(this.search.toUpperCase())
              console.log(statusRus)
              const res4 = r4.test(statusRus.toUpperCase())
              if(res4) return res4
              return false

            })
          },
            getTableHeaders,
            getTableFields () {
                return getTableFields(this.controllersSearch.filter(c=> {
                  if (!this.selectedGroupId) return true
                  if (!c.machine) return false
                  if (!c.machine.group) return false
                  if (c.machine.group.id == this.selectedGroupId) return true
                  if (c.machine.group2.id == this.selectedGroupId) return true
                  if (c.machine.group3.id == this.selectedGroupId) return true
                  return false
                }), {
                    remove: this.removeController,
                    routeKey: "machine",
                    routeId: "machineId",
                    route: "/machine/edit/"
                });
            }
        }
    }
</script>
<style>
</style>
