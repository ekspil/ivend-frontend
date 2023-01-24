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
                  <button class="btn btn-primary ml-auto" data-toggle="modal" data-target="#ModalSettingsController" @click.prevent="" :disabled="!(data.controller.mode === 'ps_m_D' || data.controller.mode === 'mech')">Параметры</button>
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
                    <button class="btn btn-primary ml-auto" data-toggle="modal" data-target="#ModalSettingsTerminal" @click.prevent="" :disabled="!(data.controller.mode === 'ps_m_D' || data.controller.mode === 'mech' || isVendistaIntegrated)">Параметры</button>
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
                    <button class="btn btn-primary ml-auto" @click.prevent="fiscalEditPage()">Параметры</button>
                  </div>
                </div>

                <div class="form-group" style="margin-top: 1rem" v-if="false">
                  <label class="form-label f-b">{{controllerHeaders.printer}}</label>
                  <Field className="form-control" :value="data.controller.remotePrinterId" name="remotePrinterId" formName="editControllerSettings" placeholder="Введите номер удалённого принтера" :disabled="true"/>
                </div>

              </div>
            </div>









          </template>
          <template slot="submit">
            <button type="submit" class="btn btn-primary ml-auto" :disabled="disSave">Сохранить</button>
          </template>
        </Validate>

        <div class="aligned-text" v-else-if="$apollo.loading">Загрузка...</div>
        <div class="aligned-text" v-else>Ошибка загрузки контроллера</div>

      </div>
    </div>
  </div>


<Pulse :data="data" :pulse="pulse" :isVendistaIntegrated="isVendistaIntegrated"></Pulse>



</div>

</template>


<script>
import gql from 'graphql-tag';

import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';
import {controllerHeaders, controllerStates, controllerType, controllerStatType, controllerTerminal, controllerFiscalType } from '@/utils/lists/Controller';
import Pulse from '@/components/controllers/dialogs/pulse'
import { required } from '@/utils/validation';

export default {
  components: {
    Validate,
    Field,
    Pulse
  },
  data: () => ({
    routeBack: "/settings",
    data: null,
    disSave: false,
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
      d: 0,
      e: 0,
      f: 0,
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
          autoSetUp
          mode
          revision {
            id,
            name
          }
          status
          bankTerminalMode
          bankTerminalUid
          readStatMode
          fiscalizationMode
          remotePrinterId
          pulse {
            a
            b
            c
            o
            t
            randomCommands
          }
          mech {
            a
            b
            c
            o
            t
            d
            e
            f
            randomCommands
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
        if(data.controller.mech && !this.data){
          this.pulse = JSON.parse(JSON.stringify(data.controller.mech))
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
  computed:{
    isVendistaIntegrated(){
      if(this.data && this.data.controller && this.data.controller.uid.slice(0, 3) === "300"){
        return true
      }
      return false
    }
  },
  methods: {

    pulseCheck(){
      if (this.data.controller.mode === 'ps_m_D' || this.data.controller.mode === 'mech'){
        if (!this.data.controller.pulse && (Number(this.pulse.a) || Number(this.pulse.b) || Number(this.pulse.c) || Number(this.pulse.d) || Number(this.pulse.e) || Number(this.pulse.f) || Number(this.pulse.o) || Number(this.pulse.t))) {
          if (!Number(this.pulse.a)) this.pulse.a = 1
          if (!Number(this.pulse.b)) this.pulse.b = 1
          if (!Number(this.pulse.c)) this.pulse.c = 1
          if (!Number(this.pulse.d)) this.pulse.d = 1
          if (!Number(this.pulse.e)) this.pulse.e = 1
          if (!Number(this.pulse.f)) this.pulse.f = 1
          if (!Number(this.pulse.o)) this.pulse.o = 1
          if (!Number(this.pulse.t)) this.pulse.t = 1
        }
        if (this.data.controller.pulse && (!Number(this.pulse.a) || !Number(this.pulse.b) || !Number(this.pulse.c) || !Number(this.pulse.d) || !Number(this.pulse.e) || !Number(this.pulse.f)  || !Number(this.pulse.o) || !Number(this.pulse.t))) {
          if (Number(this.pulse.a)) this.pulse.a = 0
          if (Number(this.pulse.b)) this.pulse.b = 0
          if (Number(this.pulse.c)) this.pulse.c = 0
          if (Number(this.pulse.d)) this.pulse.d = 0
          if (Number(this.pulse.e)) this.pulse.e = 0
          if (Number(this.pulse.f)) this.pulse.f = 0
          if (Number(this.pulse.o)) this.pulse.o = 0
          if (Number(this.pulse.t)) this.pulse.t = 0
        }
      }
    },

    fiscalEditPage(){
      window.open("/settings#fiscal", '_blank').focus();
    },
    async save() {
      this.disSave = true
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
          bankTerminalUid: controller.bankTerminalUid,
          readStatMode: controller.readStatMode,
          autoSetUp: controller.autoSetUp,
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
        let input = {}
        if (this.data.controller.mode === 'ps_m_D'){
          input = {
                controllerId: Number(controller.id),
                a: Number(this.pulse.a),
                b: Number(this.pulse.b),
                c: Number(this.pulse.c),
                o: Number(this.pulse.o),
                t: Number(this.pulse.t),
                commands: this.pulse.randomCommands
          }
        }
        else{
          input = {
                controllerId: Number(controller.id),
                a: Number(this.pulse.a),
                b: Number(this.pulse.b),
                c: Number(this.pulse.c),
                d: Number(this.pulse.d),
                e: Number(this.pulse.e),
                f: Number(this.pulse.f),
                o: Number(this.pulse.o),
                t: Number(this.pulse.t),
                commands: this.pulse.randomCommands
          }
        }

        const pulse = await this.$apollo.mutate({
          mutation: gql `
          mutation setControllerPulse ($input: ControllerPulseInput!) {
            setControllerPulse (input: $input) {
              controllerId
            }
          }
          `,
          variables: {
            input
          }
        });

        this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
      } catch (error) {
        this.$refs.form.showMessage('error', 'Ошибка сохранения.');
      } finally {
        this.controllerUploading = false;
        this.disSave = false
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
