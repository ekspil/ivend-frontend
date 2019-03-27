<template>
	<div class="container">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-md-12 col-lg-12">
					<div class="card">
						<div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
						<div class="card-header">
							<div class="card-title f-b" v-if="controller">Продажи автомата {{ controller.name }}</div>
						</div>

						<div class="card-header-links">
							<router-link to="/stats" class="card-header-links__item">Вернуться назад</router-link>
						</div>

						<div class="stats-top-menu">
							<div class="stats-top-menu__content-container">
								<div class="stats-top-menu__date-buttons">
									<Period @onChange="onPeriodChange"/>
								</div>

								<ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }" v-if="controller"/>
							</div>
						</div>

						<Table
						v-if="controller && controller.itemSaleStats.length > 0"
						:headers="getTableHeaders"
						:fields="getTableFields"
						className="stats-table"
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
import { getTableHeaders, getTableFields } from '@/utils/mappers/ControllerSales';

import Period from '@/modules/Period';

export default {
	name: 'ControllerSales',
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
				const notCustomDate = !this.period.from && !this.period.to;
				if (notCustomDate) {
					return {
						id: Number(this.$route.params.id),
						period: {
							from: this.period,
							to: Date.now()
						}
					};
				}

				return {
					id: Number(this.$route.params.id),
					period: this.period
				};
			},
			update: data => data.controller
		}
	},
	methods: {
		onPeriodChange (period) {
			this.period = period;
		}
	},
	computed: {
		getTableHeaders,
		getTableFields () { return getTableFields(this.controller.itemSaleStats); }
	}
}
</script>
