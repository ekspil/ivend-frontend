<template>
	<div class="container">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-md-12 col-lg-12">
					<div class="card">
						<div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
						<div class="card-header">
							<div class="card-title f-b" v-if="data && data.machine">Продажи автомата {{data.machine.name}} </div>
						</div>

						<div class="card-header-links">
							<router-link :to="`/stats/${$route.params.machineId}`" class="card-header-links__item">Вернуться назад</router-link>
						</div>

						<div class="stats-top-menu" v-if="false">
							<div class="stats-top-menu__content-container">
								<ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }" v-if="data"/>
							</div>
						</div>

						<Table
						v-if="data"
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
import { getTableHeaders, getTableFields } from '@/utils/mappers/MachineItemSales';

export default {
	name: 'salesMachineItem',
	components: {
		Table,
		ExportExcel,
	},
	data: () => ({
		machine: null,
	}),
	apollo: {
		data: {
			query: gql`
				query ($offset: Int!, $limit: Int!, $machineId: Int, $itemId: Int, $machineIdRequired: Int!) {
					sales: getSales(offset: $offset, limit: $limit, machineId: $machineId, itemId: $itemId) {
						id
						price
						createdAt
						item {
							name
						}
						receipt {
							timestamp
							status
						}
					},
					machine: getMachineById (id: $machineIdRequired) {
						id
						name
					}
				}
			`,
			variables () {
				return {
					machineId: Number(this.$route.params.machineId),
					machineIdRequired: Number(this.$route.params.machineId),
					itemId: Number(this.$route.params.itemId),
					offset:0,
					limit:0
				};
			},
			update ({ sales, machine}) {
				return {
					sales,
					machine
				};
			}
		}
	},
	methods: {
	},
	computed: {
		getTableHeaders,
		getTableFields () { return getTableFields(this.data); }
	}
}
</script>
