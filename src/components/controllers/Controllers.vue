<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <div class="card-title f-b">Контроллеры</div>
                        </div>
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <div class="top-buttons__left-container">
                                    <router-link to="/controllers/add" class="btn btn-primary">Добавить автомат</router-link>
                                </div>
                                <div class="">
                                    <div class="row gutters-xs">
                                        <span class="col-auto">
                                            <button class="btn btn-primary" type="button"><i
                                                class="fe fe-upload"></i>
                                            </button>
                                        </span>

                                        <span class="col-auto">
                                            <button class="btn btn-primary" type="button"><i
                                                class="fe fe-download"></i>
                                            </button>
                                        </span>

                                        <span class="col-auto">
                                            <button class="btn btn-primary" type="button">Сохранить
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive settings-table" v-if="controllers && controllers.length > 0">
                            <table class="table card-table table-vcenter text-nowrap">
                                <thead>
                                    <tr>
                                        <th class="sortable">Название</th>
                                        <th class="sortable up">Контроллер</th>
                                        <th>Группа</th>
                                        <th>Тип</th>
                                        <th>Модель</th>
                                        <th>Товары</th>
                                        <th>Состояние</th>
                                        <th>Дата</th>
                                        <th>Прошивка</th>
                                        <th>Режим</th>
                                        <th>Фискализация</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="controller in controllers" :key="controller.id">
                                        <td class="settings-link">
                                            <router-link :to="`/controllers/edit/${controller.id}`" class="f-b">
                                                {{ controller.name || '-' }}
                                            </router-link>
                                        </td>
                                        <td>{{ controller.uid }}</td>
                                        <td>Общая</td>
                                        <td>Кофе</td>
                                        <td>{{ (controller.equipment && controller.equipment.name) || '-' }}</td>
                                        <td>Не заполнены</td>
                                        <td class="state dropdown" data-toggle="dropdown">
                                            <div v-html="getStatus(controller.status)"></div>
                                        </td>
                                        <td>09.02.2019 14:45</td>
                                        <td>{{ (controller.lastState && controller.lastState.firmwareId) || '-' }}</td>
                                        <td>{{ controller.mode || '-' }}</td>
                                        <td>{{ (controller.fiscalRegistrar && controller.fiscalRegistrar.name) || '-' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- table-wrapper -->

                        <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                        <div v-else class="aligned-text">Нет контроллеров</div>
                    </div>
                    <!-- section-wrapper -->
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

    </div>

</template>

<script>
    import gql from 'graphql-tag'

    export default {
        data: () => ({
            controllers: []
        }),
        apollo: {
            controllers: {
                query: gql`
                    query {
                      getControllers {
                        id
                        name
                        uid
                        mode
                        revision {
                            name
                        }
                        status
                        equipment {
                          name
                        }
                        bankTerminal {
                          name
                        }
                        fiscalRegistrar {
                          name
                        }
                        lastState {
                            firmwareId
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
            }
        }
    }
</script>
