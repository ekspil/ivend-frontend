<template>
	    <div class="container">
            <div class="side-app">

                <div class="row mt-5">
                    <div class="col-md-12 col-lg-12">
                        <div class="card">
                            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                            <div class="card-header">
                                <div class="card-title f-b">Мониторинг</div>
                            </div>

                            <div class="tab-menu-heading">
                                <div class="tabs-menu1">
                                    <!-- Tabs -->
                                    <ul class="nav panel-tabs f-b">
                                        <li class=""><a href="#tab1" class="active" data-toggle="tab">Состояние</a></li>
                                        <li><a href="#tab2" data-toggle="tab">События</a></li>
                                    </ul>
                                </div>
                            </div>


                            <div class="text-wrap">
                                <div class="example top-buttons-container top-buttons">
                                    <div class="top-buttons__left-container"></div>

                                    <div class="">
                                        <div class="row gutters-xs">

                                            <button class="btn btn-primary" type="button">Выгрузить &#032;<i
                                                    class="fe fe-download"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="table-responsive monitoring-table">
                                <table class="table card-table table-vcenter text-nowrap">
                                    <thead>
                                    <tr>
                                        <th class="sortable up">Автомат</th>
                                        <th class="sortable">Связь</th>
                                        <th class="sortable">Продажи</th>
                                        <th class="sortable">Контроллер</th>
                                        <th>Монетник</th>
                                        <th>Купюрник</th>
                                        <th>Терминал</th>
                                        <th>Касса</th>
                                        <th>Аудит</th>
                                        <th>Аудит2</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr v-for="(controller, index) in controllers" :key="controller.id">
                                        <td class="settings-link"><a href="#" class="f-b">{{ controller.name }}<i class="fe fe-more-vertical"></i> </a> </td>

                                        <td class="warning-cel">{{ controller.lastState.signalStrength }}</td>
                                        <td class="warning-cel">Нет - 1 день</td>
                                        <td class="warning-cel">{{ controller.lastState.registrationTime }}</td>
                                        <td class="warning-cel">{{ controller.lastState.coinAmount }}</td>
                                        <td class="warning-cel">{{ controller.lastState.billAmount }}</td>
                                        <td class="warning-cel">X - КИТ</td>
                                        <td class="warning-cel">X - КИТ</td>
                                        <td class="warning-cel">X</td>
                                        <td class="disabled-cel">ОТКЛ</td>
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
</template>

<script>
	import gql from 'graphql-tag';

	export default {
		name: 'Monitoring',
		data: () => ({
			controllers: []
		}),
		apollo: {
			controllers: {
				query: gql`
					query {
						getControllers {
							id,
							name,
							lastState {
								signalStrength,
								registrationTime,
								billAmount,
								coinAmount
							}
						}
					}
				`,
				update: data => data.getControllers
			}
		}
	}
</script>
