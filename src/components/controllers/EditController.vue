<template>
    <div class="container">
        <div class="side-app" v-if="controller">
            <div class="row mt-5">
                <div class="col-lg-8 offset-2">
                    <form method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title f-b">Редактирование оборудования №{{controller.uid}}</h3>
                        </div>

                        <div class="tab-menu-heading">
                            <div class="tabs-menu1 ">
                                <!-- Tabs -->
                                <ul class="nav panel-tabs f-b">
                                    <li class=""><a href="#tab1" class="active" data-toggle="tab">Настройки</a></li>
                                    <li><a href="#tab2" data-toggle="tab">Фискальный регистратор</a></li>
                                    <li><a href="#tab3" data-toggle="tab">Товары</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <div class="validation-error" v-if="validation.name">{{ validation.name }}</div>
                                        <label class="form-label f-b">Название контроллера</label>
                                        <input type="text" class="form-control" v-model="controller.name"
                                               name="example-text-input" placeholder="Введите название"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label f-b">Модель автомата</label>
                                        <select class="form-control select2-show-search"
                                                data-placeholder="Выберите из списка" v-model="controller.equipment.id">
                                            <option v-for="(equipment, index) in equipments" :key="equipment.id" :value="equipment.id">
                                                {{ equipment.name }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Номер контроллера UID</label>
                                        <input type="text" class="form-control" :value="controller.uid" disabled
                                               name="example-text-input" placeholder="Введите UID">
                                    </div>

                                    <div class="form-group">
                                         <label class="form-label f-b">Версия контроллера</label>
                                         <select class="form-control custom-select" v-model="controller.revision.id">
                                             <option v-for="(revision, index) in revisions"
                                                     :key="revision.id" :value="revision.id">
                                                 {{ revision.name }}
                                             </option>
                                         </select>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Состояние контроллера</label>
                                        <div class="selectgroup w-100">
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="ENABLED" class="selectgroup-input"
                                                       checked v-model="controller.status"/>
                                                <span class="selectgroup-button">Активирован</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="DISABLED" class="selectgroup-input" v-model="controller.status"/>
                                                <span class="selectgroup-button">Деактивирован</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="TRAINING" class="selectgroup-input" v-model="controller.status"/>
                                                <span class="selectgroup-button">Обучение</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="PAUSED" class="selectgroup-input" v-model="controller.status"/>
                                                <span class="selectgroup-button">Приостановлен</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="DEBUG" class="selectgroup-input" v-model="controller.status"/>
                                                <span class="selectgroup-button">Отладка</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Режим работы</label>
                                        <select class="form-control custom-select" v-model="controller.mode">
                                            <option value="MDB" selected>MDB</option>
                                            <option value="EXE">EXE</option>
                                            <option value="CASHLESS">Cashless</option>
                                            <option value="CASHLESS_FREE">Cashless free</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label f-b">Фискальный регистратор</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" value="ККТ Казначей ФА"
                                                   placeholder="Выберите регистратор">
                                            <span class="input-group-append">
															<button class="btn btn-dark"
                                                                    type="button">Настроить</button>
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
                        </div>
                        <div class="card-footer text-right">
                            <div class="d-flex">
                                <router-link to="/controllers" class="btn btn-link">Вернуться назад</router-link>
                                <button type="submit" class="btn btn-primary ml-auto" @click.prevent="save">Сохранить</button>
                            </div>

                            <transition name="fade">
                                <div class="validation-error" v-if="status.error">{{ status.error }}</div>
                                <div class="success-message" v-if="status.success">{{ status.success }}</div>
                            </transition>
                        </div>
                    </form>

                </div>
            </div>


        </div>
        <!--footer-->
        <footer class="footer">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-md-12 col-sm-12 mt-3 mt-lg-0 text-center">
                        © 2018 <a href="#">ivend</a>. Все права защищены.
                    </div>
                </div>
            </div>
        </footer>
        <!-- End Footer-->
    </div>

</template>


<script>
    import gql from 'graphql-tag';

    import { head, isEmpty } from 'ramda';
    import { areKeysNull } from '@/utils';
    import {
        validate, mapValidationObject,
        required
    } from '@/utils/validation';

    export default {
        data: () => ({
            controller: null,
            equipments: [],
            revisions: [],

            validation: {},
            status: {
                error: null,
                success: ''
            }
        }),
        apollo: {
            controller: {
                variables() {
                    return {
                        id: Number(this.$route.params.id),
                    }
                },
                query: gql`
                    query GetController($id: Int!) {
                      controller: getController(id: $id) {
                        id
                        name
                        uid
                        mode
                        revision {
                            id,
                            name
                        }
                        status
                        equipment {
                          id,
                          name
                        }
                        bankTerminal {
                          name
                        }
                        fiscalRegistrar {
                          name
                        }
                      }
                    }
                `
            },
            equipments: gql`
                query {
                    equipments: getEquipments {
                        id,
                        name
                    }
                }
            `,
            revisions: gql`
                query {
                    revisions: getRevisions {
                        id,
                        name
                    }
                }
            `
        },
        methods: {
            showSuccessMessage (message = 'Успешно сохранено.') {
                this.status.success = message;
                setTimeout(() => { this.status.success = ''; }, 2500);
            },
            async save () {
                this.validation = mapValidationObject(validate(this.controller, {
                    name: [required]
                }));

                if (areKeysNull(this.validation)) {
                    try {
                        const controllerData = {
                            name: this.controller.name,
                            equipmentId: this.controller.equipment.id,
                            revisionId: this.controller.revision.id,
                            status: this.controller.status,
                            mode: this.controller.mode
                        };

                        const { errors, data } = await this.$apollo.mutate({
                            mutation: gql`
                                mutation saveController ($id: Int, $data: EditControllerInput!) {
                                    editController (id: $id, input: $data) {
                                        name
                                    }
                                }
                            `,
                            variables: {
                                id: this.controller.id,
                                data: controllerData
                            }
                        });

                        if (errors && !isEmpty(errors)) {
                            this.status.error = head(errors).message || 'Ошибка сохранения.';
                        } else {
                            this.showSuccessMessage();
                        }
                    } catch (error) {
                        this.status.error = error.message || 'Ошибка сохранения.';
                    }
                }
            }
        }
    }
</script>
