<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <div class="top-buttons__left-container">
                                    <router-link to="/machine/add" class="btn btn-primary">Добавить <span class="disabled-small">автомат</span></router-link>
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



                                      <span class="col-auto">
                                            <button class="btn btn-primary" type="button" @click.prevent="$router.push('/machine/editGroup')"><i
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
<!--                                            <button class="btn btn-primary" type="button">Сохранить</button>-->
<!--                                        </span>-->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Table
                            v-if="machines && machines.length > 0"
                            :headers="getTableHeaders"
                            :fields="getTableFields"
                            className="settings-table"
                            sortBy="controllerName"
                            :order="true"
                            :short="true"
                        />

                        <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                        <div v-else class="aligned-text">Нет автоматов</div>
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
    import { getTableHeaders, getTableFields } from '@/utils/mappers/Machines';

    export default {
        name: 'Machines',
        components: {
            Table,
            ExportExcel
        },
        data: () => ({

            search: "",
            machines: [],
            groups: null,
            selectedGroupId: null
        }),
        apollo: {
            machines: {
                query: gql`
                    query($machineGroupId: Int) {
                      getMachines(machineGroupId: $machineGroupId) {
                        id
                        name
                        number
                        place
                        kkt{
                          id
                        }
                        group {
                          id
                          name
                        }
                        equipment {
                          id
                          name
                          machineTypeId
                        }
                        type {
                          id
                          name
                        }

                        controller {
                          uid
                          id
                          fiscalizationMode
                        }
                      }
                    }
                `,
              variables () {
                return {
                  machineGroupId: this.selectedGroupId
                };
              },
                update (data) {
                    this.checkParams(data.getMachines)
                    return data.getMachines;
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
            async removeMachine (id) {
                await this.$apollo.mutate({
                    mutation: gql`
                        mutation ($id: Int!) {
                            deleteMachine (id: $id) {
                                name
                            }
                        }
                    `,
                    variables: { id }
                });

                this.machines = this.machines.filter(machine => machine.id !== id);
            },
          async checkParams(machines){
            if(this.$route.query.to === 'items'){
              if(machines[0]){
                this.$router.push(`/machine/edit/${machines[0].id}#goods`)
              }

            }
          }
        },
        computed: {

          machinesSearch(){
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
            return this.machines.filter(machine => {
              if(!this.search) return true
              const r1 = new RegExp(this.search.toUpperCase())
              const res1 = r1.test(machine.name.toUpperCase())
              if(res1) return res1
              const r2 = new RegExp(this.search.toUpperCase())
              const res2 = r2.test(machine.number.toUpperCase())
              if(res2) return res2
              const r3 = new RegExp(this.search.toUpperCase())
              const res3 = r3.test(machine.place.toUpperCase())
              if(res3) return res3
              const r4 = new RegExp(this.search.toUpperCase())
              const res4 = r4.test(machine.controller?.uid.toUpperCase())
              if(res4) return res4
              const r5 = new RegExp(this.search.toUpperCase())
              const res5 = r5.test(machine.equipment?.name.toUpperCase())
              if(res5) return res5
              const r6 = new RegExp(this.search.toUpperCase())
              const res6 = r6.test(machine.group?.name.toUpperCase())
              if(res6) return res6
              return false

            })
          },
            getTableHeaders,
            getTableFields () {
                return getTableFields(this.machinesSearch, {
                    remove: this.removeMachine,
                    routeKey: "controllerName",
                    routeId: "controllerId",
                    routeParams: "/machines",
                    route: "/controllers/edit/"
                });
            }
        }
    }
</script>
