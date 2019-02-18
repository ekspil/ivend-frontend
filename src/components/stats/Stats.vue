<template>
	        <div class="container">
            <div class="side-app">

                <div class="row mt-5">
                    <div class="col-md-12 col-lg-12">
                        <div class="card">
                            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                            <div class="card-header">
                                <div class="card-title f-b">Статистика</div>
                            </div>

                            <div class="tab-menu-heading">
                                <div class="tabs-menu1">
                                    <!-- Tabs -->
                                    <ul class="nav panel-tabs f-b">
                                        <li class=""><a href="#tab1" class="active" data-toggle="tab">Финансы</a></li>
                                        <li><a href="#tab2" data-toggle="tab">Продажи</a></li>
                                    </ul>
                                </div>
                            </div>


                            <div class="stats-top-menu">
                                <div class="stats-top-menu__content-container">
                                    <div class="stats-top-menu__date-buttons">
                                        <button class="stats-top-menu__item">Всего</button>
                                        <button class="stats-top-menu__item">День</button>
                                        <button class="stats-top-menu__item stats-top-menu__item--active">Неделя
                                        </button>
                                        <button class="stats-top-menu__item">Месяц</button>


                                        <div id="periodinput" class="stats-top-menu__date-period">
                                            <button id="btn1" class="stats-top-menu__item stats-top-menu__item--date" onclick="selectedInput(this, 'from')" data-calendar-label="" data-calendar-area="">от</button>

                                            <div class="stats-top-menu__date-separator"></div>

                                            <button id="btn2" class="stats-top-menu__item stats-top-menu__item--date" onclick="selectedInput(this, 'to')" data-calendar-label="" data-calendar-area="">до</button>

                                            <form id="calendar" class="calendar disabled-block" tabindex="-1">
                                                <div class="v-cal" id="v-cal-from" >
                                                    <div class="vcal-header">
                                                        <div class="vcal-btn--prev" data-calendar-toggle="previous">
                                                        </div>

                                                        <div class="vcal-header__label" data-calendar-label="month">
                                                            Февраль 2018
                                                        </div>


                                                        <div class="vcal-btn--next" data-calendar-toggle="next">
                                                        </div>
                                                    </div>


                                                    <div class="vcal-week">
                                                        <span>Пн</span>
                                                        <span>Вт</span>
                                                        <span>Ср</span>
                                                        <span>Чт</span>
                                                        <span>Пт</span>
                                                        <span>Сб</span>
                                                        <span>Вс</span>
                                                    </div>
                                                    <div class="vcal-body" data-calendar-area="month"></div>
                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                    <button class="btn btn-primary" type="button"><i
                                            class="fe fe-download"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="table-responsive stats-table">
                                <table class="table card-table table-vcenter text-nowrap">
                                    <thead>
                                    <tr>
                                        <th class="sortable up">Автомат</th>
                                        <th class="sortable">Кол-во продаж</th>
                                        <th class="sortable"> Сумма</th>
                                        <th class="sortable">Безнал</th>
                                        <th>Терминал</th>
                                        <th>Кошелек</th>
                                        <th class="sortable">Наличные</th>
                                        <th>Купюры</th>
                                        <th>Монеты</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr>
                                        <td class="f-b">Континент1</td>
                                        <td>12</td>
                                        <td>1200</td>
                                        <td>700</td>
                                        <td>500</td>
                                        <td>200</td>
                                        <td>500</td>
                                        <td>200</td>
                                        <td>100</td>
                                    </tr>

                                    <tr>
                                        <td class="f-b">Континент1</td>
                                        <td>12</td>
                                        <td>1200</td>
                                        <td>700</td>
                                        <td>500</td>
                                        <td>200</td>
                                        <td>500</td>
                                        <td>200</td>
                                        <td>100</td>
                                    </tr>

                                    <tr>
                                        <td class="f-b">Континент1</td>
                                        <td>12</td>
                                        <td>1200</td>
                                        <td>700</td>
                                        <td>500</td>
                                        <td>200</td>
                                        <td>500</td>
                                        <td>200</td>
                                        <td>100</td>
                                    </tr>

                                    <tr>
                                        <td class="f-b">Континент1</td>
                                        <td>12</td>
                                        <td>1200</td>
                                        <td>700</td>
                                        <td>500</td>
                                        <td>200</td>
                                        <td>500</td>
                                        <td>200</td>
                                        <td>100</td>
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
            <!-- End Footer-->
        </div>
    </div>
</template>

<script>
	export default {
		name: 'Stats'
	}
</script>
