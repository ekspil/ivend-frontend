<template>
	<div :class="['table-responsive', className, short ?'no-overflow': '']">
		<table class="table card-table table-vcenter text-nowrap">
			<thead class="sticky-top bg-white">
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
					<router-link v-if="field && field.props && field.props.route && field.props.routeId && field.props.routeKey === header.key" :to="field.props.route + field[field.props.routeId] + (field.props.routeParams || '')" class="f-b bold-link">
						{{ field[header.key] }}
					</router-link>

					<router-link  v-else-if="field && field.props && field.props.route && field.props.routeKey === header.key" :to="field.props.route + field[header.key]" class="f-b bold-link">
						{{ field[header.key] }}
					</router-link>

					<router-link v-else-if="header.link && field.route && header.critery" v-html="header.critery(field)" :to="field.route" class="f-b bold-link">

					</router-link>

					<router-link v-else-if="header.link && field.route" :to="field.route" class="f-b bold-link">
						{{ field[header.key] }}
					</router-link>

					<div v-else-if="header.critery" v-html="header.critery(field)" class="bold-int"></div>

					<div v-else-if="header.raw" v-html="field[header.key]" class="bold-int"></div>
					<div v-else-if="field && field.props && field.props.changeBalance && field.props.changeBalanceKey === header.key" class="">
						<div class="item-action dropdown">
							<a href="javascript:void(0)" data-toggle="dropdown" class="bold-link bold-int">
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
					<div v-else-if="field && field.props && false && field.props.payFee && field.props.payFeeKey === header.key" class="">
						<div class="item-action dropdown">
							<a href="javascript:void(0)" data-toggle="dropdown" class="bold-link bold-int">
								{{ field[header.key] }}
							</a>
							<div class="dropdown-menu dropdown-menu-right text-center">
								<p> Введите сумму выплаты </p>
								<input class="form-control" type="text" size="17" v-model="field.props.sum">
								<a href="#" class="dropdown-item" @click.prevent="field.props.payFee(field.id, Number(field.props.sum))">
									<button class="btn btn-primary ml-auto">Выплачено</button>
								</a>
							</div>
						</div>
					</div>
					<div v-else-if="field && field.props && field.props.changeBalance && field.props.showControllersKey === header.key" class="">
						<div >
							<a href="#"  class="bold-link bold-int" @click.prevent="field.props.showControllers(field.id)">
								{{ field[header.key] }}
							</a>
						</div>
					</div>
					<div v-else-if="field && field.props && field.props.changeBalance && field.props.showBillingKey === header.key" class="">
						<div >
							<a href="#"  class="bold-link bold-int" @click.prevent="field.props.showBilling(field.id)">
								{{ field[header.key] }}
							</a>
						</div>
					</div>
					<div v-else-if="field && field.props && field.props.showUsersKey === header.key" class="">
						<div >
							<a href="#"  class="bold-link bold-int" @click.prevent="field.props.showUsers(field.id)">
								{{ field[header.key] }}
							</a>
						</div>
					</div>

          <template v-else><div class="bold-int">{{ field[header.key] }}</div></template>
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
							<a v-if="field.props.duplicateMachine && field.id" href="#" class="dropdown-item" @click.prevent="field.props.duplicateMachine(field.id)">
								<i class="dropdown-icon fe fe-refresh-cw"></i> Создать копию автомата
							</a>
							<a v-if="field.props.showControllers && field.id" href="#" class="dropdown-item" @click.prevent="field.props.showControllers(field.id)">
								<i class="dropdown-icon fe fe-refresh-cw"></i> Показать контроллеры
							</a>
							<a v-if="field.props.simReset && field.sim" href="#" class="dropdown-item" @click.prevent="field.props.simReset(field.sim)">
								<i class="dropdown-icon fe fe-refresh-cw"></i> Перезагрузка sim
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

				<td class="text-right" v-if="field && field.props && field.props.controllerIntegrationUidUpdate">
          <div class="">
            <div class="item-action dropdown">
              <a href="javascript:void(0)" data-toggle="dropdown" class="bold-link bold-int">
                <i class="fe fe-more-vertical"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right text-center">
<!--                <p> Введите UID контроллера</p>-->
<!--                <input class="form-control" type="text" size="17" v-model="field.controllerUid">-->
                <a href="#" class="dropdown-item" @click.prevent="field.props.controllerIntegrationSet(field.id)">
                  <button class="btn btn-primary ml-auto">Привязать вручную</button>
                </a>
                <a href="#" class="dropdown-item" @click.prevent="field.props.controllerIntegrationUidUpdate(field.id,  'DELETE')">
                  <button class="btn btn-primary ml-auto">Обновить привязку</button>
                </a>
                <a href="#" class="dropdown-item" @click.prevent="field.props.controllerIntegrationUidUpdate(field.id,  'DELETE_FORCE')">
                  <button class="btn btn-primary ml-auto">Удалить</button>
                </a>
              </div>
            </div>
          </div>
				</td>

				<td class="text-right" v-if="field && field.props && field.props.simResetNumber">
					<div class="item-action dropdown">
						<a href="javascript:void(0)" data-toggle="dropdown" class="icon">
							<i class="fe fe-more-vertical"></i>
						</a>
						<div class="dropdown-menu dropdown-menu-right">
							<a v-if="field.props.simResetNumber && field.number" href="#" class="dropdown-item" @click.prevent="field.props.simResetNumber(field.number)">
								<i class="dropdown-icon fe fe-refresh-cw"></i> Перезагрузка sim
							</a>
						</div>
					</div>
				</td>

				<td class="text-right" v-if="field && field.props && field.props.getPartnerAct">
					<div class="item-action dropdown">
						<a href="javascript:void(0)" data-toggle="dropdown" class="icon">
							<i class="fe fe-more-vertical"></i>
						</a>
						<div class="dropdown-menu dropdown-menu-right">
							<a v-if="field.props.getPartnerAct && field.id" href="#" class="dropdown-item" @click.prevent="field.props.getPartnerAct(field.id)">
								<i class="dropdown-icon fe fe-refresh-cw"></i> Скачать
							</a>
						</div>
					</div>
				</td>


				<td class="text-right" v-if="checkReSend">
					<div class="item-action dropdown" >
						<a href="javascript:void(0)" data-toggle="dropdown" class="icon" v-if="field.receiptStatus === 'ERROR' || field.receiptStatus === null ">
							<i class="fe fe-more-vertical"></i>
						</a>
						<div class="dropdown-menu dropdown-menu-right">
							<a href="#" class="dropdown-item" @click.prevent="field.props.resend(field.id)" v-if="field.receiptStatus === 'ERROR' || field.receiptStatus === null ">
								<i class="dropdown-icon fe fe-send"></i> Переотправить (текущей датой)
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
			<th v-for="(header, index) in headers" :key="index" class="bold-int">{{index === 0 ? "Итого": getTotal(header)}}</th>
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
      checkReSend: {
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

				const value = fields.reduce((acc, row) => Number.isInteger(row[key]) ? acc + row[key] + 0 : "", 0)
        if(Number.isInteger(value)) return value
        return ""
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

                    if(field.activationDate === "0: Ожидание"){
                        return "background:#00ffff" ;
                    }
                    if(field.activationDate === "1: Удаление"){
                        return "background:#ff9900" ;
                    }
                    if(field.activationDate === "2: Ошибка"){
                        return "background:#ff0000" ;
                    }
                    if(field.activationDate === "3: Внимание"){
                        return "background:#ffff00" ;
                    }
                    if(field.activationDate === "4: Регистрация"){
                        return "background:#00ff00" ;
                    }
                    if(field.activationDate === "5: Активация"){
                        return "background:#9fc5e8" ;
                    }
                    if(field.activationDate === "6: Зарегистрирована"){
                        return "background:#ffe599" ;
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
.bold-int {
  font-weight: bold;
}
.bold-link {
  color: #20088d !important;
}
.bold-link:hover {
  color: #00dabf !important;
}
.bold-int-color {

  font-weight: bold;
  color: #20088d !important;

}


</style>
