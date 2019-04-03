<template>
	<div>
		<div class="stats-top-menu">
			<div class="stats-top-menu__date-buttons">
				<Period @onChange="onPeriodChange"/>

				<ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
			</div>
		</div>

		<Table
		v-if="goods.length > 0 && !$apollo.loading"
		:headers="getTableHeaders"
		:fields="getTableFields"
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
		goods: [],
		period: {
			from: null,
			to: null
		}
	}),
	apollo: {
		goods: {
			query: gql`
			query {
				getMachines {
					id
					name
					itemMatrix {
						id
						buttons {
							buttonId
							item {
								id
								name
								salesSummary {
									salesCount
									overallAmount
									cashAmount
									cashlessAmount
								}
								lastSaleTime
							}
						}
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
			update: data => data.getMachines.itemMatrix?.buttons || []
		}
	},
	computed: {
		getTableHeaders,
		getTableFields () { return getTableFields(this.goods); }
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
