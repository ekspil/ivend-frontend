<template>
    <Validate
      formName="editControllerSettings"
      ref="form"
      :schema="schema"
      @onSubmit="save"
      @onSuccess="onSuccess"
      v-if="controller"
    >
      <template slot="form">
                    <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="form-group">
                        <label class="form-label f-b">Название контроллера</label>
                        <Field className="form-control" name="name" formName="editControllerSettings" placeholder="Введите название" :value="controller.data.name" />
                    </div>
                    <div class="form-group">
                        <label class="form-label f-b">Модель автомата</label>
                        <select class="form-control select2-show-search" data-placeholder="Выберите из списка" v-model="controller.data.equipment.id">
                            <option v-for="equipment in controller.equipments" :key="equipment.id" :value="equipment.id">
                                {{ equipment.name }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label f-b">Номер контроллера UID</label>
                        <Field className="form-control" :value="controller.data.uid" disabled name="uid" formName="editControllerSettings" placeholder="Введите UID"/>
                    </div>
                    <div class="form-group">
                        <label class="form-label f-b">Версия контроллера</label>
                        <select class="form-control custom-select" v-model="controller.data.revision.id">
                            <option v-for="revision in controller.revisions" :key="revision.id" :value="revision.id">
                                {{ revision.name }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label f-b">Состояние контроллера</label>
                        <div class="selectgroup w-100">
                            <label class="selectgroup-item">
                                <input type="radio" name="value" value="ENABLED" class="selectgroup-input" checked v-model="controller.data.status" />
                                <span class="selectgroup-button">Активирован</span>
                            </label>
                            <label class="selectgroup-item">
                                <input type="radio" name="value" value="DISABLED" class="selectgroup-input" v-model="controller.data.status" />
                                <span class="selectgroup-button">Деактивирован</span>
                            </label>
                            <label class="selectgroup-item">
                                <input type="radio" name="value" value="TRAINING" class="selectgroup-input" v-model="controller.data.status" />
                                <span class="selectgroup-button">Обучение</span>
                            </label>
                            <label class="selectgroup-item">
                                <input type="radio" name="value" value="PAUSED" class="selectgroup-input" v-model="controller.data.status" />
                                <span class="selectgroup-button">Приостановлен</span>
                            </label>
                            <label class="selectgroup-item">
                                <input type="radio" name="value" value="DEBUG" class="selectgroup-input" v-model="controller.data.status" />
                                <span class="selectgroup-button">Отладка</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label f-b">Режим работы</label>
                        <select class="form-control custom-select" v-model="controller.data.mode">
                            <option value="MDB" selected>MDB</option>
                            <option value="EXE">EXE</option>
                            <option value="CASHLESS">Cashless</option>
                            <option value="CASHLESS_FREE">Cashless free</option>
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
                </div>
            </div>
      </template>
      <template slot="submit">
          <button type="submit" class="btn btn-primary ml-auto">Сохранить</button>
      </template>
    </Validate>
</template>

<script>
import gql from 'graphql-tag';

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

        schema: {
          name: [required],
          uid: [required]
        }
    }),
    apollo: {
        controller: {
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
            equipment {
              id,
              name
            },
            bankTerminal {
              name
            },
            fiscalRegistrar {
              name
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
       }
       `,
            update(data) {
                return {
                    data: data.controller,
                    equipments: data.equipments,
                    revisions: data.revisions
                };
            }
        }
    },
    methods: {
        async save() {
            try {
                const controllerData = {
                    name: this.$store.getters['cache/data'].name,
                    equipmentId: this.controller.data.equipment.id,
                    revisionId: this.controller.data.revision.id,
                    status: this.controller.data.status,
                    mode: this.controller.data.mode
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
                        id: this.controller.data.id,
                        data: controllerData
                    }
                });

                this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
            } catch (error) {
                this.$refs.form.showMessage('error', 'Ошибка сохранения.');
            }
      },
      onSuccess () {
        const router = this.$router;
        setTimeout(function () { router.push('/controllers'); }, 1000);
      }
    }
}
</script>
