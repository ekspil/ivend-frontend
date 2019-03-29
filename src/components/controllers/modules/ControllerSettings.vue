<template>
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
          <label class="form-label f-b">Название контроллера</label>
          <Field className="form-control" name="name" formName="editControllerSettings" placeholder="Введите название" :value="data.controller.name" />
        </div>
        <div class="form-group">
          <label class="form-label f-b">Номер контроллера UID</label>
          <Field className="form-control" :value="data.controller.uid" disabled name="uid" formName="editControllerSettings" placeholder="Введите UID"/>
        </div>
        <div class="form-group">
          <label class="form-label f-b">Версия контроллера</label>
          <select class="form-control custom-select" v-model="data.controller.revision.id">
            <option v-for="revision in data.revisions" :key="revision.id" :value="revision.id">
              {{ revision.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label f-b">Состояние контроллера</label>
          <div class="selectgroup w-100">
            <label class="selectgroup-item">
              <input type="radio" name="value" value="ENABLED" class="selectgroup-input" checked v-model="data.controller.status" />
              <span class="selectgroup-button">Активирован</span>
            </label>
            <label class="selectgroup-item">
              <input type="radio" name="value" value="DISABLED" class="selectgroup-input" v-model="data.controller.status" />
              <span class="selectgroup-button">Деактивирован</span>
            </label>
            <label class="selectgroup-item">
              <input type="radio" name="value" value="TRAINING" class="selectgroup-input" v-model="data.controller.status" />
              <span class="selectgroup-button">Обучение</span>
            </label>
            <label class="selectgroup-item">
              <input type="radio" name="value" value="PAUSED" class="selectgroup-input" v-model="data.controller.status" />
              <span class="selectgroup-button">Приостановлен</span>
            </label>
            <label class="selectgroup-item">
              <input type="radio" name="value" value="DEBUG" class="selectgroup-input" v-model="data.controller.status" />
              <span class="selectgroup-button">Отладка</span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label f-b">Режим работы</label>
          <select class="form-control custom-select" v-model="data.controller.mode">
            <option value="mdb">mdb</option>
            <option value="exe">exe</option>
            <option value="cashless" selected>cashless</option>
            <option value="cashless_free">cashless_free</option>
            <option value="exe_ph">exe_ph</option>
            <option value="mdb_D">mdb_D</option>
            <option value="exe_D">exe_D</option>
            <option value="exe_ph_D">exe_ph_D</option>
            <option value="cashless_D">cashless_D</option>
            <option value="mdb_C">mdb_C</option>
            <option value="exe_C">exe_C</option>
            <option value="exe_ph_C">exe_ph_C</option>
            <option value="cashless_C">cashless_C</option>
            <option value="ps_p">ps_p</option>
            <option value="ps_m_D">ps_m_D</option>
            <option value="ps_M_D">ps_M_D</option>
            <option value="ps_m_C">ps_m_C</option>
            <option value="ps_M_C">ps_M_C</option>
            <option value="mdb2">mdb2</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label f-b">Фискальный регистратор</label>
          <div class="input-group">
            <input type="text" class="form-control" value="ККТ Казначей ФА" placeholder="Выберите регистратор">
            <span class="input-group-append">
              <button class="btn btn-dark" type="button">Настроить</button>
            </span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label f-b">Банковские терминалы</label>
          <select class="form-control custom-select">
            <option value="0">Выберите режим</option>
            <option value="1">MDB</option>
            <option value="2">EXE</option>
            <option value="3" selected>PAX D200</option>
            <option value="4">Cashless free</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label f-b">Привязать автомат:</label>
          <select class="form-control custom-select" v-model="data.controller.machine.id">
            <option :value="null">Нет</option>
            <option v-for="machine in data.machines"
            :key="machine.id" :value="machine.id">
            {{ machine.name }}
          </option>
        </select>
      </div>

      <div class="form-group select-services">
        <label class="form-label f-b">Услуги</label>

        <label class="toggle-checkbox" v-for="(service, index) in data.services" :key="service.id">
          <input
            type="checkbox"
            v-model="input.serviceIds[index].checked"
          />
          <span class="slider round"> </span>
          <span class="label-text">{{ service.name }} ({{ service.price }} руб/{{ getBillingAbbr(service.billingType) }})</span>
        </label>
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

</template>

<script>
import gql from 'graphql-tag';

import { find, propEq } from 'ramda';

import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';

import { required } from '@/utils/validation';

export default {
  name: 'ControllerSettings',
  components: {
    Validate,
    Field
  },
  data: () => ({
    controller: null,
    input: {
      serviceIds: []
    },

    schema: {
      name: [required],
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
          id,
          name,
          uid,
          mode,
          revision {
            id,
            name
          },
          status,
          bankTerminal {
            name
          },
          fiscalRegistrar {
            name
          }

          machine {
            id
          }

          services {
            id
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

        services: getAvailableServices {
          controller {
            id,
            name,
            price,
            billingType
          }
        }
      }
      `,
      update(data) {
        if (!this.controllerUploading) {
          if (data.controller.services.length > 0) {
            this.input.serviceIds = data.controller.services.map(service => ({
              ...service,
              checked: find(propEq('id', service.id))(data.controller.services)
            }));
          } else {
            this.input.serviceIds = data.services.controller.map(service => ({
              id: service.id,
              checked: false
            }));
          }
        }

        return {
          controller: data.controller,
          equipments: data.equipments,
          revisions: data.revisions,
          machines: data.machines,
          services: data.services.controller
        };
      }
    }
  },
  methods: {
    async save() {
      try {
        this.controllerUploading = true;

        const controller = this.data.controller;
        const controllerData = {
          name: this.$store.getters['cache/data'].name,
          revisionId: controller.revision.id,
          status: controller.status,
          mode: controller.mode,
          machineId: controller.machine.id,
          serviceIds: this.input.serviceIds.map(service => service.checked ? service.id : null).filter(id => id !== null)
        };

        const { errors } = await this.$apollo.mutate({
          mutation: gql `
          mutation saveController ($id: Int, $data: EditControllerInput!) {
            editController (id: $id, input: $data) {
              name
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
