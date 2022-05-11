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
                  <button class="btn btn-primary ml-auto" data-toggle="modal" data-target="#ModalSettingsController" @click.prevent="" :disabled="data.controller.mode !== 'ps_m_D'">Настройки</button>
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
                    <button class="btn btn-primary ml-auto" data-toggle="modal" data-target="#ModalSettingsTerminal" @click.prevent="" :disabled="data.controller.mode !== 'ps_m_D'">Настройки</button>
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

                <div class="form-group" style="margin-top: 1rem" v-if="false">
                  <label class="form-label f-b">{{controllerHeaders.printer}}</label>
                  <Field className="form-control" :value="data.controller.remotePrinterId" name="remotePrinterId" formName="editControllerSettings" placeholder="Введите номер удалённого принтера" :disabled="true"/>
                </div>

              </div>
            </div>





            <div class="modal fade" id="ModalSettingsController" tabindex="-1" data-backdrop="static"   role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Настройки</h5>

                  </div>
                  <div class="modal-body">

                    <div class="form-group">
                      <label class="form-label f-b">Цена импульса линии 1 (А)</label>
                      <input class="form-control" value="" type="number" v-model="pulse.a" placeholder="A"/>
                    </div>
                    <div class="form-group">
                      <label class="form-label f-b">Цена импульса линии 2 (B)</label>
                      <input class="form-control" value="" type="number" v-model="pulse.b" placeholder="B"/>
                    </div>
                    <div class="form-group">
                      <label class="form-label f-b">Цена импульса линии 3 (C)</label>
                      <input class="form-control" value="" type="number" v-model="pulse.c" placeholder="C"/>
                    </div>



                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"  @click.prevent="pulseBack(true, true, true, false, false)">Закрыть</button>
                    <button type="button" class="btn btn-primary" @click.prevent="" data-dismiss="modal">Сохранить</button>
                  </div>
                </div>
              </div>
            </div>


            <div class="modal fade" id="ModalSettingsTerminal" tabindex="-1" data-backdrop="static"   role="dialog" aria-labelledby="exampleModalLabelModalSettingsTerminal" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabelModalSettingsTerminal">Настройки</h5>

                  </div>
                  <div class="modal-body">

                    <div class="form-group">
                      <label class="form-label f-b">Цена выходного импульса (О)  <span class="text-red" v-if="!(Number(pulse.t) % Number(pulse.o) === 0)">Проверьте кратность чисел!</span></label>
                      <input class="form-control" value="" type="number" v-model="pulse.o" placeholder="O"/>
                    </div>
                    <div class="form-group">
                      <label class="form-label f-b">Сумма на терминале (Т)</label>
                      <input class="form-control" value="" type="number" v-model="pulse.t" placeholder="T"/>
                    </div>


                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"   @click.prevent="pulseBack(false, false, false, true, true)">Закрыть</button>
                    <button type="button" class="btn btn-primary" @click.prevent="" data-dismiss="modal" :disabled="!(Number(pulse.t) % Number(pulse.o) === 0)">Сохранить</button>
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
    pulse: {
      a: 0,
      b: 0,
      c: 0,
      o: 0,
      t: 0,
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
          pulse {
            a
            b
            c
            o
            t
          }
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
        if(data.controller.pulse && !this.data){
          this.pulse = JSON.parse(JSON.stringify(data.controller.pulse))
        }
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
  watch: {
    pulse: {
      handler(newValue, oldValue) {
        if(Number(newValue.a) > 1000) this.pulse.a = 1000
        if(Number(newValue.b) > 1000) this.pulse.b = 1000
        if(Number(newValue.c) > 1000) this.pulse.c = 1000
        if(Number(newValue.o) > 1000) this.pulse.o = 1000
        if(Number(newValue.t) > 10000) this.pulse.t = 10000
        if(Number(newValue.a) < 0) this.pulse.a = 0
        if(Number(newValue.b) < 0) this.pulse.b = 0
        if(Number(newValue.c) < 0) this.pulse.c = 0
        if(Number(newValue.o) < 0) this.pulse.o = 0
        if(Number(newValue.t) < 0) this.pulse.t = 0
      },
      deep: true

    }
  },
  methods: {
    pulseBack(a,b,c,o,t){
      if(a){
        if(this.data && this.data.controller && this.data.controller.pulse) this.pulse.a = this.data.controller.pulse.a
        else this.pulse.a = 0
      }
      if(b){
        if(this.data && this.data.controller && this.data.controller.pulse) this.pulse.b = this.data.controller.pulse.b
        else this.pulse.b = 0
      }
      if(c){
        if(this.data && this.data.controller && this.data.controller.pulse) this.pulse.c = this.data.controller.pulse.c
        else this.pulse.c = 0
      }
      if(o){
        if(this.data && this.data.controller && this.data.controller.pulse) this.pulse.o = this.data.controller.pulse.o
        else this.pulse.o = 0
      }
      if(t){
        if(this.data && this.data.controller && this.data.controller.pulse) this.pulse.t = this.data.controller.pulse.t
        else this.pulse.t = 0
      }
    },
    pulseCheck(){
      if(!this.data.controller.pulse && (Number(this.pulse.a) || Number(this.pulse.b) || Number(this.pulse.c) || Number(this.pulse.o) || Number(this.pulse.t))){
        if(!Number(this.pulse.a)) this.pulse.a = 1
        if(!Number(this.pulse.b)) this.pulse.b = 1
        if(!Number(this.pulse.c)) this.pulse.c = 1
        if(!Number(this.pulse.o)) this.pulse.o = 1
        if(!Number(this.pulse.t)) this.pulse.t = 1
      }
      if(this.data.controller.pulse && (!Number(this.pulse.a) || !Number(this.pulse.b) || !Number(this.pulse.c) || !Number(this.pulse.o) || !Number(this.pulse.t))){
        if(Number(this.pulse.a)) this.pulse.a = 0
        if(Number(this.pulse.b)) this.pulse.b = 0
        if(Number(this.pulse.c)) this.pulse.c = 0
        if(Number(this.pulse.o)) this.pulse.o = 0
        if(Number(this.pulse.t)) this.pulse.t = 0
      }
    },

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
        this.pulseCheck()
        const pulse = await this.$apollo.mutate({
          mutation: gql `
          mutation setControllerPulse ($input: ControllerPulseInput!) {
            setControllerPulse (input: $input) {
              controllerId
            }
          }
          `,
          variables: {
            input: {
              controllerId: Number(controller.id),
              a: Number(this.pulse.a),
              b: Number(this.pulse.b),
              c: Number(this.pulse.c),
              o: Number(this.pulse.o),
              t: Number(this.pulse.t),
            }
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
