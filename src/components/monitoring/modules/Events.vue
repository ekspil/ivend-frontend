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
			v-if="controllers.length > 0 || !$apollo.loading"
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
			controllers: []
		}),
		apollo: {
			controllers: {
				query: gql`
					query {
						getControllers {
							id
							name
							lastSaleTime
							lastErrorTime
							lastState {
								signalStrength
							}

							machine {
								id
								name
							}
						}
					}
				`,
				update: data => data.getControllers
			}
		},
		computed: {
			getTableHeaders,
			getTableFields () { return getTableFields(this.controllers); }
		}
	}
</script>
