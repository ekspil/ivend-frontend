<template>
	<div>
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

		<Table
			v-if="machines.length > 0 || !$apollo.loading"
			:headers="getTableHeaders"
			:fields="getTableFields"
			className="monitoring-table"
		/>
		<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
        <div v-else class="aligned-text">Нет контроллеров</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';

	import Table from '@/modules/table/Table';
	import ExportExcel from '@/modules/table/ExportExcel';
	import { getTableHeaders, getTableFields } from '@/utils/mappers/MonitoringEvents';

	export default {
		name: 'Events',
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
						error
						terminalStatus
						kktStatus
						banknoteCollectorStatus
						coinCollectorStatus
						encashment
						lastEncashment{
							timestamp
						}
						controller {
							uid
							status
							lastErrorTime
							lastState {
								registrationTime
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
			getTableFields () { return getTableFields(this.machines.filter(mach => {
				if(mach.controller?.status === "DISABLED") return false
				if(mach.error === "OK") return false
				 return true
			})); }
		}
	}
</script>
