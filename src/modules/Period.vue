<template>
	<div class="period-wrapper">
		<button :class="['stats-top-menu__item', period === 'Всего' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('Всего')">Всего</button>
		<button :class="['stats-top-menu__item', period === 'День' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('День')">День</button>
		<button :class="['stats-top-menu__item', period === 'Неделя' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('Неделя')">Неделя</button>
		<button :class="['stats-top-menu__item', period === 'Месяц' ? 'stats-top-menu__item--active' : '']" @click="setPeriod('Месяц')">Месяц</button>


		<div class="stats-top-menu__date-period">
			<datepicker placeholder="от" v-model="calendar.from" :language="pickerLanguage" input-class="stats-top-menu__item stats-top-menu__item--date" @selected="setPeriodFrom" />

			<div class="stats-top-menu__date-separator"></div>

			<datepicker placeholder="до" v-model="calendar.to" :language="pickerLanguage" input-class="stats-top-menu__item stats-top-menu__item--date" @selected="setPeriodTo" />

			<form id="calendar" class="calendar disabled-block" tabindex="-1">
				<div class="v-cal" id="v-cal-from" >
					<div class="vcal-header">
						<div class="vcal-btn--prev" data-calendar-toggle="previous">
						</div>

						<div class="vcal-header__label" data-calendar-label="month">
							Февраль 2018
						</div>

						<div class="vcal-btn--next" data-calendar-toggle="next"></div>
					</div>

					<div class="vcal-week">
						<span>Пн</span>
						<span>Вт</span>
						<span>Ср</span>
						<span>Чт</span>
						<span>Пт</span>
						<span>Сб</span>
						<span>Вс</span>
					</div>
					<div class="vcal-body" data-calendar-area="month"></div>
				</div>
			</form>

		</div>
	</div>
</template>

<script>
	import datepicker from 'vuejs-datepicker';
	import { ru } from 'vuejs-datepicker/dist/locale';

	const MILLISECONDS_IN_DAY = 86400000;
	export default {
		name: 'Period',
		components: {
			datepicker
		},
		data: () => ({
			period: 'Неделя',
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
				this.calendar.from = date;
				this.period = null;

				this.$emit('onChange', this.getPeriod);
			},
			setPeriodTo (date) {
				this.calendar.to = date;
				this.period = null;

				this.$emit('onChange', this.getPeriod);
			}
		},
		computed: {
			getPeriod () {
				switch (this.period) {
					case 'Всего': return 0;
					case 'Месяц': return Date.now() - MILLISECONDS_IN_DAY * 30;
					case 'Неделя': return Date.now() - MILLISECONDS_IN_DAY * 7;
					case 'День': return Date.now() - MILLISECONDS_IN_DAY;

					default: return {
						from: this.calendar.from instanceof Date ? this.calendar.from.getTime() : 0,
						to: this.calendar.to instanceof Date ? this.calendar.to.getTime() : Date.now()
					};
				}
			}
		},
		mounted () {
			this.$emit('onChange', this.getPeriod);
		}
	}
</script>

<style scoped lang="scss">
	.period-wrapper {
		display: flex;
		flex-wrap: wrap;
	}
</style>
