<template>
	<div class="container">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-md-12 col-lg-12">
					<div class="card">
						<div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
						<div class="card-header">
							<div class="card-title f-b" v-if="machine">Продажи автомата {{ machine.name }}</div>
						</div>

						<div class="card-header-links">
							<router-link to="/stats" class="card-header-links__item">Вернуться назад</router-link>
						</div>

						<div class="stats-top-menu">
							<div class="stats-top-menu__content-container">
								<div class="stats-top-menu__date-buttons">
									<Period @onChange="onPeriodChange"/>
								</div>

								<ExportExcel class="disabled-small" :table="{ headers: getTableHeaders, fields: getTableFields }" v-if="machine"/>
							</div>
						</div>

						<Table
						v-if="machine && machine.machineItemSales"
						:headers="getTableHeaders"
						:fields="getTableFields"
						className="stats-table"
						sortBy="timestamp"
						/>
						<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
						<div v-else class="aligned-text">Нет продаж</div>
					</div>
					<!-- section-wrapper -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import Table from '@/modules/table/Table';
import ExportExcel from '@/modules/table/ExportExcel';
import { getTableHeaders, getTableFields } from '@/utils/mappers/MachineSales';

import Period from '@/modules/Period';

export default {
	name: 'machineSales',
	components: {
		Table,
		ExportExcel,
		Period
	},
	data: () => ({
		period: {
			from: null,
			to: null
		}
	}),
	apollo: {
		machine: {
			query: gql`
			query ($id: Int!, $period: Period) {
				machine: getMachineById (id: $id) {
					id
					name
					machineItemSales(period: $period) {
								id
								name
								lastSaleTime
								salesSummary {
									salesCount
									overallAmount
									cashAmount
									cashlessAmount
								}
					}
				}
			}
			`,
			variables () {
				const notCustomDate = !this.period.from && !this.period.to;
				if (notCustomDate) {
					return {
						id: Number(this.$route.params.id),
						period: {
							from: this.period,
							to: Date.now() + 30 * 24 * 60 * 60 * 1000
						}
					};
				}

				return {
					id: Number(this.$route.params.id),
					period: this.period
				};
			},
			update: data => data.machine
		}
	},
	methods: {
		onPeriodChange (period) {

			if(period.to <= period.from){
				period.to = period.from
			}
			this.period = period;
		}
	},
	computed: {
		getTableHeaders,
		getTableFields () { return getTableFields(this.machine.machineItemSales || [], this.machine.id); }
	}
}
</script>
