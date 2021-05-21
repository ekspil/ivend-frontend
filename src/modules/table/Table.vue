<template>
	<div :class="['table-responsive', className, short ?'no-overflow': '']">
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

		<tr v-if="selections.length > 0">
			<td v-for="(header, index) in headers" :key="'sel'+index" style="padding: 0">
				<div v-for="selection in selections" v-if="header.key === selection.key" class="form-group" style="margin: 0">
					<select class="form-control custom-select" @change="filterAction(selection.key, sel[selection.key])" v-model="sel[selection.key]">
						<option value="ALL">ALL</option>
						<option v-for="value in selection.values" :value="value">{{value}}</option>
					</select>
				</div>
			</td>
		</tr>

			<tr v-for="(field, index) in getFields" :key="'dd'+index">
				<td v-for="(header, index) in headers" :key="index" :class="field.class" :style="style(field)" v-if="field.invisible ? !field.invisible() : true">
					<router-link v-if="field && field.props && field.props.route && field.props.routeId && field.props.routeKey === header.key" :to="field.props.route + field[field.props.routeId] + (field.props.routeParams || '')" class="f-b">
						{{ field[header.key] }}
					</router-link>

					<router-link  v-else-if="field && field.props && field.props.route && field.props.routeKey === header.key" :to="field.props.route + field[header.key]" class="f-b">
						{{ field[header.key] }}
					</router-link>

					<router-link v-else-if="header.link && field.route && header.critery" v-html="header.critery(field)" :to="field.route" class="f-b">

					</router-link>

					<router-link v-else-if="header.link && field.route" :to="field.route" class="f-b">
						{{ field[header.key] }}
					</router-link>

					<div v-else-if="header.critery" v-html="header.critery(field)"></div>

					<div v-else-if="header.raw" v-html="field[header.key]"></div>
					<div v-else-if="field && field.props && field.props.changeBalance && field.props.changeBalanceKey === header.key" >
						<div class="item-action dropdown">
							<a href="javascript:void(0)" data-toggle="dropdown" class="icon">
								{{ field[header.key] }}
							</a>
							<div class="dropdown-menu dropdown-menu-right text-center">
								<p> Введите сумму для начисления </p>
								<input class="form-control" type="text" size="17" v-model="field.props.sum">
								<a href="#" class="dropdown-item" @click.prevent="field.props.changeBalance(field.id, field.props.sum)">
									<button class="btn btn-primary ml-auto">Начислить</button>
								</a>
							</div>
						</div>
					</div>
					<template v-else>{{ field[header.key] }}</template>
				</td>

				<td class="text-right" v-if="field && field.props && field.props.remove">
					<div class="item-action dropdown">
						<a href="javascript:void(0)" data-toggle="dropdown" class="icon">
							<i class="fe fe-more-vertical"></i>
						</a>
						<div class="dropdown-menu dropdown-menu-right">
							<a href="#" class="dropdown-item" @click.prevent="field.props.remove(field.id, field.type)">
								<i class="dropdown-icon fe fe-x"></i> Удалить
							</a>
							<a v-if="field.props.sendSMS && field.type === 'Новость'" href="#" class="dropdown-item" @click.prevent="field.props.sendSMS(field.id, field.type)">
								<i class="dropdown-icon fe fe-send"></i> Рассылка по СМС
							</a>
							<a  v-if="field.props.sendEmail && field.type === 'Новость'"  href="#" class="dropdown-item" @click.prevent="field.props.sendEmail(field.id, field.type)">
								<i class="dropdown-icon fe fe-send"></i> Рассылка на почту
							</a>
						</div>
					</div>
				</td>


<!--				<td class="text-right" v-if="field && field.props && field.props.changeBalance">-->
<!--					<div class="item-action dropdown">-->
<!--						<a href="javascript:void(0)" data-toggle="dropdown" class="icon">-->
<!--							<i class="fe fe-more-vertical"></i>-->
<!--						</a>-->
<!--						<div class="dropdown-menu dropdown-menu-right text-center">-->
<!--							<p> Введите сумму для начисления </p>-->
<!--							<input class="form-control" type="text" size="17" v-model="field.props.sum">-->
<!--							<a href="#" class="dropdown-item" @click.prevent="field.props.changeBalance(field.id, field.props.sum)">-->
<!--								<button class="btn btn-primary ml-auto">Начислить</button>-->
<!--							</a>-->
<!--						</div>-->
<!--					</div>-->
<!--				</td>-->
			</tr>
		</tbody>
		<tr v-if="stats">
			<th v-for="(header, index) in headers" :key="index">{{index === 0 ? "Итого": getTotal(header)}}</th>
		</tr>
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
			stats: {
				type: Boolean,
				default: () => false
			},
      short: {
				type: Boolean,
				default: () => false
			},
			fields: {
				type: Array,
				default: () => []
			},
			selections: {
				type: Array,
				default: () => []
			},

			sortBy: String,
			order: {
				type: Boolean,
				default: false
			},
			className: String,
			filterAction: Function,
			orderAll: Function
		},
		data () {
			const critery = this.sortBy || this.headers[0].key;
			return {
				critery,
				ltOrder: this.order || false,
				sel: {
					role: "VENDOR"
				}
			};
		},
		methods: {
			getTotal(header) {
				const {fields} = this
				const {key} = header

				return fields.reduce((acc, row) => Number.isInteger(row[key]) ? acc + row[key] + 0 : "", 0)
			},
			getHeaderClass (header) {
				return {
					up: not(header.unsortable) && equals(header.key, this.critery) && not(this.ltOrder),
					sortable: not(header.unsortable)
				};
			},
            style (field) {
				if(field.phone && field.email){
					//did nothing
				}

				// if(field.attentionRequired){
        //     return "background:#f05457"
        // }
				else if(!field.timeToDie){
                    //did nothing
				}
                else if(this.$route.path === "/fiscalAll"){

                    if(field.activationDate === "4:Регистрация"){
                        return "background:#c6df5f" ;
                    }

                    if(field.activationDate === "5:Ошибка"){
                        return "background:#f05457" ;
                    }

                    if(field.activationDate === "6:Удаление"){
                        return "background:#f05457" ;
                    }
                    if(field.activationDate === "3:Внимание"){
                        return "background:#ffd000" ;
                    }

                    return "" ;
                }else{
                    return "" ;
                }


            },

			setSortingCritery ({ key: newCritery, unsortable }) {
				if (not(unsortable)) {
					const defaultCritery = this.headers[0].key;
					const currentCritery = this.critery;

					if (equals(currentCritery, newCritery)) {
						this.ltOrder = !this.ltOrder;
						this.orderAll(newCritery, this.ltOrder)
					} else {
						this.critery = or(newCritery, defaultCritery);
						this.ltOrder = false;
						this.orderAll(newCritery, this.ltOrder)
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
				}, this.fields);
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
			}, this.fields);
			}
		}
	}
</script>

<style scoepd lang="scss">
.settings-table td:first-child {
	font-weight: normal;
}
.no-overflow {
  max-height: 45vh;
  overflow: auto;
}
</style>
