<template>
	<div>
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
</template>

<script>
	export default {
		name: 'Equipment'
	}
</script>
