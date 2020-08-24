<template>
  <div class="container">
    <div class="side-app" v-if="data">
      <div class="row mt-5">
        <div class="col-lg-8 offset-2 card">
          <div class="card-header">
            <h3 class="card-title f-b">Редактирование оборудования №{{data.controller.uid}}</h3>
          </div>

          <Validate
          :routeBack="routeBack"
          formName="editControllerSettings"
          ref="form"
          :schema="schema"
          @onSubmit="save"
          @onSuccess="onSuccess"
          v-if="data"
          >
          <template slot="form">
            <div class="row">
              <div class="col-md-12 col-lg-12">
                <div class="form-group">
                  <label class="form-label f-b">{{controllerHeaders.number}}</label>
                  <Field className="form-control" :value="data.controller.uid" disabled name="uid" formName="editControllerSettings" placeholder="Введите UID"/>
                </div>
                <div class="form-group" v-if="false">
                  <label class="form-label f-b">{{controllerHeaders.version}}</label>
                  <select class="form-control custom-select" v-model="data.controller.revision.id">
                    <option v-for="revision in data.revisions" :key="revision.id" :value="revision.id">
                      {{ revision.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label f-b">{{controllerHeaders.state}}</label>
                  <select v-model="data.controller.status" class="form-control custom-select">
                    <option v-for="item in controllerStates" :value="item.value" :key="item.value">{{item.name}}</option>

                  </select>
                </div>
                <div style="margin-top: 1rem" class="row align-items-end justify-content-between">
                  <div class="col">
                  <label class="form-label f-b">{{controllerHeaders.mode}}</label>
                  <select class="form-control custom-select" v-model="data.controller.mode">
                    <option v-for="item in controllerType" :value="item.value" :key="item.value">{{item.name}}</option>

                  </select>
                </div>
                <div class="col-auto">
                  <button class="btn btn-primary ml-auto" data-toggle="modal" data-target="#ModalSettings" @click.prevent="">Настройки</button>
                </div>
                </div>


                <div v-if="false" class="form-group">
                  <label class="form-label f-b">{{controllerHeaders.statMode}}</label>
                  <select class="form-control custom-select" v-model="data.controller.readStatMode">
                    <option v-for="item in controllerStatType" :value="item.value" :key="item.value">{{item.name}}</option>
                  </select>
                </div>

                <div style="margin-top: 1rem" class="row align-items-end justify-content-between">
                  <div class="col">
                  <label class="form-label f-b">{{controllerHeaders.terminalMode}}</label>
                  <select class="form-control custom-select" v-model="data.controller.bankTerminalMode">
                    <option v-for="item in controllerTerminal" :value="item.value" :key="item.value">{{item.name}}</option>

                  </select>
                  </div>
                  <div class="col-auto">
                    <button class="btn btn-primary ml-auto" data-toggle="modal" data-target="#ModalSettings" @click.prevent="">Настройки</button>
                  </div>
                </div>

                <div style="margin-top: 1rem" class="row align-items-end justify-content-between">
                  <div class="col">
                  <label class="form-label f-b">{{controllerHeaders.fiscalMode}}</label>
                  <select class="form-control custom-select" v-model="data.controller.fiscalizationMode">
                    <option v-for="item in controllerFiscalType" :value="item.value" :key="item.value">{{item.name}}</option>
                  </select>
                  </div>
                  <div class="col-auto">
                    <button class="btn btn-primary ml-auto" @click.prevent="fiscalEditPage()">Настройки</button>
                  </div>
                </div>

                <div class="form-group" style="margin-top: 1rem">
                  <label class="form-label f-b">{{controllerHeaders.printer}}</label>
                  <Field className="form-control" :value="data.controller.remotePrinterId" name="remotePrinterId" formName="editControllerSettings" placeholder="Введите номер удалённого принтера" :disabled="true"/>
                </div>

              </div>
            </div>





            <div class="modal fade" id="ModalSettings" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Настройки</h5>

                  </div>
                  <div class="modal-body">
                    Тут должны быть настройки
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary" @click.prevent="">Сохранить</button>
                  </div>
                </div>
              </div>
            </div>





          </template>
          <template slot="submit">
            <button type="submit" class="btn btn-primary ml-auto">Сохранить</button>
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
import {controllerHeaders, controllerStates, controllerType, controllerStatType, controllerTerminal, controllerFiscalType } from '@/utils/lists/Controller';

import { required } from '@/utils/validation';

export default {
  components: {
    Validate,
    Field
  },
  data: () => ({
    routeBack: "/settings",
    data: null,
    controllerHeaders,
    controllerFiscalType,
    controllerTerminal,
    controllerStates,
    controllerType,
    controllerStatType,
    schema: {
      uid: [required]
    },

    controllerUploading: false
  }),
  apollo: {
    data: {
      variables() {
        return {
          id: Number(this.$route.params.id),
        }
      },
      query: gql `
      query GetController($id: Int!) {
        controller: getController(id: $id) {
          id
          uid
          mode
          revision {
            id,
            name
          }
          status
          bankTerminalMode
          readStatMode
          fiscalizationMode
          remotePrinterId
        }

        equipments: getEquipments {
          id,
          name
        }

        revisions: getRevisions {
          id,
          name
        }

        machines: getMachines {
          id
          name
        }
      }
      `,
      update(data) {
        return {
          controller: data.controller,
          equipments: data.equipments,
          revisions: data.revisions,
          machines: data.machines
        };
      }
    }
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
        this.controllerUploading = true;

        const inputData = {
          ...this.input,
          ...this.$store.getters['cache/data']
        };

        const controller = this.data.controller;
        const controllerData = {
          revisionId: 1,
          status: controller.status,
          mode: controller.mode,
          fiscalizationMode: controller.fiscalizationMode,
          bankTerminalMode: controller.bankTerminalMode,
          readStatMode: controller.readStatMode,
          remotePrinterId: inputData.remotePrinterId
        };

        const { errors } = await this.$apollo.mutate({
          mutation: gql `
          mutation saveController ($id: Int, $data: EditControllerInput!) {
            editController (id: $id, input: $data) {
              uid
            }
          }
          `,
          variables: {
            id: controller.id,
            data: controllerData
          }
        });

        this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
      } catch (error) {
        this.$refs.form.showMessage('error', 'Ошибка сохранения.');
      } finally {
        this.controllerUploading = false;
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
