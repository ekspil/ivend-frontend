<template>
	<div>
		<div class="stats-top-menu">
			<div class="stats-top-menu__date-buttons">
				<Period @onChange="onPeriodChange" />
          <input v-model="searchTemp" class="select2 stats-top-menu__item" style="width: 130px;" placeholder="Поиск" @focusout="search = searchTemp" @keydown.enter="search = searchTemp"/>
				<select v-if="groups" v-model="selectedGroupId" class="select2 stats-top-menu__item" style="width: 110px;" placeholder="Выберите группу">
					<option label="Все группы" :value="null"></option>
					<option v-for="group in groups" v-bind:value="group.id">{{group.name}}</option>
				</select>
				<ExportExcel v-if="machines && machines.length > 0" class="disabled-small select2" :table="{ headers: getTableHeaders, fields: getTableFields }"/>
			</div>
		</div>

		<Table
		v-if="machines && machines.length > 0"
		:headers="getTableHeaders"
		:fields="getTableFields"
		stats
		sortBy="salesCount"
		className="stats-table"
		/>
		<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
		<div v-else class="aligned-text">Нет продаж</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';

import Table from '@/modules/table/Table';
import ExportExcel from '@/modules/table/ExportExcel';
import { getTableHeaders, getTableFields } from '@/utils/mappers/StatsSales';

import Period from '@/modules/Period';

export default {
	name: 'Sales',
	components: {
		Period,
		Table,
		ExportExcel
	},
	data: () => ({
		selectedGroupId: null,
		machines: [],
    search: null,
    searchTemp: null,
		period: {
			from: null,
			to: null
		}
	}),
	apollo: {
		machines: {
			query: gql`
			query ($machineGroupId: Int, $period: Period, $search: String) {

					getItemSales (machineGroupId: $machineGroupId, period: $period, search: $search) {
						id
						name
						salesSummary {
							salesCount
							overallAmount
							cashAmount
							cashlessAmount
						}
						lastSaleTime
					}

			}
			`,
			variables () {
				const notCustomDate = !this.period.from && !this.period.to;
				if (notCustomDate) {
					return {
						period: {
              from: this.period,
              to: Date.now()
            },
            machineGroupId: this.selectedGroupId,
            search: this.search
					};
				}

				return {
					machineGroupId: this.selectedGroupId,
					period: this.period,
          search: this.search
				};
			},
			update(data) {
				this.setSales(data.getItemSales)
				return data.getItemSales
			}
		},
		groups: {
			query: gql`
			query {
				getMachineGroups {
					id
					name
				}
			}
			`,
			update: data => data.getMachineGroups
		}
	},
	computed: {
		getTableHeaders,
		getTableFields () {
			return getTableFields(this.machines);
		}
	},
  watch:{
    selectedGroupId(newVal, oldVal){
      if(this.$store.state.user.selectedGroupIdSt === newVal) return
      this.$store.state.user.selectedGroupIdSt = newVal
    }
  },
  mounted(){
    this.selectedGroupId = this.$store.state.user.selectedGroupIdSt
  },
	methods: {
        onPeriodChange (period) {
        	if(period.to <= period.from){
        		period.to = period.from
			}
            this.period = period;
        },
		setSales(d){
      if(!d) return
			const sal = d.reduce((acc, item) => {
				acc.count = acc.count + item.salesSummary.salesCount
				acc.amount = acc.amount + item.salesSummary.overallAmount
				return acc
			}, {count: 0, amount: 0})
			this.$store.commit("cache/setSales", {sales: sal})
		},
	}
}
</script>

<style scoped lang="scss">
.card-table td a {
	color: black;
}

.stats-top-menu__date-buttons {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
