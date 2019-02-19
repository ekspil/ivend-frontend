<template>
	<div>
		<div class="stats-top-menu">
			<div class="stats-top-menu__content-container">
				<div class="stats-top-menu__date-buttons">
					<button class="stats-top-menu__item">Всего</button>
					<button class="stats-top-menu__item">День</button>
					<button class="stats-top-menu__item stats-top-menu__item--active">Неделя</button>
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

									<div class="vcal-btn--next" data-calendar-toggle="next"></div>
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
					<tr v-for="controller in controllers" :key="controller.id">
						<td class="f-b">{{ controller.name }}</td>
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
	</div>
</template>

<script>
	import gql from 'graphql-tag';

	export default {
		name: 'Finance',
		data: () => ({
			controllers: []
		}),
		apollo: {
			controllers: {
				query: gql`
					query {
						getControllers {
							id,
							name
						}
					}
				`,
				update: data => data.getControllers,
				fetchPolicy: 'no-cache'
			}
		}
	}
</script>
