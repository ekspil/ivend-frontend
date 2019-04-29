<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <div class="top-buttons__left-container">
                                    <router-link to="/controllers/add" class="btn btn-primary">Добавить контроллер</router-link>
                                </div>
                                <div class="">
                                    <div class="row gutters-xs">
                                        <span class="col-auto">
                                            <button class="btn btn-primary" type="button"><i
                                                class="fe fe-upload"></i>
                                            </button>
                                        </span>

                                        <span class="col-auto">
                                            <ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
                                        </span>

                                        <span class="col-auto">
                                            <button class="btn btn-primary" type="button">Сохранить
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Table
                            v-if="controllers && controllers.length > 0"
                            :headers="getTableHeaders"
                            :fields="getTableFields"
                            className="settings-table"
                        />

                        <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                        <div v-else class="aligned-text">Нет контроллеров</div>
                    </div>
                    <!-- section-wrapper -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    import Table from '@/modules/table/Table';
    import ExportExcel from '@/modules/table/ExportExcel';
    import { getTableHeaders, getTableFields } from '@/utils/mappers/Controllers';

    export default {
        name: 'Equipment',
        components: {
            Table,
            ExportExcel
        },
        data: () => ({
            controllers: []
        }),
        apollo: {
            controllers: {
                query: gql`
                    query {
                      getControllers {
                        id
                        uid
                        mode
                        revision {
                            name
                        }
                        status
                        bankTerminalMode
                        fiscalizationMode
                        firmwareId

                        machine {
                          id
                          name
                        }
                      }
                    }
                `,
                update (data) {
                    return data.getControllers;
                }
            }
        },
        methods: {
            getStatus (status) {
                switch (status) {
                    case 'ENABLED': return '<span class="status-icon bg-success"></span> Активирован';
                    case 'DISABLED': return '<span class="status-icon bg-danger"></span> Деактивирован';
                    case 'PAUSED': return '<span class="status-icon bg-secondary"></span> Приостановлен';
                    case 'DEBUG': return '<span class="status-icon bg-yellow"></span> Отладка';
                    case 'TRAINING': return '<span class="status-icon bg-info"></span> Обучение';
                }
            },

            async removeController (id) {
                await this.$apollo.mutate({
                    mutation: gql`
                        mutation ($id: Int!) {
                            deleteController (id: $id) {
                                name
                            }
                        }
                    `,
                    variables: { id }
                });

                this.controllers = this.controllers.filter(controller => controller.id !== id);
            }
        },
        computed: {
            getTableHeaders,
            getTableFields () {
                return getTableFields(this.controllers, {
                    remove: this.removeController
                });
            }
        }
    }
</script>
