<template>
	<div class="container">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-md-12 col-lg-12">
					<div class="card">
						<div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
						<div class="card-header">
							<div class="card-title f-b">Настройки</div>
						</div>

						<div class="tab-menu-heading">
							<div class="tabs-menu1">
								<!-- Tabs -->
								<ul class="nav panel-tabs f-b">
									<li class=""><a href="#tab1" class="active" data-toggle="tab">Оборудование</a></li>
									<li><a href="#tab2" data-toggle="tab">Уведомления</a></li>
									<li><a href="#tab3" data-toggle="tab">компания </a></li>
								</ul>
							</div>
						</div>

						<div class="text-wrap">
							<div class="example top-buttons-container top-buttons">
								<div class="top-buttons__left-container">
									<a href="#" class="btn btn-primary">Добавить автомат</a>
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

						<div class="table-responsive settings-table">
							<table class="table card-table table-vcenter text-nowrap">
								<thead>
									<tr>
										<th class="sortable up">Автомат</th>
										<th class="sortable">Название</th>
										<th>Группа</th>
										<th>Тип</th>
										<th>Модель</th>
										<th>Товары</th>
										<th class="sortable">Контроллер</th>
										<th>Состояние</th>
										<th>Дата</th>
										<th>Прошивка</th>
										<th>Режим</th>
										<th>Фискализация</th>
									</tr>
								</thead>
								<tbody>

									<tr>
										<td class="settings-link"><a href="#" class="f-b">25411 <i class="fe fe-more-vertical"></i></a>  </td>
										<td>Вокзал1</td>
										<td>Общая</td>
										<td>Кофе</td>
										<td>Kikko Max</td>
										<td>Не заполнены</td>
										<td class="settings-link">10005-2018 <i class="fe fe-more-vertical"></i></td>
										<td class="state dropdown" data-toggle="dropdown">
											<span class="status-icon bg-success"></span> Активирован

											<div class="dropdown-menu dropdown-menu-right">
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-success"></span> Активирован
												</a>
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-danger"></span> Дективирован

												</a>
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-secondary"></span>Приостановлен
												</a>

												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-yellow"></span> Отладка
												</a>
											</div>

										</td>
										<td>09.02.2019 14:45</td>
										<td>123456</td>
										<td>CASHLESS FREE</td>
										<td>Подтвержденный</td>
									</tr>

									<tr>
										<td class="settings-link"> <a href="#" class="f-b">25411 <i class="fe fe-more-vertical"></i></a> </td>
										<td>Вокзал1</td>
										<td>Общая</td>
										<td>Кофе</td>
										<td>Kikko Max</td>
										<td>Не заполнены</td>
										<td class="settings-link">10005-2018 <i class="fe fe-more-vertical"></i></td>
										<td class="state dropdown" data-toggle="dropdown">
											<span class="status-icon bg-secondary"></span>Приостановлен

											<div class="dropdown-menu dropdown-menu-right">
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-success"></span> Активирован
												</a>
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-danger"></span> Дективирован

												</a>
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-secondary"></span>Приостановлен
												</a>

												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-yellow"></span> Отладка
												</a>
											</div>

										</td>
										<td>09.02.2019 14:45</td>
										<td>123456</td>
										<td>CASHLESS FREE</td>
										<td>Подтвержденный</td>
									</tr>

									<tr>
										<td class="settings-link"><a href="#" class="f-b">25411 <i class="fe fe-more-vertical"></i></a>  </td>
										<td>Вокзал1</td>
										<td>Общая</td>
										<td>Кофе</td>
										<td>Kikko Max</td>
										<td>Не заполнены</td>
										<td class="settings-link">10005-2018 <i class="fe fe-more-vertical"></i></td>

										<td class="state dropdown" data-toggle="dropdown">
											<span class="status-icon bg-danger"></span> Дективирован

											<div class="dropdown-menu dropdown-menu-right">
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-success"></span> Активирован
												</a>
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-danger"></span> Дективирован

												</a>
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-secondary"></span>Приостановлен
												</a>

												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-yellow"></span> Отладка
												</a>
											</div>

										</td>
										<td>09.02.2019 14:45</td>
										<td>123456</td>
										<td>CASHLESS FREE</td>
										<td>Подтвержденный</td>
									</tr>

									<tr>
										<td class="settings-link"> <a href="#" class="f-b">25411 <i class="fe fe-more-vertical"></i></a> </td>
										<td>Вокзал1</td>
										<td>Общая</td>
										<td>Кофе</td>
										<td>Kikko Max</td>
										<td>Не заполнены</td>
										<td class="settings-link">10005-2018 <i class="fe fe-more-vertical"></i></td>

										<td class="state dropdown" data-toggle="dropdown">
											<span class="status-icon bg-yellow"></span> Отладка

											<div class="dropdown-menu dropdown-menu-right">
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-success"></span> Активирован
												</a>
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-danger"></span> Дективирован

												</a>
												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-secondary"></span>Приостановлен
												</a>

												<a href="javascript:void(0)" class="dropdown-item">
													<span class="status-icon bg-yellow"></span> Отладка
												</a>
											</div>

										</td>
										<td>09.02.2019 14:45</td>
										<td>123456</td>
										<td>CASHLESS FREE</td>
										<td>Подтвержденный</td>
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
	export default {
		name: 'Settings'
	}
</script>
