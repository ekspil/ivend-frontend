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
						<div class="card-header">
							<Period @onChange="onPeriodChange"/>
						</div>

						<Table
						v-if="machine && machine.encashments && machine.encashments.length"
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

import Period from '@/modules/PeriodLarge';

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
		},
		machine: null
	}),
	apollo: {
		machine: {
			query: gql`
			query ($id: Int!, $period: Period!) {
				machine: getMachineById (id: $id) {
					id
					name
					place
					controller {
						uid
					}

					encashments(period: $period){
						sum
						count
						cashless
						countCashless
						meta
						createdAt
						timestamp

					}
				}
			}
			`,
			variables () {
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
		getTableFields () {
			return getTableFields(this.machine || {}) }
	}
}
</script>
