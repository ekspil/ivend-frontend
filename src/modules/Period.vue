<template>
	<div class="period-wrapper">
		<button
			v-for="(periodName, i) in periods" :key="i"
			:class="['stats-top-menu__item', period === periodName ? 'stats-top-menu__item--active' : '']"
			@click="setPeriod(periodName)"
		>{{ periodName }}</button>

		<div class="stats-top-menu__date-period"  v-if="false">
			<datepicker
				placeholder="от"
				v-model="calendar1[0]"
				:language="pickerLanguage"
				input-class="stats-top-menu__item stats-top-menu__item--date"
				@selected="setPeriodFrom"
				format="dd.MM.yy"
			/>

			<div class="stats-top-menu__date-separator"></div>

			<datepicker
				placeholder="до"
				v-model="calendar1[1]"
				:language="pickerLanguage"
				input-class="stats-top-menu__item stats-top-menu__item--date"
				@selected="setPeriodTo"
				format="dd.MM.yy"
			/>
		</div>

		<el-date-picker  v-if="false"
				v-model="calendar1"
				type="datetimerange"
				range-separator=""
				start-placeholder="Произвольная дата"
				end-placeholder=""
				@change="setPeriodRange"
				:default-time="['00:00:00', '23:59:59']"
				:unlink-panels="true"
		>
		</el-date-picker>


		<date-picker
				v-model="calendar1"
				type="date"
				placeholder="Дата"
				range
				format="DD.MM.YY"
				range-separator="-"
				@close="setPeriodRange"
				:editable="false"
				input-class="stats-top-menu__item stats-top-menu__item--date"
		>
			<template v-slot:icon-calendar="{ emit }">
				<div >
				</div>
			</template>
			<template v-slot:icon-clear="{ emit }">
				<div >
				</div>
			</template>
		</date-picker>


	</div>
</template>

<script>
	import datepicker from 'vuejs-datepicker';
	import { ru } from 'vuejs-datepicker/dist/locale';
	import {mapGetters} from 'vuex'

	import DatePicker from 'vue2-datepicker';
	import 'vue2-datepicker/index.css';

	import 'vue2-datepicker/locale/ru';

	export default {
		name: 'Period',
		components: {
			datepicker,
			DatePicker
		},
		data: () => ({
			periods: ['Всего', 'День', 'Вчера', 'Неделя', 'Месяц'],
			period: 'cache',
			// calendar: {
			// 	from: undefined,
			// 	to: undefined
			// },
			calendar1: [],
			pickerLanguage: ru,
			value1: null,
			value2: [],
			showTimePanel: false,
			showTimeRangePanel: false,
		}),
		methods: {
			setPeriod (period = 'Неделя') {
				this.calendar1 = null
				this.period = period;

				this.$emit('onChange', this.getPeriod);
			},
			setPeriodFrom (date) {
				date.setHours(0, 0, 0, 0);
				this.calendar.from = date;
				this.period = null;

				this.$emit('onChange', this.getPeriod);
			},
			setPeriodTo (date) {
				date.setHours(23, 59, 59, 0);
				this.calendar.to = date;
				this.period = null;

				this.$emit('onChange', this.getPeriod);
			},
			setPeriodRange () {
				this.period = null;

				this.$emit('onChange', this.getPeriod);
			}
		},
		computed: {
			...mapGetters({
				periodStat: "cache/periodStat"
			}),
			calendar(){
				if(this.calendar1){
					return {
						from: this.calendar1[0],
						to:this.calendar1[1],
					}
				}
				else {
					return {
						from: undefined,
						to: undefined,
					}
				}

			},
			getPeriod () {
				let date;
				let period
				switch (this.period) {
					case 'Всего':
						date = new Date();
						period = {
							from: 0,
							to: Date.now()
						};
						this.$store.commit("cache/setPeriodStat",  {period, type: this.period})

						return period
					case 'Месяц':
						date = new Date();
						date.setMonth(date.getMonth() - 1);
						period = {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
							to: Date.now()
						};
						this.$store.commit("cache/setPeriodStat",   {period, type: this.period})
						return period
					case 'Неделя':
						date = new Date();
						date.setDate(date.getDate() - 7);
						period = {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
							to: Date.now()
						};
						this.$store.commit("cache/setPeriodStat",  {period, type: this.period})
						return period

					case 'День':
						date = new Date();
						period = {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
							to: Date.now()
						};
						this.$store.commit("cache/setPeriodStat",  {period, type: this.period})
						return period

					case 'Вчера':
						date = new Date();
						period = {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - (1000*60*60*24),
							to: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
						};
						this.$store.commit("cache/setPeriodStat",  {period, type: this.period})
						return period

					case 'cache':
						period = this.periodStat.period

						if(!period) {
							this.period = "День"
							return this.getPeriod
						}
						this.period = this.periodStat.type
						if(this.period === "calendar"){
							this.calendar1[0] = new Date(period.from)
							this.calendar1[1] = new Date(period.to)
						}
						return period

					default: period = {
						from: this.calendar.from instanceof Date ? this.calendar.from.getTime() : 0,
						to: this.calendar.to instanceof Date ? this.calendar.to.getTime() + (24*60*60*1000 - 999) : Date.now()
					};
						this.$store.commit("cache/setPeriodStat",  {period, type: "calendar"})
						return period

				}
			}
		},
		mounted () {
			this.$emit('onChange', this.getPeriod);

			setInterval(() => {
			    let date;
			    let period;
			    let periodNew;
                switch (this.period) {
                    case 'Всего':
						date = new Date();
						periodNew = {
							from: 0,
							to: Date.now()
						};

						this.$store.commit("cache/setPeriodStat", {period: periodNew, type: "Всего"})
						break;
                    case 'Месяц':
                        date = new Date();
                        date.setMonth(date.getMonth() - 1);
                        periodNew = {
                            from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                            to: Date.now()
                        };
						this.$store.commit("cache/setPeriodStat", {period: periodNew, type: "Месяц"})
                        break;
                    case 'Неделя':
                        date = new Date();
                        date.setDate(date.getDate() - 7);
                        periodNew = {
                            from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                            to: Date.now()
                        }
						this.$store.commit("cache/setPeriodStat", {period: periodNew, type: "Неделя"})

                        break;

					case 'Вчера':
						date = new Date();
						periodNew = {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - (1000*60*60*24),
							to: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
						};
						this.$store.commit("cache/setPeriodStat", {period: periodNew, type: "День"})
						break;

                    case 'День':
                        date = new Date();
                        periodNew = {
                            from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                            to: Date.now()
                        };
						this.$store.commit("cache/setPeriodStat", {period: periodNew, type: "День"})
						break;


					case 'cache':
						periodNew = this.periodStat.period
						if(!periodNew) {
							date = new Date();
							periodNew = {
								from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
								to: Date.now()
							};
						}
						this.period = this.periodStat.type
						if(this.period === "calendar"){
							this.calendar1[0] = new Date(period.from)
							this.calendar1[1] = new Date(period.to)
						}
						break;

                    default: periodNew = {
                        from: this.calendar.from instanceof Date ? this.calendar.from.getTime() : 0,
                        to: this.calendar.to instanceof Date ? this.calendar.to.getTime() + (24*60*60*1000 - 999) : Date.now()
                    };
                }
                this.$emit('onChange', periodNew);
            }, 120000)
		}
	}
</script>

<style scoped lang="scss">
	.period-wrapper {
		display: flex;
		flex-wrap: wrap;
	}
	.mx-icon-calendar {
		visibility: hidden;
	}
	.mx-icon-clear {
		visibility: hidden;
	}

</style>
