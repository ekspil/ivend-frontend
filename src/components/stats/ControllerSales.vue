<template>
	<div class="container">
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
							<div class="stats-top-menu__content-container" v-if="controller && controller.itemSaleStats.length > 0">
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

						<div class="table-responsive stats-table" v-if="controller && controller.itemSaleStats.length > 0">
							<table class="table card-table table-vcenter text-nowrap">
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
						</div>
						<div v-else class="aligned-text">Нет продаж</div>
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

	import { getMonthName } from '@/utils';

	export default {
		name: 'ControllerSales',
		apollo: {
			controller: {
				query: gql`
					query GetController ($id: Int!) {
						controller: getController(id: $id) {
							id,
							name,
							itemSaleStats {
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
					return {
						id: Number(this.$route.params.id)
					};
				}
			}
		},
		methods: {
			getTimestamp (time) {
				if (time) {
					const date = new Date(time);
					return `${date.getDay() + 1} ${getMonthName(date.getMonth()).toLowerCase().slice(0, 3)} ${date.getHours()}:${date.getMinutes()}`;
				}

				return '-';
			}
		}
	}
</script>
