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
					<td v-for="(header, index) in headers" :key="index" :class="field.class" v-if="field.invisible ? !field.invisible() : true">
						<router-link v-if="header.link && field.route" :to="field.route" class="f-b">
							{{ field[header.key] }}
						</router-link>

						<div v-else-if="header.critery" v-html="header.critery(field)"></div>

						<div v-else-if="header.raw" v-html="field[header.key]"></div>
						<template v-else>{{ field[header.key] }}</template>
					</td>

                    <td class="text-right" v-if="field.props && field.props.removable">
                        <div class="item-action dropdown">
                            <a href="javascript:void(0)" data-toggle="dropdown" class="icon">
                            	<i class="fe fe-more-vertical"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a href="#" class="dropdown-item" @click.prevent="field.props.removable(() => removeController(field.id))">
                                	<i class="dropdown-icon fe fe-x"></i> Удалить
                                </a>
                            </div>
                        </div>
                    </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { lt, sort, equals, not, or } from 'ramda';
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

			sortBy: String,
			className: String
		},
		data () {
			const critery = this.sortBy || this.headers[0].key;
			return {
				removed: [],

				critery,
				ltOrder: false
			};
		},
		methods: {
			removeController (id) { return id && this.removed.push(id); },

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
				const fields = this.fields.filter(field => !this.removed.includes(field.id));

				if (this.ltOrder) {
					return sort((a, b) => {
						const { firstCritery, secondCritery } = convertCriteries(a, b, critery);

						if (firstCritery && secondCritery &&
							typeof(firstCritery) === 'string' && typeof(secondCritery) === 'string'
						) {
							const firstCriteryDate = Date.parse(firstCritery.split(' ')[0].split('.').reverse().join('.'));
							const secondCriteryDate = Date.parse(secondCritery.split(' ')[0].split('.').reverse().join('.'));
							if (!isNaN(firstCriteryDate) && !isNaN(secondCriteryDate)) {
								return lt(firstCriteryDate, secondCriteryDate) ? -1 : 1;
							}
						}

						return lt(firstCritery, secondCritery) ? -1 : 1;
					}, fields);
				}

				return sort((a, b) => {
					const { firstCritery, secondCritery } = convertCriteries(a, b, critery);

					if (firstCritery && secondCritery &&
						typeof(firstCritery) === 'string' && typeof(secondCritery) === 'string'
					) {
						const firstCriteryDate = Date.parse(firstCritery.split(' ')[0].split('.').reverse().join('.'));
						const secondCriteryDate = Date.parse(secondCritery.split(' ')[0].split('.').reverse().join('.'));
						if (!isNaN(firstCriteryDate) && !isNaN(secondCriteryDate)) {
							return lt(firstCriteryDate, secondCriteryDate) ? 1 : -1;
						}
					}

					return lt(firstCritery, secondCritery) ? 1 : -1;
				}, fields);
			}
		}
	}
</script>

<style scoepd lang="scss">
	.settings-table td:first-child {
		font-weight: normal;
	}
</style>
