<template>
	<div class="period-wrapper">
		<button
			v-for="(periodName, i) in periods" :key="i"
			:class="['stats-top-menu__item', period === periodName ? 'stats-top-menu__item--active' : '']"
			@click="setPeriod(periodName)"
		>{{ periodName }}</button>

		<div class="stats-top-menu__date-period" v-if="false">
			<datepicker
				placeholder="от"
				v-model="calendar.from"
				:language="pickerLanguage"
				input-class="stats-top-menu__item stats-top-menu__item--date"
				@selected="setPeriodFrom"
			/>

			<div class="stats-top-menu__date-separator"></div>

			<datepicker
				placeholder="до"
				v-model="calendar.to"
				:language="pickerLanguage"
				input-class="stats-top-menu__item stats-top-menu__item--date"
				@selected="setPeriodTo"
			/>
		</div>

		<el-date-picker
				v-model="calendar1"
				type="datetimerange"
				range-separator=""
				start-placeholder="Произвольная дата"
				end-placeholder=""
				@change="setPeriodRange"
				:default-time="['00:00:00', '23:59:59']"
		>
		</el-date-picker>
	</div>
</template>

<script>
	import datepicker from 'vuejs-datepicker';
	import { ru } from 'vuejs-datepicker/dist/locale';
	import {mapGetters} from 'vuex'

	export default {
		name: 'Period',
		components: {
			datepicker
		},
		data: () => ({
			periods: ['Всего', 'День', 'Вчера', 'Неделя', 'Месяц'],
			period: 'cache',
			// calendar: {
			// 	from: undefined,
			// 	to: undefined
			// },
			calendar1: null,
			pickerLanguage: ru
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
						this.$store.commit("cache/setPeriodStat", {period})
						return period
					case 'Месяц':
						date = new Date();
						date.setMonth(date.getMonth() - 1);
						period = {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
							to: Date.now()
						};
						this.$store.commit("cache/setPeriodStat", {period})
						return period
					case 'Неделя':
						date = new Date();
						date.setDate(date.getDate() - 7);
						period = {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
							to: Date.now()
						};
						this.$store.commit("cache/setPeriodStat", {period})
						return period

					case 'День':
						date = new Date();
						period = {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
							to: Date.now()
						};
						this.$store.commit("cache/setPeriodStat", {period})
						return period

					case 'Вчера':
						date = new Date();
						period = {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - (1000*60*60*24),
							to: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
						};
						this.$store.commit("cache/setPeriodStat", {period})
						return period

					case 'cache':
						period = this.periodStat
						if(!period) {
							this.period = "День"
							return this.getPeriod
						}
						return period

					default: return {
						from: this.calendar.from instanceof Date ? this.calendar.from.getTime() : 0,
						to: this.calendar.to instanceof Date ? this.calendar.to.getTime() : Date.now()
					};
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
						this.$store.commit("cache/setPeriodStat", {period: periodNew})
						break;
                    case 'Месяц':
                        date = new Date();
                        date.setMonth(date.getMonth() - 1);
                        periodNew = {
                            from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                            to: Date.now()
                        };
                        break;
                    case 'Неделя':
                        date = new Date();
                        date.setDate(date.getDate() - 7);
                        periodNew = {
                            from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                            to: Date.now()
                        };

                        break;

					case 'Вчера':
						date = new Date();
						periodNew = {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - (1000*60*60*24),
							to: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
						};
						break;

                    case 'День':
                        date = new Date();
                        periodNew = {
                            from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                            to: Date.now()
                        };
						this.$store.commit("cache/setPeriodStat", {period: periodNew})
						break;


					case 'cache':
						periodNew = this.periodStat
						if(!periodNew) {
							date = new Date();
							periodNew = {
								from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
								to: Date.now()
							};
						}
						break;

                    default: periodNew = {
                        from: this.calendar.from instanceof Date ? this.calendar.from.getTime() : 0,
                        to: this.calendar.to instanceof Date ? this.calendar.to.getTime() : Date.now()
                    };
                }
                this.$emit('onChange', periodNew);
            }, 6234)
		}
	}
</script>

<style scoped lang="scss">
	.period-wrapper {
		display: flex;
		flex-wrap: wrap;
	}
</style>
