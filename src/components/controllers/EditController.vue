<template>
  <div class="container">
    <div class="side-app" v-if="data">
      <div class="row mt-5">
        <div class="col-lg-8 offset-2 card">
          <div class="card-header">
            <h3 class="card-title f-b">Редактирование оборудования №{{data.controller.uid}}</h3>
          </div>

          <Validate
          routeBack="/settings"
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
                  <label class="form-label f-b">Номер контроллера UID</label>
                  <Field className="form-control" :value="data.controller.uid" disabled name="uid" formName="editControllerSettings" placeholder="Введите UID"/>
                </div>
                <div class="form-group" v-if="false">
                  <label class="form-label f-b">Версия контроллера</label>
                  <select class="form-control custom-select" v-model="data.controller.revision.id">
                    <option v-for="revision in data.revisions" :key="revision.id" :value="revision.id">
                      {{ revision.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label f-b">Состояние контроллера</label>
                  <select v-model="data.controller.status" class="form-control custom-select">
                    <option value="ENABLED">Активирован</option>
                    <option value="DISABLED">Деактивирован</option>
                    <option value="TRAINING">Обучение</option>
                    <option value="PAUSED">Приостановлен</option>
                    <option value="DEBUG">Отладка</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label f-b">Режим работы</label>
                  <select class="form-control custom-select" v-model="data.controller.mode">
                    <option value="mdb">MDB</option>
                    <option value="mdb1">MDB1</option>
                    <option value="mdb2">MDB2</option>
                    <option value="exe">EXE</option>
                    <option value="cashless" selected>CASHLESS</option>
                    <option value="cashless2" selected>CASHLESS2</option>
                    <option value="cashless_free">CASHLESS_Free</option>
                    <option value="cashless_C">CASHLESS_C</option>
                    <option value="cashless_D">CASHLESS_D</option>
                    <option value="exe_ph">EXE_ph</option>
                    <option value="mdb_D">MDB_D</option>
                    <option value="exe_D">EXE_D</option>
                    <option value="exe_ph_D">EXE_ph_D</option>
                    <option value="mdb_C">MDB_C</option>
                    <option value="exe_C">EXE_C</option>
                    <option value="exe_ph_C">EXE_ph_C</option>
                    <option value="ps_m_D">PULSE</option>
                    <option value="ps_m_2">PULSE2</option>
                    <option value="ps_m_3">PULSE3</option>
                    <option value="ps_p">PULSE4</option>
                    <option value="ps_M_D">PULSE_M_D</option>
                    <option value="ps_m_C">PULSE_m_C</option>
                    <option value="rs232">RS232</option>
                  </select>
                </div>
                <div v-if="false" class="form-group">
                  <label class="form-label f-b">Режим считывания статистики</label>
                  <select class="form-control custom-select" v-model="data.controller.readStatMode">
                    <option value="COINBOX">Монетник</option>
                    <option value="MACHINE">Автомат</option>
                    <option value="COINBOX_MACHINE">Монетник+автомат</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label f-b">Режим работы терминала</label>
                  <select class="form-control custom-select" v-model="data.controller.bankTerminalMode">
                    <option value="NO_BANK_TERMINAL">Нет</option>
                    <option value="INPAS">ИНПАС</option>
                    <option value="SBERBANK">Сбербанк</option>
                    <option value="d200i_v">PAX D200 Инпас Vend</option>
                    <option value="d200i_t">PAX D200 Инпас Trade</option>
                    <option value="d200s_v">PAX D200 Сбер Vend</option>
                    <option value="d200s_t">PAX D200 Сбер Trade</option>
                    <option value="otiu_v">OTI UNO Vend</option>
                    <option value="otiu_t">OTI UNO Trade</option>
                    <option value="otit_v">OTI TRIO Vend</option>
                    <option value="otit_t">OTI TRIO Trade</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label f-b">Режим фискализации</label>
                  <select class="form-control custom-select" v-model="data.controller.fiscalizationMode">
                    <option value="NO_FISCAL">Нефискальный</option>
                    <option value="UNAPPROVED">Фискальный</option>
                    <option v-if="false" value="APPROVED">С подтверждением</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label f-b">Номер удалённого принтера</label>
                  <Field className="form-control" :value="data.controller.remotePrinterId" name="remotePrinterId" formName="editControllerSettings" placeholder="Введите номер удалённого принтера"/>
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

import { required } from '@/utils/validation';

export default {
  components: {
    Validate,
    Field
  },
  data: () => ({
    data: null,

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
  methods: {
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
