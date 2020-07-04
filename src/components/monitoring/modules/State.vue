<template>
	<div>
		<template v-if="machines.length > 0 && !$apollo.loading">

			<div class="text-wrap">
				<div class="example top-buttons-container top-buttons">
					<div class="top-buttons__left-container"></div>

					<div class="">
						<div class="row gutters-xs">
							<ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
						</div>
					</div>
				</div>
			</div>

			<Table :headers="getTableHeadersC" :fields="getTableFieldsC" className="monitoring-table" />
			<Table :headers="getTableHeaders" :fields="getTableFields" className="monitoring-table" />
		</template>

		<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
        <div v-else class="aligned-text">Нет автоматов</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';

	import Table from '@/modules/table/Table';
	import ExportExcel from '@/modules/table/ExportExcel';
	import { getTableHeaders, getTableFields } from '@/utils/mappers/MonitoringState';
	import { getTableHeadersC, getTableFieldsC } from '@/utils/mappers/MonitoringStateControllers';

	export default {
		name: 'State',
		components: {
			Table,
			ExportExcel
		},
		data: () => ({
			machines: []
		}),
		apollo: {
			machines: {
				query: gql`
					query {
						getMachines {
							id
							name
							lastSaleTime
							terminalStatus
							kktStatus
							banknoteCollectorStatus
							coinCollectorStatus
							controller {
								uid
								status
								registrationTime
								lastState {
									billAmount
									registrationTime
									coinAmount

									coinAcceptorStatus
									billAcceptorStatus
								}
							}
						}
					}
				`,
                pollInterval: 60000,
				update: data => data.getMachines
			}
		},
		computed: {
			getTableHeaders,
			getTableHeadersC,
			getTableFieldsC () { return getTableFieldsC(this.machines.reduce((acc, item) => {

				if( item.controller.status !== "DISABLED") {
					acc[0].count++
				}
				else {
					acc[1].count++
				}
				return acc
			}, [{status: "Автоматов работает", count: 0}, {status: "Автоматов не работает", count: 0}])) },
			getTableFields () { return getTableFields(this.machines.filter(mach => mach.controller?.status !== "DISABLED")); }
		}
	}
</script>
