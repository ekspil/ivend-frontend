<template>
  <div class="container">
    <div class="side-app" v-if="data">
      <div class="row mt-5">
        <div class="col-lg-8 offset-2 card">
          <div class="card-header">
          </div>

          <Validate
              routeBack="/settings#machines"
              formName="editMachine"
              title="Групповое редактирование автоматов"
              :schema="schema" ref="form"
              @onSubmit="save"
              @onSuccess="onSuccess"
              v-if="data && !$apollo.loading"
          >
            <template slot="form">
              <div class="row">
                <div class="col-md-12 col-lg-12">


                  <div class="form-group">
                    <label class="form-label f-b">Группа автоматов</label>
                    <select class="form-control custom-select" v-model="selectedGroupId">
                      <option label="Выберите группу" :value="null"></option>
                      <option v-for="group in data.groups"
                              :key="group.id" :value="group.id">
                        {{ group.name }}
                      </option>
                    </select>
                  </div>


                  <div class="form-group">
                    <label class="form-label f-b">{{machineHeaders.address}}</label>
                    <Field name="place" formName="editMachine" className="form-control" placeholder="Введите место установки автомата" value=""/>
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

        <div class="aligned-text" v-else-if="$apollo.loading">Загрузка...</div>
        <div class="aligned-text" v-else>Ошибка загрузки контроллера</div>

      </div>
    </div>
  </div>
</div>

</template>


<script>
import gql from 'graphql-tag';

import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';

import { machineHeaders } from '@/utils/lists/Machine';


export default {
  components: {
    Validate,
    Field
  },
  data: () => ({
    data: null,
    machineHeaders,
    input: {
      equipmentId: null,
      kktId: 0,
      typeId: null,
    },
    printer: null,
    printerNew: null,

    schema: {
    },
    selectedGroupId: null,
    submitDisabled: false,
    machineUpdating: false
  }),
  apollo: {
    data: {
      variables() {
        return {
          id: Number(this.$route.params.id),
        }
      },
      query: gql `
      query GetData {

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


		    getUserKkts {
		      id
		      kktFactoryNumber
          kktRegNumber
        }


      }
      `,
      update(data) {
        return {
          groups: data.getMachineGroups,
          equipments: data.getEquipments,
          types: data.getMachineTypes.sort(function(a, b) {if (a.name > b.name) return 1; if (a.name == b.name) return 0; if (a.name < b.name) return -1; }),
          kkts: data.getUserKkts,
          machine: {
            place: this.data?.machine?.place || null,
          }
        };
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
  mounted() {
    if(this.$route.params.from){
      this.routeBack = `${this.routeBack}#${this.$route.params.from}`
    }

  },
  methods: {

    fiscalEditPage(){
      window.open("/settings#fiscal", '_blank').focus();
    },
    async save() {
      try {
        this.machineUpdating = true;

        if (!this.selectedGroupId){
          this.$refs.form.showMessage('error', 'Сперва выберите группу!');
          return
        }

        const machineData = {
          ...this.input,
          ...this.$store.getters['cache/data']
        };

        const { errors } = await this.$apollo.mutate({
          mutation: gql `
          mutation saveMachineGroupSettings ($id: Int, $data: GroupEditMachineInput!) {
            editMachineGroupSettings (id: $id, input: $data)
          }
          `,
          variables: {
            id: this.selectedGroupId,
            data: machineData
          }
        });

        this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
      } catch (error) {
        this.$refs.form.showMessage('error', 'Ошибка сохранения.');
      } finally {
        this.machineUpdating = false;
      }
    },
    onSuccess () {
      const router = this.$router;
      setTimeout(function () { router.push('/settings'); }, 1000);
    },

    getBillingAbbr (date) {
      if (date === 'DAILY') {
        return 'день';
      } else if (date === 'MONTHLY') {
        return 'мес.';
      }
    }
  }
}
</script>
