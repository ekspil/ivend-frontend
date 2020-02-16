<template>
	<div class="container">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-md-12 col-lg-12">
					<div class="card">
						<div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
						<div class="card-header">
							<div class="card-title f-b" v-if="machine">Инкассации автомата {{ machine.name }}</div>
						</div>

						<div class="card-header-links">
							<router-link :to="`/stats#encashments`" class="card-header-links__item">Вернуться назад</router-link>
						</div>

						<Table
						v-if="machine && machine.encashmentsSummaries && machine.encashmentsSummaries.length"
						:headers="getTableHeaders"
						:fields="getTableFields"
						className="stats-table"
						/>
						<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
						<div v-else class="aligned-text">Нет инкассаций</div>
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
import { getTableHeaders, getTableFields } from '@/utils/mappers/MachineEncashments';

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
			query ($id: Int!) {
				machine: getMachineById (id: $id) {
					id
					name
					encashmentsSummaries {
						encashment {
						    timestamp
						}
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
				return {
					id: Number(this.$route.params.id),
				};
			},
            pollInterval: 60000,
			update: data => data.machine
		}
	},
	methods: {
		onPeriodChange (period) {
			this.period = period;
		}
	},
	computed: {
		getTableHeaders,
		getTableFields () { return getTableFields(this.machine || {}) }
	}
}
</script>
