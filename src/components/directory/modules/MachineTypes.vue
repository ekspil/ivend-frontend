<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <div class="top-buttons__left-container">
                                  <button class="btn btn-primary ml-auto" data-toggle="modal" data-target="#ModalAddType" @click.prevent="">Добавить <span class="disabled-small">тип автомата</span></button>
                                </div>

<!--                              <div class="" >-->
<!--                                <input v-model="search" class="stats-top-menu__item" placeholder="Поиск">-->

<!--                              </div>-->

                            </div>
                        </div>

                        <Table
                            v-if="types && types.length > 0"
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




      <div class="modal fade" id="ModalAddType" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Новый тип автомата</h5>

            </div>
            <div class="modal-body">
              <input name="number" v-model="newTypeName" class="form-control" placeholder="Название типа" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
              <button type="button" class="btn btn-primary" @click.prevent="createMachineType(newTypeName)">Сохранить</button>
            </div>
          </div>
        </div>
      </div>

      <Toast :message="message.text" :error="message.error" />


    </div>
</template>

<script>
    import gql from 'graphql-tag';

    import Table from '@/modules/table/Table';
    import { getTableHeaders, getTableFields } from '@/utils/mappers/MachineTypes';

    import Toast from '@/modules/Toast';

    export default {
        name: 'Machines',
        components: {
            Table,
            Toast
        },
        data: () => ({

            search: "",
            types: [],
            newTypeName: "",
            message: {}
        }),
        apollo: {
          types: {
            query: gql`
                    query{
                      getMachineTypes {
                        id
                        name
                      }
                    }
                `,
            update(data) {
              return data.getMachineTypes;
            }
          },
        },
        methods: {
            showMessage(text, error){
              this.message.text = text
              this.message.error = error
              $('.toast').toast("show")
            },
            async removeType (id) {
                // await this.$apollo.mutate({
                //     mutation: gql`
                //         mutation ($id: Int!) {
                //             deleteMachine (id: $id) {
                //                 name
                //             }
                //         }
                //     `,
                //     variables: { id }
                // });
                //
                // this.machines = this.machines.filter(machine => machine.id !== id);
            },
            async createMachineType (name) {
              if(!name) return
              try{
                const data = await this.$apollo.mutate({
                  mutation: gql`
                        mutation ($input: CreateMachineTypeInput!) {
                            createMachineType (input: $input) {
                                id
                                name
                            }
                        }
                    `,
                  variables: { input: {
                      name
                    } }
                });

                if(data && data.data && data.data.createMachineType){
                  this.types.push(data.data.createMachineType)
                  this.showMessage(`Тип "${name}" успешно создан`, false)
                  $('#ModalAddType').modal('hide')
                }
                else {
                  this.showMessage(`Ошибка при создании типа "${name}"`, true)
                  $('#ModalAddType').modal('hide')
                }

              }
              catch (e) {
                this.showMessage(`Ошибка сервера ${e.message}"`, true)
                $('#ModalAddType').modal('hide')
              }


            },
        },
        computed: {
            getTableHeaders,
            getTableFields () {
                return getTableFields(this.types, {
                    remove: this.removeType
                });
            }
        }
    }

</script>
