<template>
	<div :class="['table-responsive', className]">
		<table class="table card-table table-vcenter text-nowrap">
			<thead>
				<tr>
					<th
						v-for="(header, index) in headers" :key="index"
						:class="getHeaderClass(header)"
						@click="setSortingCritery(header)"
					>
						{{ header.name }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="field in getFields" :key="field.id">
					<td v-for="(header, index) in headers" :key="index" :class="field.class">
						<router-link v-if="header.link && field.route" :to="field.route" class="f-b">
							{{ field[header.key] }}
						</router-link>

						<div v-else-if="header.raw" v-html="field[header.key]"></div>
						<template v-else>{{ field[header.key] }}</template>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { lt, gt, sort, equals, not, or } from 'ramda';
	import { convertCriteries } from '@/utils';

	export default {
		name: 'Table',
		props: {
			headers: {
				type: Array,
				default: () => []
			},

			fields: {
				type: Array,
				default: () => []
			},

			className: String
		},
		data () {
			const critery = this.headers[0].key;
			return {
				critery,
				ltOrder: false
			};
		},
		methods: {
			getHeaderClass (header) {
				return {
					up: not(header.unsortable) && equals(header.key, this.critery) && not(this.ltOrder),
					sortable: not(header.unsortable)
				};
			},

			setSortingCritery ({ key: newCritery, unsortable }) {
				if (not(unsortable)) {
					const defaultCritery = this.headers[0].key;
					const currentCritery = this.critery;

					if (equals(currentCritery, newCritery)) {
						this.ltOrder = !this.ltOrder;
					} else {
						this.critery = or(newCritery, defaultCritery);
						this.ltOrder = false;
					}
				}
			}
		},
		computed: {
			getFields () {
				const critery = this.critery;

				if (this.ltOrder) {
					return sort((a, b) => {
						const { firstCritery, secondCritery } = convertCriteries(a, b, critery);

						return lt(firstCritery, secondCritery)
					}, this.fields);
				}

				return sort((a, b) => {
					const { firstCritery, secondCritery } = convertCriteries(a, b, critery);

					return gt(firstCritery, secondCritery)
				}, this.fields);
			}
		}
	}
</script>
