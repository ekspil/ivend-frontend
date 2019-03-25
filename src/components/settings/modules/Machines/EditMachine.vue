<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-lg-10 offset-lg-1 col-md-12">
          <Validate
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
  </div>
</div>
</div>
</div>
</template>

<script>
import gql from 'graphql-tag';
import { propEq, find } from 'ramda';

import CustomSelect from '@/modules/CustomSelect';

import { required } from '@/utils/validation';

import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';

export default {
  name: 'EditMachine',
  components: {
    Validate,
    Field,
    CustomSelect
  },
  data: () => ({
    data: null,

    schema: {
      name: [required],
      number: [required],
      place: [required]
    },

    submitDisabled: false
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
      }
      `,

      variables () {
        return {
          id: Number(this.$route.params.id)
        };
      },

      update: data => ({
        machine: data.getMachineById,
        groups: data.getMachineGroups,
        equipments: data.getEquipments,
        types: data.getMachineTypes
      })
    }
  },
  methods: {
    async save () {
      if (!this.submitDisabled) {
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
      const router = this.$router;
      setTimeout(function () { router.push('/settings'); }, 1000);
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
