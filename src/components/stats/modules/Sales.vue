<template>
	<div>
		<div class="stats-top-menu">
			<div class="stats-top-menu__date-buttons">
				<Period @onChange="onPeriodChange"/>

				<ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
			</div>
		</div>

		<Table
		v-if="machines.length > 0 && !$apollo.loading"
		:headers="getTableHeaders"
		:fields="getTableFields"
		sortBy="salesCount"
		className="stats-table"
		/>
		<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
		<div v-else class="aligned-text">Нет продаж</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import Table from '@/modules/table/Table';
import ExportExcel from '@/modules/table/ExportExcel';
import { getTableHeaders, getTableFields } from '@/utils/mappers/StatsSales';

import Period from '@/modules/Period';

export default {
	name: 'Sales',
	components: {
		Period,
		Table,
		ExportExcel
	},
	data: () => ({
		machines: [],
		period: {
			from: null,
			to: null
		}
	}),
	apollo: {
		machines: {
			query: gql`
			query ($period: Period) {
				getProfile {
					items {
						id
						name
						salesSummary (period: $period) {
							salesCount
							overallAmount
							cashAmount
							cashlessAmount
						}
						lastSaleTime
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
			update: data => data.getProfile.items
		}
	},
	computed: {
		getTableHeaders,
		getTableFields () {
			return getTableFields(this.machines);
		}
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

.stats-top-menu__date-buttons {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
