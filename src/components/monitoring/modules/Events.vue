<template>
	<div>
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
						<th class="sortable">Ошибки</th>
						<th class="sortable">Аудит1</th>
						<th class="sortable">Аудит2</th>
						<th class="sortable">Инкасация</th>
						<th class="sortable">Загрузка</th>
					</tr>
				</thead>
				<tbody>

					<tr>
						<td class="settings-link"><a href="#" class="f-b">Континент1 <i class="fe fe-more-vertical"></i> </a> </td>
						<td class="ok-cel">1 мин назад</td>
						<td class="attention-cel">25 окт 18:35</td>
						<td class="ok-cel">22 окт. 17:25</td>
						<td class="ok-cel">20 окт, 10:00</td>
						<td class="disabled-cel">ОТКЛ</td>
						<td class="attention-cel">21 окт. 10:10</td>
						<td class="attention-cel">21 окт. 10:10</td>
					</tr>

					<tr>
						<td class="settings-link"><a href="#" class="f-b">Континент2 <i class="fe fe-more-vertical"></i> </a> </td>
						<td class="warning-cel">1 день назад</td>
						<td class="warning-cel">24 окт 18:35</td>
						<td class="warning-cel">24 окт. 14:15</td>
						<td class="warning-cel">15 окт, 10:10</td>
						<td class="warning-cel">15 окт. 10:10</td>
						<td class="warning-cel">15 окт. 10:10</td>
						<td class="warning-cel">15 окт. 10:10</td>
					</tr>

					<tr>
						<td class="settings-link"><a href="#" class="f-b">Континент3 <i class="fe fe-more-vertical"></i> </a> </td>
						<td class="ok-cel">10 мин назад</td>
						<td class="ok-cel">25 окт 21:35</td>
						<td class="ok-cel">20 окт. 10:45</td>
						<td class="ok-cel">25 окт, 10:00</td>
						<td class="ok-cel">25 окт, 10:10</td>
						<td class="ok-cel">25 окт. 10:10</td>
						<td class="ok-cel">25 окт. 10:10</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Events'
	}
</script>
