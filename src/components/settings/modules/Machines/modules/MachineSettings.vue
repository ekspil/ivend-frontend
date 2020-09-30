<template>
  <Validate
  routeBack="/settings#machines"
  formName="editMachine"
  title="Редактирование автомата"
  :schema="schema" ref="form"
  @onSubmit="save"
  @onSuccess="onSuccess"
  v-if="data && !$apollo.loading"
  >
  <template slot="form">
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="form-group">
          <label class="form-label f-b">{{machineHeaders.number}}</label>
          <Field name="number" formName="editMachine" className="form-control" placeholder="Введите номер автомата" :value="data.machine.number"/>
        </div>
        <div class="form-group">
          <label class="form-label f-b">{{machineHeaders.name}}</label>
          <Field name="name" formName="editMachine" className="form-control" placeholder="Введите название автомата" :value="data.machine.name"/>
        </div>
        <div class="form-group">
          <label class="form-label f-b">{{machineHeaders.address}}</label>
          <Field name="place" formName="editMachine" className="form-control" placeholder="Введите место установки автомата" :value="data.machine.place"/>
        </div>

        <div class="form-group">
          <label class="form-label f-b">{{machineHeaders.group}}</label>
          <CustomSelect
          className="form-control"
          :initialValue="data.machine.group.id"
          :options="data.groups"
          :notNumber="true"
          @onSelect="onGroupSelect"
          @onBlur="onGroupAppend"
          @onInputToggle="disableSubmit"
          @onSelectToggle="enableSubmit"
          ref="goodSelect"
          />
        </div>

        <div class="form-group">
          <label class="form-label f-b">{{machineHeaders.type}}</label>
          <select class="form-control custom-select" v-model="input.typeId">
            <option key="" value="0" selected="selected">
            </option>
            <option v-for="type in data.types"
                    :key="type.id" :value="type.id">
              {{ type.name }}
            </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label f-b">{{machineHeaders.model}}</label>
        <select class="form-control custom-select" v-model="input.equipmentId">
          <option v-for="equipment in data.equipments" v-if="equipment.machineTypeId === input.typeId"
                  :key="equipment.id" :value="equipment.id">
            {{ equipment.name }}
          </option>
      </select>
    </div>

        <div class="row align-items-end justify-content-between">
          <div class="col">
            <label class="form-label f-b">{{machineHeaders.controller}}</label>
            <select class="form-control custom-select" v-model="input.controllerId">
              <option v-bind:value="null">Без контроллера</option>
              <option v-for="controller in getAvailableControllers(data.controllers, this.input.controllerId)"
                      :key="controller.id" :value="controller.id">
                {{ controller.uid }}
              </option>
            </select>

          </div>

          <div class="col-auto">
            <button class="btn btn-primary ml-auto" @click.prevent="controllerEditPage()">Настройки</button>
          </div>
        </div>
        <div style="margin-top: 1rem" class="row align-items-end justify-content-between">
          <div class="col">
            <label class="form-label f-b">{{machineHeaders.kkt}}</label>
            <select class="form-control custom-select" v-model="input.kktId">
              <option key="0" value="0">
                Все ККМ
              </option>
              <option v-for="kkt in data.kkts"
                      :key="kkt.id" :value="kkt.id">
                {{ kkt.kktFactoryNumber}}
              </option>
            </select>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary ml-auto" @click.prevent="kktEditPage()">Настройки</button>
          </div>

        </div>
        <div style="margin-top: 1rem" class="row align-items-end justify-content-between">
          <div class="col">
            <label class="form-label f-b">{{machineHeaders.printer}}</label>
            <input name="number" v-model="printer" class="form-control" placeholder="Привяжите номер принтера" disabled="true"/>
          </div>
          <div class="col-auto">
            <button  type="button" class="btn btn-primary ml-auto" data-toggle="modal" data-target="#exampleModal">Настройки</button>
          </div>

        </div>


        <div class="modal fade" id="exampleModal" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Привяжите принтер</h5>

              </div>
              <div class="modal-body">
                <input name="number" v-model="printerNew" class="form-control" placeholder="Привяжите принтер" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary" @click.prevent="printerEditPage()">Сохранить</button>
              </div>
            </div>
          </div>
        </div>

  </div>
</div>
</template>
<template slot="submit">
<button
  type="submit"
  :class="['btn', 'btn-primary', 'ml-auto', submitDisabled && 'disabled']"
>
  Сохранить
</button>
</template>
</Validate>
</template>

<script>
import gql from 'graphql-tag';
import { propEq, find } from 'ramda';

import CustomSelect from '@/modules/CustomSelect';

import { required } from '@/utils/validation';

import { machineHeaders } from '@/utils/lists/Machine';
import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';

export default {
  name: 'MachineSettings',
  components: {
    Validate,
    Field,
    CustomSelect
  },
  data: () => ({
    data: null,
    machineHeaders,
    input: {
      controllerId: 1,
      equipmentId: 1,
      kktId: 0,
      groupId: 1,
      typeId: 1,
    },
    printer: null,
    printerNew: null,

    schema: {
      name: [required],
      number: [required],
      place: [required]
    },

    submitDisabled: false,
    machineUpdating: false
  }),
  apollo: {
    data: {
      query: gql`
      query ($id: Int!) {
        getMachineById (id: $id) {
          id
          number
          name
          place
          kkt {
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
            id
            uid
            remotePrinterId
          }
        }

        getMachineGroups {
          id
          name
        }

        getEquipments {
          id
          name
          machineTypeId
        }

        getMachineTypes {
          id
          name
        }

        getControllers {
          id
          uid
          machine {
            id
          }
        }

		getUserKkts {
		  id
		  kktFactoryNumber
          kktRegNumber
		}
      }
      `,

      variables () {
        return {
          id: Number(this.$route.params.id)
        };
      },

      update (data) {
        if (!this.machineUpdating && data.getMachineById.controller) {
          this.input.controllerId = data.getMachineById.controller.id;
        }
        if (!this.machineUpdating && data.getMachineById.type) {
          this.input.typeId = data.getMachineById.type.id;
        }
        if (!this.machineUpdating && data.getMachineById.kkt) {
          this.input.kktId = data.getMachineById.kkt.id;
        }
        if (!this.machineUpdating && data.getMachineById.controller) {
          this.input.controllerId = data.getMachineById.controller.id;
        }
        if (!this.machineUpdating && data.getMachineById.equipment) {
          this.input.equipmentId = data.getMachineById.equipment.id;
        }
        if(!this.machineUpdating && data.getMachineById.controller){
          this.printer = data.getMachineById.controller.remotePrinterId
        }




        return {
          machine: data.getMachineById,
          groups: data.getMachineGroups,
          equipments: data.getEquipments,
          types: data.getMachineTypes.sort(function(a, b) {if (a.name > b.name) return 1; if (a.name == b.name) return 0; if (a.name < b.name) return -1; }),
          controllers: data.getControllers,
          kkts: data.getUserKkts,

        };
      }
    }
  },
  methods: {
    controllerEditPage(){
      if(!this.input.controllerId) return
      window.open("/controllers/edit/"+this.input.controllerId, '_blank').focus();
    },
    kktEditPage(){
      if(!this.input.kktId) return
      window.open("/fiscal/edit/"+this.input.kktId, '_blank').focus();
    },
    printerEditPage(){
      this.printer = this.printerNew
      $('#exampleModal').modal('hide')

    },
    getAvailableControllers(controllers, currentId) {
      return controllers.filter(controller => !controller.machine || controller.id === currentId)
    },
    async save () {
      const dataP = {
        printerId: this.printer,
        controllerId: this.input.controllerId
      };
      if (!this.submitDisabled) {
        this.machineUpdating = true;


        /* Забираем значение из CustomSelect */
        const newGoodLabel = this.$refs.goodSelect.value;
        if (typeof(newGoodLabel) === 'string') {
          this.data.machine.group.id = find(propEq('name', newGoodLabel))(this.data.groups).id;
        } else {
          this.data.machine.group.id = find(propEq('id', newGoodLabel))(this.data.groups).id;
        }
        try {
          const { errors } = await this.$apollo.mutate({
            mutation: gql`
            mutation editMachine ($data: EditMachineInput!) {
              editMachine (input: $data) {
                name
                type {
                  id
                }
              }
            }
            `,
            variables: {
                data: {
                  machineId: this.data.machine.id,
                  groupId: this.data.machine.group.id,
                  equipmentId: this.input.equipmentId,
                  typeId: this.input.typeId,
                  controllerId: this.input.controllerId,
                  kktId: Number(this.input.kktId),


                  ...this.$store.getters['cache/data']
                }
            }
          });


          this.printer = dataP.printerId
          if(this.printer && this.input.controllerId){


            const {err} = await this.$apollo.mutate({
              mutation: gql`
					mutation updatePrinterOnController ($dataP: UpdatePrinter!) {
						updatePrinterOnController (input: $dataP)
					}
					`,
              variables: {
                dataP
              }
            });

            this.$refs.form.process({ err, success: 'Успешно сохранено.' });
          }

          if(this.printer && !this.input.controllerId){
            this.$refs.form.process({ errors, success: 'Сохранено без принтера, т.к. не выбран контроллер.' });
          }
          else{
            this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
          }
        } catch (error) {
          this.$refs.form.showMessage('error', 'Ошибка сервера.');
        }
      }
    },
    onSuccess () {
      this.machineUpdating = false;

      const router = this.$router;
      setTimeout(function () { router.push('/settings#machines'); }, 1000);
    },

    onGroupSelect (group) {
      this.data.machine.group = group;
    },
    async onGroupAppend (name) {
      this.disableSubmit();

      if (name && name !== this.data.machine.group.id) {
        const { data } = await this.$apollo.mutate({
          mutation: gql`
          mutation ($input: CreateMachineGroupInput!) {
            createMachineGroup(input: $input) {
              id,
              name
            }
          }
          `,
          variables: {
            input: {
              name
            }
          }
        });

        this.data.groups.push(data.createMachineGroup);

        this.enableSubmit();
      }
    },

    disableSubmit () {
      this.submitDisabled = true;
    },
    enableSubmit () {
      this.submitDisabled = false;
    }
  }
}
</script>
