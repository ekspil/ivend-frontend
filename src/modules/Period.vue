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

	const MILLISECONDS_IN_DAY = 86400000;
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
