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
						<tr v-for="({ id, name, lastState, lastSaleTime }) in controllers" :key="id" v-if="lastState">
							<td class="settings-link"><a href="#" class="f-b">{{ name }} <i class="fe fe-more-vertical"></i> </a> </td>

							<td class="warning-cel">{{ lastState.signalStrength }}</td>
							<td class="warning-cel">{{ lastSaleTime }}</td>
							<td class="warning-cel">X - 24.10 - 15:50</td>
							<td class="warning-cel">{{ lastState.coinAmount }}</td>
							<td class="warning-cel">{{ lastState.billAmount }}</td>
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
							name,
							lastSaleTime,
							lastState {
								signalStrength,
								billAmount,
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
		}
	}
</script>
