<template>
	<div>
		<div class="stats-top-menu">
			<div class="stats-top-menu__content-container">
				<div class="stats-top-menu__date-buttons">
					<button :class="['stats-top-menu__item', period === 'Всего' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('Всего')">Всего</button>
					<button :class="['stats-top-menu__item', period === 'День' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('День')">День</button>
					<button :class="['stats-top-menu__item', period === 'Неделя' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('Неделя')">Неделя</button>
					<button :class="['stats-top-menu__item', period === 'Месяц' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('Месяц')">Месяц</button>


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
						<th class="sortable">Сумма</th>
						<th class="sortable">Безнал</th>
						<!--
						<th>Терминал</th>
						<th>Кошелек</th>
						-->
						<th class="sortable">Наличные</th>
						<!--
						<th>Купюры</th>
						<th>Монеты</th>
						-->
					</tr>
				</thead>
				<tbody>
					<tr v-for="({ id, name, overallSalesSummary }) in controllers" :key="id">
						<template v-if="overallSalesSummary">
							<td class="f-b"><router-link :to="`/stats/${id}`">{{ name }}</router-link></td>
							<td>{{ overallSalesSummary.salesCount }}</td>
							<td>{{ overallSalesSummary.overallAmount }}</td>
							<td>{{ overallSalesSummary.cashlessAmount }}</td>
							<!--
							<td>500</td>
							<td>200</td>
							-->
							<td>{{ overallSalesSummary.cashAmount }}</td>
							<!--
							<td>200</td>
							<td>100</td>
							-->
						</template>
						<template v-else>
							<td class="f-b">{{ name }}</td>
							<td>-</td>
							<td>-</td>
							<td>-</td>
							<td>-</td>
							<!--
							<td>-</td>
							<td>-</td>
							<td>-</td>
							<td>-</td>
							-->
						</template>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';

	const MILLISECONDS_IN_DAY = 86400000;

	export default {
		name: 'Finance',
		data: () => ({
			controllers: [],
			period: 'Неделя'
		}),
		apollo: {
			controllers: {
				query: gql`
					query ($period: Period) {
						getControllers {
							id,
							name,
    						overallSalesSummary (period: $period) {
    						  salesCount,
    						  overallAmount,
    						  cashAmount,
    						  cashlessAmount
    						}
						}
					}
				`,
				variables () {
					return {
						period: {
							from: this.getPeriod,
							to: Date.now()
						}
					};
				},
				update: data => data.getControllers
			}
		},
		methods: {
			setPeriod (period = 'Неделя') {
				this.period = period;
			}
		},
		computed: {
			getPeriod () {
				switch (this.period) {
					case 'Всего': return 0;
					case 'Месяц': return Date.now() - MILLISECONDS_IN_DAY * 30;
					case 'Неделя': return Date.now() - MILLISECONDS_IN_DAY * 7;
					case 'День': return Date.now() - MILLISECONDS_IN_DAY;

					default: return Date.now() - MILLISECONDS_IN_DAY * 7;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
    .card-table td a {
        color: black;
    }
</style>
