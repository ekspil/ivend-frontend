<template>
	        <div class="container">
            <div class="side-app">


                <div class="row mt-5">
                    <div class="col-lg-10 offset-lg-1 col-md-12">
                        <form method="post" class="card">
                            <div class="card-header">
                                <h3 class="card-title f-b">Добавление контроллера</h3>
                            </div>


                            <div class="card-header-links">
                                <a href="javascript:void(0)" class="card-header-links__item">Вернуться назад</a>
                            </div>


                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12 col-lg-12">
                                        <div class="form-group">
                                            <label class="form-label f-b">Номер контроллера</label>
                                            <input type="text" class="form-control" value=""
                                                   name="example-text-input" placeholder="Введите номер контроллера">
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label f-b">Опции</label>
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
                                            <label class="form-label f-b">Состояние</label>
                                            <div class="selectgroup w-100">
                                                <label class="selectgroup-item">
                                                    <input type="radio" name="value" value="11"
                                                           class="selectgroup-input" checked>
                                                    <span class="selectgroup-button">Активирован</span>
                                                </label>
                                                <label class="selectgroup-item">
                                                    <input type="radio" name="value" value="12"
                                                           class="selectgroup-input">
                                                    <span class="selectgroup-button">Деактивирован</span>
                                                </label>
                                                <label class="selectgroup-item">
                                                    <input type="radio" name="value" value="13"
                                                           class="selectgroup-input">
                                                    <span class="selectgroup-button">Обучение</span>
                                                </label>
                                                <label class="selectgroup-item">
                                                    <input type="radio" name="value" value="14"
                                                           class="selectgroup-input">
                                                    <span class="selectgroup-button">Приостановлен</span>
                                                </label>
                                                <label class="selectgroup-item">
                                                    <input type="radio" name="value" value="15"
                                                           class="selectgroup-input">
                                                    <span class="selectgroup-button">Отладка</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="form-label f-b">Тип связи</label>
                                            <div class="selectgroup w-100">
                                                <label class="selectgroup-item">
                                                    <input type="radio" name="value" value="01"
                                                           class="selectgroup-input" checked>
                                                    <span class="selectgroup-button">3G</span>
                                                </label>
                                                <label class="selectgroup-item">
                                                    <input type="radio" name="value" value="02"
                                                           class="selectgroup-input">
                                                    <span class="selectgroup-button">WiFi</span>
                                                </label>
                                                <label class="selectgroup-item">
                                                    <input type="radio" name="value" value="03"
                                                           class="selectgroup-input">
                                                    <span class="selectgroup-button">Ethernet</span>
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
                                            <label class="form-label f-b">Режим безналичного устройства</label>
                                            <select class="form-control custom-select">
                                                <option value="0" selected>Выберите режим</option>
                                                <option value="1">Монетник</option>
                                                <option value="2">Автомат</option>
                                                <option value="3" >Монетник+автомат</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label class="form-label f-b">Режим работы</label>
                                            <select class="form-control custom-select">
                                                <option value="0" selected>Нет</option>
                                                <option value="1">ИНПАС</option>
                                                <option value="2">Сбербанк</option>
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

                                    </div>

                                </div>
                            </div>
                            <div class="card-footer text-right">
                                <div class="d-flex">
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
	export default {
		name: 'AddController'
	}
</script>
