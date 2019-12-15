<template>
  <Validate
  goBack="/settings#machines"
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
          <label class="form-label f-b">Номер автомата</label>
          <Field name="number" formName="editMachine" className="form-control" placeholder="Введите номер автомата" :value="data.machine.number"/>
        </div>
        <div class="form-group">
          <label class="form-label f-b">Название автомата</label>
          <Field name="name" formName="editMachine" className="form-control" placeholder="Введите название автомата" :value="data.machine.name"/>
        </div>
        <div class="form-group">
          <label class="form-label f-b">Место установки автомата</label>
          <Field name="place" formName="editMachine" className="form-control" placeholder="Введите место установки автомата" :value="data.machine.place"/>
        </div>

        <div class="form-group">
          <label class="form-label f-b">Группа автомата</label>
          <CustomSelect
          className="form-control"
          :initialValue="data.machine.group.id"
          :options="data.groups"
          @onSelect="onGroupSelect"
          @onBlur="onGroupAppend"
          @onInputToggle="disableSubmit"
          @onSelectToggle="enableSubmit"
          ref="goodSelect"
          />
        </div>

        <div class="form-group">
          <label class="form-label f-b">Тип автомата</label>
          <select class="form-control custom-select" v-model="data.machine.type.id">
            <option v-for="type in data.types"
            :key="type.id" :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label f-b">Модель автомата</label>
        <select class="form-control custom-select" v-model="data.machine.equipment.id" disabled>
          <option v-for="equipment in data.equipments"
          :key="equipment.id" :value="equipment.id">
          {{ equipment.name }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label f-b">Привязать контроллер</label>
      <select class="form-control custom-select" v-model="input.controllerId">
          <option v-bind:value="null">Без контроллера</option>
          <option v-for="controller in getAvailableControllers(data.controllers, input.controllerId)"
        :key="controller.id" :value="controller.id">
        {{ controller.uid }}
      </option>
    </select>
  </div>

        <div class="form-group">
          <label class="form-label f-b">Привязать KKT</label>
          <select class="form-control custom-select" v-model="input.kktId">
            <option key="0" value="0">
              Все ККМ
            </option>
            <option v-for="kkt in data.kkts"
                    :key="kkt.id" :value="kkt.id">
              {{ kkt.kktFactoryNumber }}
            </option>
          </select>
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

    input: {
      controllerId: 1,
      kktId: 0
    },

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
          }
          type {
            id
            name
          }

          controller {
            id
            uid
          }
        }

        getMachineGroups {
          id
          name
        }

        getEquipments {
          id
          name
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
        if (!this.machineUpdating && data.getMachineById.kkt) {
          this.input.kktId = data.getMachineById.kkt.id;
        }
        if (!this.machineUpdating && data.getMachineById.controller) {
          this.input.controllerId = data.getMachineById.controller.id;
        }

        return {
          machine: data.getMachineById,
          groups: data.getMachineGroups,
          equipments: data.getEquipments,
          types: data.getMachineTypes,
          controllers: data.getControllers,
          kkts: data.getUserKkts
        };
      }
    }
  },
  methods: {
    getAvailableControllers(controllers, currentId) {
      return controllers.filter(controller => !controller.machine || controller.id === currentId)
    },
    async save () {
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
                  typeId: this.data.machine.type.id,
                  controllerId: this.input.controllerId,
                  kktId: Number(this.input.kktId),


                  ...this.$store.getters['cache/data']
                }
            }
          });

          this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
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
