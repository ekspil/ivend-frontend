<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="text-wrap">
              <div class="example top-buttons-container top-buttons">
                <div class="top-buttons__left-container">
                  <button class="btn btn-primary ml-auto" data-toggle="modal" data-target="#ModalAddModel" @click.prevent="">Добавить <span class="disabled-small">модель автомата</span></button>
                </div>

                <!--                              <div class="" >-->
                <!--                                <input v-model="search" class="stats-top-menu__item" placeholder="Поиск">-->

                <!--                              </div>-->

              </div>
            </div>

            <Table
                v-if="models && models.length > 0"
                :headers="getTableHeaders"
                :fields="getTableFields"
                className="settings-table"
                sortBy="controllerName"
                :order="true"
                :short="true"
            />

            <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
            <div v-else class="aligned-text">Нет моделей</div>
          </div>
        </div>
      </div>
    </div>


    <div  class="modal fade" id="ModalAddModel" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Новая модель автомата</h5>

          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label f-b">Название модели автомата (обязательно)</label>
              <input name="number" v-model="newModelName" class="form-control" placeholder="Название модели автомата" />
              </br>


              <label class="form-label f-b">Тип автомата (обязательно)</label>
              <select class="form-control custom-select" v-model="newModelTypeId">
                <option v-for="type in types"
                        :key="type.id" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
            <button type="button" class="btn btn-primary" @click.prevent="createMachineModel(newModelName, newModelTypeId)">Сохранить</button>
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
import { getTableHeaders, getTableFields } from '@/utils/mappers/MachineModels';

import Toast from '@/modules/Toast';

export default {
  name: 'Machines',
  components: {
    Table,
    Toast
  },
  data: () => ({

    search: "",
    models: [],
    types: [],
    message: {},
    newModelName: "",
    newModelTypeId: 1
  }),
  apollo: {
    models: {
      query: gql`
                    query{
                      getEquipments {
                        id
                        name
                        machineTypeId
                      }
                    }
                `,
      update(data) {
        return data.getEquipments;
      }
    },
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
    async createMachineModel (name, machineTypeId) {
      if(!name || !machineTypeId) return
      try{
        const data = await this.$apollo.mutate({
          mutation: gql`
                        mutation ($input: CreateEquipmentInput!) {
                            createEquipment (input: $input) {
                                id
                                name
                                machineTypeId

                            }
                        }
                    `,
          variables: { input: {
              name,
              machineTypeId
            } }
        });

        if(data && data.data && data.data.createEquipment){
          this.models.push(data.data.createEquipment)
          this.showMessage(`Тип "${name}" успешно создан`, false)
          $('#ModalAddModel').modal('hide')
        }
        else {
          this.showMessage(`Ошибка при создании типа "${name}"`, true)
          $('#ModalAddModel').modal('hide')
        }

      }
      catch (e) {
        this.showMessage(`Ошибка сервера ${e.message}"`, true)
        $('#ModalAddModel').modal('hide')
      }


    },
    async removeModel (id) {
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
  },
  computed: {
    modelsWithTypes(){
      if(!this.models || !this.types) return []
      return this.models.map(model=>{
        const type = this.types.find(it=> it.id === model.machineTypeId)
        if(type){
          model.type = type.name
        }
        else{
          model.type = "No type"
        }

        return model
      })
    },
    getTableHeaders,
    getTableFields () {
      return getTableFields(this.modelsWithTypes, {
        remove: this.removeModel
      });
    }
  }
}

</script>
