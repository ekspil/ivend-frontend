<template>
	<div>
		<template v-if="controllers.length > 0 || !$apollo.loading">
			<div class="text-wrap">
				<div class="example top-buttons-container top-buttons">
					<div class="top-buttons__left-container"></div>

					<div class="">
						<div class="row gutters-xs">
							<button class="btn btn-primary" type="button">Выгрузить &#032;<i
								class="fe fe-download"></i>
							</button>
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

	import Table from '@/modules/Table';
	import { getTableHeaders, getTableFields } from '@/utils/mappers/MonitoringState';

	export default {
		name: 'State',
		components: {
			Table
		},
		data: () => ({
			controllers: []
		}),
		apollo: {
			controllers: {
				query: gql`
					query {
						getControllers {
							id,
							uid,
							name,
							lastSaleTime,
							lastState {
								signalStrength,
								billAmount,
								registrationTime,
								coinAmount
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
