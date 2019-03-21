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
						<!--<button id="btn1" class="stats-top-menu__item stats-top-menu__item--date" onclick="selectedInput(this, 'from')" data-calendar-label="" data-calendar-area="">от</button>-->
						<datepicker placeholder="от" v-model="calendar.from" :language="pickerLanguage" input-class="stats-top-menu__item stats-top-menu__item--date" @selected="setPeriodToNull" />

						<div class="stats-top-menu__date-separator"></div>

						<!--<button id="btn2" class="stats-top-menu__item stats-top-menu__item--date" onclick="selectedInput(this, 'to')" data-calendar-label="" data-calendar-area="">до</button>-->
						<datepicker placeholder="до" v-model="calendar.to" :language="pickerLanguage" input-class="stats-top-menu__item stats-top-menu__item--date" @selected="setPeriodToNull" />

					</div>
				</div>

				<ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
			</div>
		</div>

		<Table
			v-if="controllers.length > 0 || !$apollo.loading"
			:headers="getTableHeaders"
			:fields="getTableFields"
			className="stats-table"
		/>
		<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
        <div v-else class="aligned-text">Нет автоматов</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';

	import datepicker from 'vuejs-datepicker';
	import { ru } from 'vuejs-datepicker/dist/locale';

	import Table from '@/modules/table/Table';
	import ExportExcel from '@/modules/table/ExportExcel';
	import { getTableHeaders, getTableFields } from '@/utils/mappers/StatsFinance';

	export default {
		name: 'Finance',
		components: {
			datepicker,
			Table,
			ExportExcel
		},
		data: () => ({
			controllers: [],
			period: 'Неделя',
			calendar: {
				from: undefined,
				to: undefined
			},
			pickerLanguage: ru
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
					const notCustomDate = !this.period.from && !this.period.to;
					if (notCustomDate) {
						return {
							period: {
								from: this.period,
								to: Date.now()
							}
						};
					}

					return {
						period: this.period
					};
				},
				update: data => data.getControllers
			}
		},
		computed: {
			getTableHeaders,
			getTableFields () { return getTableFields(this.controllers); }
		},
		methods: {
			onPeriodChange (period) {
				this.period = period;
			}
		}
	}
</script>

<style scoped lang="scss">
    .card-table td a {
        color: black;
    }
</style>
