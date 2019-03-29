<template>
	<div>
		<template v-if="controllers.length > 0 || !$apollo.loading">
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
        <div v-else class="aligned-text">Нет контроллеров</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';

	import { getMonthName } from '@/utils';

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
			controllers: []
		}),
		apollo: {
			controllers: {
				query: gql`
					query {
						getControllers {
							id
							registrationTime
							name
							lastSaleTime
							lastState {
								billAmount
								registrationTime
								coinAmount

								coinAcceptorStatus
								billAcceptorStatus
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
		methods: {
			getTimestamp (time) {
				if (time) {
					const date = new Date(time);
					return `${date.getDate()} ${getMonthName(date.getMonth()).toLowerCase()}`;
				}

				return '-';
			}
		},
		computed: {
			getTableHeaders,
			getTableFields () { return getTableFields(this.controllers); }
		}
	}
</script>
