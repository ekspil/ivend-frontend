<template>
	<div>
		<template v-if="!areStatesEmpty">
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
							<th class="sortable">Контроллер</th>
							<th>Монетник</th>
							<th>Купюрник</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="({ id, uid, name, lastState, lastSaleTime }) in controllers" :key="id">
							<template v-if="lastState">
								<td class="settings-link"><a href="#" class="f-b">{{ name }} <i class="fe fe-more-vertical"></i> </a> </td>

								<td class="ok-cel">{{ lastState.signalStrength || '-' }}</td>
								<td class="warning-cel">{{ getTimestamp(lastSaleTime) }}</td>
								<td class="disabled-cel">{{ uid || '-' }}</td>
								<td class="warning-cel">{{ lastState.coinAmount }}</td>
								<td class="warning-cel">{{ lastState.billAmount }}</td>
							</template>
							<template v-else>
								<td class="settings-link"><a href="#" class="f-b">{{ name }} <i class="fe fe-more-vertical"></i> </a> </td>

								<td class="warning-cel">-</td>
								<td class="warning-cel">{{ getTimestamp(lastSaleTime) }}</td>
								<td class="disabled-cel">{{ uid }}</td>
								<td class="warning-cel">-</td>
								<td class="warning-cel">-</td>
							</template>	
						</tr>
					</tbody>
				</table>
			</div>
		</template>

        <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
        <div v-else class="aligned-text">Нет контроллеров</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';

	import { all, propEq } from 'ramda';
	import { getMonthName } from '@/utils';

	export default {
		name: 'State',
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
				update: data => data.getControllers,
				fetchPolicy: 'no-cache'
			}
		},
		computed: {
			areStatesEmpty () {
				return all(propEq('lastState', null))(this.controllers);
			}
		},
		methods: {
			getTimestamp (time) {
				if (time) {
					const date = new Date(time);
					return `${date.getDay() + 1} ${getMonthName(date.getMonth()).toLowerCase()}`;
				}

				return '-';
			}
		}
	}
</script>
