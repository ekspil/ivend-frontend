<template>
	<div>
		<div class="stats-top-menu">
			<div class="stats-top-menu__content-container">
				<div class="stats-top-menu__date-buttons">
					<Period @onChange="onPeriodChange"/>
				</div>
				<select v-if="groups" v-model="selectedGroupId" class="select2 stats-top-menu__item" placeholder="Выберите группу">
					<option label="Выберите группу" :value="null"></option>
					<option v-for="group in groups" v-bind:value="group.id">{{group.name}}</option>
				</select>
				<ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
			</div>
		</div>

		<Table
		v-if="machines.length > 0"
		:headers="getTableHeaders"
		:fields="getTableFields"
		stats
		sortBy="salesCount"
		className="stats-table"
		/>
		<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
		<div v-else-if="machines.length == 0" class="aligned-text">Нет автоматов</div>

	</div>
</template>

<script>
import gql from 'graphql-tag';

import Table from '@/modules/table/Table';
import ExportExcel from '@/modules/table/ExportExcel';
import { getTableHeaders, getTableFields } from '@/utils/mappers/StatsFinance';

import Period from '@/modules/Period';

export default {
	name: 'Finance',
	components: {
		Period,
		Table,
		ExportExcel
	},
	data: () => ({
		selectedGroupId: null,
		machines: [],
		period: {
			from: null,
			to: null
		}
	}),
	apollo: {
		machines: {
			query: gql`
			query ($machineGroupId: Int, $period: Period) {
				getMachineSales (machineGroupId: $machineGroupId, period: $period) {
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
			`,
			variables () {
				const notCustomDate = !this.period.from && !this.period.to;
				if (notCustomDate) {
					return {
						period: {
              from: this.period,
              to: Date.now() + 30 * 24 * 60 * 60 * 1000
            }
					};
				}

				return {
					period: this.period,
					machineGroupId: this.selectedGroupId
				};
			},
			update: data => data.getMachines
		},
		groups: {
			query: gql`
			query {
				getMachineGroups {
					id
					name
				}
			}
			`,
			update: data => data.getMachineGroups
		}
	},
	computed: {
		getTableHeaders,
		getTableFields () { return getTableFields(this.machines); }
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
