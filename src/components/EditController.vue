<template>
    <div class="container">
        <div class="side-app" v-if="controller">
            <div class="row mt-5">
                <div class="col-lg-8 offset-2">
                    <form method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title f-b">Редактирование оборудования {{controller.uid}}</h3>
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
                                        <label class="form-label f-b">{{controller.name}}</label>
                                        <input type="text" class="form-control" value="Контроллер"
                                               name="example-text-input" placeholder="Введите название">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label f-b">Модель автомата</label>
                                        <select class="form-control select2-show-search"
                                                data-placeholder="Выберите из списка">

                                            <option label="Выберите из списка">
                                            </option>
                                            <option value="1">Necta Kikko Max</option>
                                            <option value="2">Без автомата</option>
                                            <option value="3" selected>Necta Kikko ES6</option>
                                            <option value="4">Necta Astro</option>
                                            <option value="5">Necta Snakky Max</option>
                                            <option value="6">Necta Colibri C5</option>
                                            <option value="7">Spengler 1000</option>
                                            <option value="8">Crane 167</option>
                                            <option value="9">Necta Opera</option>
                                            <option value="10">Unicum Rosso</option>
                                            <option value="11">Unicum FoodBox</option>
                                            <option value="12">Unicum Nero</option>
                                            <option value="13">Necta Concerto</option>
                                            <option value="14">Rheavendors Luce X2</option>
                                            <option value="15">Crane 472</option>
                                            <option value="16">Rheavendors Sagoma H7</option>
                                            <option value="17">Saeco Atlante 500</option>
                                            <option value="18">Crane Vendo Sanden 217</option>
                                            <option value="19">Crane Vendo Sanden 680</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Номер контроллера UID</label>
                                        <input type="text" class="form-control" value="10000003-1217" disabled
                                               name="example-text-input" placeholder="Введите UID">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label f-b">Версия контроллера</label>
                                        <div class="selectgroup w-100">
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="01" class="selectgroup-input"
                                                       checked>
                                                <span class="selectgroup-button">01</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="02" class="selectgroup-input">
                                                <span class="selectgroup-button">02</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="03" class="selectgroup-input">
                                                <span class="selectgroup-button">03</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="04" class="selectgroup-input">
                                                <span class="selectgroup-button">04</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Версия контроллера</label>
                                        <div class="selectgroup w-100">
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="11" class="selectgroup-input"
                                                       checked>
                                                <span class="selectgroup-button">Активирован</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="12" class="selectgroup-input">
                                                <span class="selectgroup-button">Деактивирован</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="13" class="selectgroup-input">
                                                <span class="selectgroup-button">Обучение</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="14" class="selectgroup-input">
                                                <span class="selectgroup-button">Приостановлен</span>
                                            </label>
                                            <label class="selectgroup-item">
                                                <input type="radio" name="value" value="15" class="selectgroup-input">
                                                <span class="selectgroup-button">Отладка</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label f-b">Режим работы</label>
                                        <select class="form-control custom-select">
                                            <option value="0">Выберите режим</option>
                                            <option value="1">MDB</option>
                                            <option value="2">EXE</option>
                                            <option value="3" selected>Cashless</option>
                                            <option value="4">Cashless free</option>
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
                                        <label class="form-label f-b">Банковские терминал</label>
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
                                <a href="javascript:void(0)" class="btn btn-link">Вернуться назад</a>
                                <button type="submit" class="btn btn-primary ml-auto">Сохранить</button>
                            </div>
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
    import gql from 'graphql-tag'

    export default {
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
                        revision
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
                `
            }
        }

    }
</script>
