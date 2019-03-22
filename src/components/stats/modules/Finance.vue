<template>
	<div>
		<div class="stats-top-menu">
			<div class="stats-top-menu__content-container">
				<div class="stats-top-menu__date-buttons">
					<Period @onChange="onPeriodChange" />
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

	import Period from '@/modules/Period';

	import Table from '@/modules/table/Table';
	import ExportExcel from '@/modules/table/ExportExcel';
	import { getTableHeaders, getTableFields } from '@/utils/mappers/StatsFinance';

	export default {
		name: 'Finance',
		components: {
			Period,
			Table,
			ExportExcel
		},
		data: () => ({
			controllers: [],
			period: 'Неделя',
			calendar: {
				from: undefined,
				to: undefined
			}
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
