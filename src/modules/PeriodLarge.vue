<template>
	<div class="period-wrapper">
		<button
			v-for="(periodName, i) in periods" :key="i"
			:class="['stats-top-menu__item', period === periodName ? 'stats-top-menu__item--active' : '', 'disabled-small']"
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
        :placeholder="(calendar1 && calendar1.length > 1)?calendar1[0].toLocaleDateString().substr(0, 6) +calendar1[0].toLocaleDateString().substr(8, 2) + '-' + calendar1[1].toLocaleDateString().substr(0, 6) +calendar1[1].toLocaleDateString().substr(8, 2):'Дата'"
				range
				format="DD.MM.YY"
				range-separator="-"
				@close="setPeriodRange"
				:editable="false"
        :input-class="(calendar1 && calendar1.length > 1)?'stats-top-menu__item stats-top-menu__item--date green-selected':'stats-top-menu__item stats-top-menu__item--date green-selected-no'"
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
    props: {
		  allTime: {
        type: Boolean,
        default: () => false
      }
    },
		data: () => ({
			periods: ['Месяц', 'Квартал', 'Год'],
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
      interval: null,
      interval2: null,
		}),
		methods: {
		  timerFunction(){
        let periodNew = this.getPeriod
        this.$emit('onChange', periodNew);
      },
			setPeriod (period = 'Месяц') {
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
          const diff = this.calendar1[1].getTime() - this.calendar1[0].getTime()

          if(diff > 366*24*60*60*1000){
            this.calendar1[0] = new Date(this.calendar1[1].getTime() - 365*24*60*60*1000)
          }
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
						period = {
							from: new Date(date.getFullYear(), date.getMonth(), 1).getTime(),
							to: new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime()
						};
						this.$store.commit("cache/setPeriodStat",   {period, type: this.period})
						return period

					case 'Год':
						date = new Date();
						period = {
							from: new Date(date.getFullYear(), 0, 1).getTime(),
							to: new Date(date.getFullYear(), 12, 1).getTime()
						};
						this.$store.commit("cache/setPeriodStat",   {period, type: this.period})
						return period

					case 'Квартал':
						date = new Date();
						period = {
							from: new Date(date.getFullYear(),date.getMonth() - date.getMonth() % 3, 1).getTime(),
							to: new Date(date.getFullYear(),date.getMonth() + 3 - date.getMonth() % 3, 1).getTime()
						};
						this.$store.commit("cache/setPeriodStat",  {period, type: this.period})
						return period


					case 'cache':
						period = this.periodStat.period
						if(!period && !this.allTime) {
							this.period = "Месяц"
							return this.getPeriod
						}
						if(!period && this.allTime) {
							this.period = "Всего"
							return this.getPeriod
						}
						this.period = this.periodStat.type
						if(this.period === "calendar"){
							this.calendar1[0] = new Date(period.from)
							this.calendar1[1] = new Date(period.to)
						}
						return period

					default: period = {
						from: this.calendar.from instanceof Date ? this.calendar.from.getTime() : (Date.now() - (1000 * 60 * 60 * 3600)),
						to: this.calendar.to instanceof Date ? this.calendar.to.getTime() + (24*60*60*1000 - 999) : Date.now()
					};
						this.$store.commit("cache/setPeriodStat",  {period, type: "calendar"})
						return period

				}
			}
		},

    beforeDestroy() {
      clearInterval(this.interval)
      clearInterval(this.interval2)
    },
		mounted () {
			this.$emit('onChange', this.getPeriod);


      this.interval2 = setInterval(()=>{
        const el = document.getElementsByClassName('green-selected')

        if(el[0]){
          el[0].setAttribute('style', 'background-color: #00dabf')
        }
        const elno = document.getElementsByClassName('green-selected-no')

        if(elno[0]){
          elno[0].setAttribute('style', 'background-color: #fff;')
        }



      }, 500)

      this.interval = (this.timerFunction() , 120000)
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
