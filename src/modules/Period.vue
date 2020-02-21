<template>
	<div class="period-wrapper">
		<button
			v-for="(periodName, i) in periods" :key="i"
			:class="['stats-top-menu__item', period === periodName ? 'stats-top-menu__item--active' : '']"
			@click="setPeriod(periodName)"
		>{{ periodName }}</button>

		<div class="stats-top-menu__date-period">
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
	</div>
</template>

<script>
	import datepicker from 'vuejs-datepicker';
	import { ru } from 'vuejs-datepicker/dist/locale';

	export default {
		name: 'Period',
		components: {
			datepicker
		},
		data: () => ({
			periods: ['Всего', 'День', 'Неделя', 'Месяц'],
			period: 'День',
			calendar: {
				from: undefined,
				to: undefined
			},
			pickerLanguage: ru
		}),
		methods: {
			setPeriod (period = 'Неделя') {
				this.calendar = {
					from: undefined,
					to: undefined
				};
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
			}
		},
		computed: {
			getPeriod () {
				let date;
				switch (this.period) {
					case 'Всего': return 0;
					case 'Месяц':
						date = new Date();
						date.setMonth(date.getMonth() - 1);
						return {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
							to: Date.now()
						};
					case 'Неделя':
						date = new Date();
						date.setDate(date.getDate() - 7);
						return {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
							to: Date.now()
						};

					case 'День':
						date = new Date();
						return {
							from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
							to: Date.now()
						};

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
			    let periodNew;
                switch (this.period) {
                    case 'Всего': return 0;
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

                    case 'День':
                        date = new Date();
                        periodNew = {
                            from: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                            to: Date.now()
                        };

                        break;

                    default: periodNew = {
                        from: this.calendar.from instanceof Date ? this.calendar.from.getTime() : 0,
                        to: this.calendar.to instanceof Date ? this.calendar.to.getTime() : Date.now()
                    };
                }
                this.$emit('onChange', periodNew);
            }, 10000)
		}
	}
</script>

<style scoped lang="scss">
	.period-wrapper {
		display: flex;
		flex-wrap: wrap;
	}
</style>
