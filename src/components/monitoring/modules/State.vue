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
			getTableFields () { return getTableFields(this.machines.filter(mach => mach.controller?.status !== "DISABLED")); }
		}
	}
</script>
