<template>
	<div class="container" v-if="controller">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-md-12 col-lg-12">
					<div class="card">
						<div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
						<div class="card-header">
							<div class="card-title f-b">Продажи автомата {{ controller.name }}</div>
						</div>

						<div class="card-header-links">
							<router-link to="/stats" class="card-header-links__item">Вернуться назад</router-link>
						</div>

		<div class="stats-top-menu">
			<div class="stats-top-menu__content-container">
				<div class="stats-top-menu__date-buttons">
					<button :class="['stats-top-menu__item', period === 'Всего' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('Всего')">Всего</button>
					<button :class="['stats-top-menu__item', period === 'День' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('День')">День</button>
					<button :class="['stats-top-menu__item', period === 'Неделя' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('Неделя')">Неделя</button>
					<button :class="['stats-top-menu__item', period === 'Месяц' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('Месяц')">Месяц</button>


					<div id="periodinput" class="stats-top-menu__date-period">
						<!--<button id="btn1" class="stats-top-menu__item stats-top-menu__item--date" onclick="selectedInput(this, 'from')" data-calendar-label="" data-calendar-area="">от</button>-->
						<datepicker placeholder="от" v-model="calendar.from" :language="pickerLanguage" input-class="stats-top-menu__item stats-top-menu__item--date" @selected="setPeriodToNull" />

						<div class="stats-top-menu__date-separator"></div>

						<!--<button id="btn2" class="stats-top-menu__item stats-top-menu__item--date" onclick="selectedInput(this, 'to')" data-calendar-label="" data-calendar-area="">до</button>-->
						<datepicker placeholder="до" v-model="calendar.to" :language="pickerLanguage" input-class="stats-top-menu__item stats-top-menu__item--date" @selected="setPeriodToNull" />

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
							<table class="table card-table table-vcenter text-nowrap" v-if="controller && controller.itemSaleStats.length > 0">
								<thead>
									<tr>
										<th class="sortable up">Товар</th>
										<th>Продажа</th>
										<th class="sortable">Кол-во</th>
										<th class="sortable">Сумма</th>
										<th class="sortable">Безнал</th>
										<!--
										<th>Терминал</th>
										<th>Кошелек</th>
										-->
										<th>Наличные</th>
										<!--
										<th>Купюры</th>
										<th>Монеты</th>
										-->
									</tr>
								</thead>
								<tbody>
									<tr v-for="({ item, salesSummary, lastSaleTime }) in controller.itemSaleStats" :key="item.id">
										<td class="f-b">{{ item.name }}</td>
										<td>{{ getTimestamp(lastSaleTime) }}</td>
										<td>{{ salesSummary.salesCount }}</td>
										<td>{{ salesSummary.overallAmount }}</td>
										<td>{{ salesSummary.cashlessAmount }}</td>
										<!--
										<td>500</td>
										<td>200</td>
										-->
										<td>{{ salesSummary.cashAmount }}</td>
										<!--
										<td>100</td>
										<td>400</td>
										-->
									</tr>
								</tbody>
							</table>
							<div v-else class="aligned-text">Нет продаж</div>
						</div>
						<!-- table-wrapper -->
					</div>
					<!-- section-wrapper -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';

	import datepicker from 'vuejs-datepicker';
	import { ru } from 'vuejs-datepicker/dist/locale';

	import { getMonthName } from '@/utils';

	const MILLISECONDS_IN_DAY = 86400000;

	export default {
		name: 'ControllerSales',
		components: {
			datepicker
		},
		data: () => ({
			period: 'Неделя',
			calendar: {
				from: undefined,
				to: undefined
			},
			pickerLanguage: ru
		}),
		apollo: {
			controller: {
				query: gql`
					query GetController ($id: Int!, $period: Period) {
						controller: getController(id: $id) {
							id,
							name,
							itemSaleStats (period: $period) {
								item {
									id,
									name
								},
								salesSummary {
									salesCount,
									overallAmount,
									cashAmount,
									cashlessAmount
								},
								lastSaleTime
							}
						}
					}
				`,
				variables () {
					const notCustomDate = !this.calendar.from && !this.calendar.to;
					if (notCustomDate) {
						return {
							id: Number(this.$route.params.id),
							period: {
								from: this.getPeriod,
								to: Date.now()
							}
						};
					}

					return {
						id: Number(this.$route.params.id),
						period: this.getPeriod
					};
				}
			}
		},
		methods: {
			setPeriod (period = 'Неделя') {
				this.calendar = {
					from: undefined,
					to: undefined
				};
				this.period = period;
			},
			setPeriodToNull () {
				this.period = null;
			},
			getTimestamp (time) {
				if (time) {
					const date = new Date(time);
					return `${date.getDay() + 1} ${getMonthName(date.getMonth()).toLowerCase().slice(0, 3)} ${date.getHours()}:${date.getMinutes()}`;
				}

				return '-';
			}
		},
		computed: {
			getPeriod () {
				switch (this.period) {
					case 'Всего': return 0;
					case 'Месяц': return Date.now() - MILLISECONDS_IN_DAY * 30;
					case 'Неделя': return Date.now() - MILLISECONDS_IN_DAY * 7;
					case 'День': return Date.now() - MILLISECONDS_IN_DAY;

					default: return {
						from: this.calendar.from ? this.calendar.from.getTime() : 0,
						to: this.calendar.to ? this.calendar.to.getTime() : Date.now()
					};
				}
			}
		}
	}
</script>
