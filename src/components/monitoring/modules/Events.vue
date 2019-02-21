<template>
	<div>
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
		<div class="table-responsive monitoring-table">
			<table class="table card-table table-vcenter text-nowrap">
				<thead>
					<tr>
						<th class="sortable up">Автомат</th>
						<th class="sortable">Связь</th>
						<th class="sortable">Продажи</th>
						<th class="sortable">Ошибки</th>
						<th class="sortable">Аудит1</th>
						<th class="sortable">Аудит2</th>
						<th class="sortable">Инкасация</th>
						<th class="sortable">Загрузка</th>
					</tr>
				</thead>
				<tbody>
						<tr v-for="({ id, name, lastState, lastSaleTime, lastErrorTime }) in controllers" :key="id">
							<td class="settings-link"><a href="#" class="f-b">{{ name }} </a></td>

							<td class="ok-cel">{{ (lastState && lastState.signalStrength) || '-' }}</td>
							<td class="warning-cel">{{ getTimestamp(lastSaleTime) }}</td>
							<td class="ok-cel">{{ getTimestamp(lastErrorTime) }}</td>
							<td class="disabled-cel">-</td>
							<td class="disabled-cel">-</td>
							<td class="disabled-cel">-</td>
							<td class="disabled-cel">-</td>
						</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';

	import { getMonthName } from '@/utils';

	export default {
		name: 'Events',
		data: () => ({
			controllers: []
		}),
		apollo: {
			controllers: {
				query: gql`
					query {
						getControllers {
							id,
							name,
							lastSaleTime,
							lastErrorTime,
							lastState {
								signalStrength
							}
						}
					}
				`,
				update: data => data.getControllers,
				fetchPolicy: 'no-cache'
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
		}
	}
</script>
