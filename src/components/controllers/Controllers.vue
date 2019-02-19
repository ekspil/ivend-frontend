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
                            <div class="example">
                                <router-link to="/controllers/add" class="btn btn-primary">Добавить контроллер</router-link>
                                <div class="form-group float-right">
                                    <div class="row gutters-xs">
													<span class="col-auto">
															<button class="btn btn-primary" type="button"><i
                                                                    class="fe fe-upload"></i></button>
													</span>
                                        <div class="col">
                                            <input type="text" class="form-control  search-cont" placeholder="Поиск">
                                        </div>
                                        <span class="col-auto">
															<button class="btn btn-primary" type="button"><i
                                                                    class="fe fe-search"></i></button>
														</span>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="table-responsive" v-if="controllers && controllers.length > 0">
                            <table class="table card-table table-vcenter text-nowrap">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Имя</th>
                                    <th>Автомат</th>
                                    <th>Режим работы</th>
                                    <th>Группа</th>
                                    <th>Версия</th>
                                    <th>Опции</th>
                                    <th>Состояние</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>


                                <tr v-for="controller in controllers" v-bind:key="controller.id">
                                    <td><router-link href="#" class="text-black f-b" :to="`/controllers/edit/${controller.id}`">{{controller.uid}}</router-link></td>
                                    <td>{{controller.name}}</td>
                                    <td>{{controller.equipment.name}}</td>
                                    <td>{{controller.mode}}</td>
                                    <td>Общая</td>
                                    <td>{{controller.revision.name}}</td>
                                    <td>-</td>
                                    <!--<td><span class="status-icon bg-danger"></span> Дективирован</td>-->
                                    <td>{{controller.status}}</td>

                                    <td class="text-right">
                                        <div class="item-action dropdown">
                                            <a href="javascript:void(0)" data-toggle="dropdown" class="icon"><i
                                                    class="fe fe-more-vertical"></i></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="javascript:void(0)" class="dropdown-item"><i
                                                        class="dropdown-icon fe fe-edit-2"></i> Настроить </a>
                                                <a href="javascript:void(0)" class="dropdown-item"><i
                                                        class="dropdown-icon fe fe-x"></i> Удалить </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                        <!-- table-wrapper -->
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

                      }
                    }
                `,
                update (data) {
                    return data.getControllers;
                },
                fetchPolicy: 'no-cache'
            }
        }
    }
</script>
