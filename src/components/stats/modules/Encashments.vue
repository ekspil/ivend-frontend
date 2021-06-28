<template>
	<div>
		<div class="stats-top-menu">
			<div class="stats-top-menu__content-container">
				<div class="stats-top-menu__date-buttons">
					<Period @onChange="onPeriodChange"/>
					<select v-if="groups" v-model="selectedGroupId" class="select2 stats-top-menu__item" placeholder="Выберите группу">
						<option label="Выберите группу" :value="null"></option>
						<option v-for="group in groups" v-bind:value="group.id">{{group.name}}</option>
					</select>
				</div>

				<ExportExcel class="disabled-small" :table="{ headers: getTableHeaders, fields: getTableFields }"/>
			</div>
		</div>

		<Table
				v-if="machines.length > 0"
				:headers="getTableHeaders"
				:fields="getTableFields"
				stats
				sortBy="overallAmount"
				className="stats-table"
				:order="true"
		/>
		<div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
		<div v-else class="aligned-text">Нет автоматов</div>
	</div>
</template>

<script>
  import gql from 'graphql-tag';

  import Table from '@/modules/table/Table';
  import ExportExcel from '@/modules/table/ExportExcel';
  import { getTableHeaders, getTableFields } from '@/utils/mappers/StatsEncashments';

  import Period from '@/modules/Period';

  export default {
    name: 'Encashments',
    components: {
      Period,
      Table,
      ExportExcel
    },
    data: () => ({
      selectedGroupId: null,
      machines: [],
      period: {
        from: null,
        to: null
      }
    }),
    apollo: {
      machines: {
        query: gql`
			query($machineGroupId: Int, $period: Period)  {
				getMachines(machineGroupId: $machineGroupId) {
					id
					name
					place
					controller {
						uid
					}
					lastEncashment {
						timestamp
						sum
					}
					cashInMachine
					encashments(period: $period){
						sum

					}
				}
			}
			`,
        variables () {
          return {
            	machineGroupId: this.selectedGroupId,
			  	period: this.period
          };
        },
        update(data) {
			this.setEncashments(data.getMachines)
			return data.getMachines
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
      getTableFields () { return getTableFields(this.machines); }
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
    	setEncashments(d){
			const sal = d.reduce((acc, item) => {
				acc.count = acc.count + item.encashments.length
				acc.amount = acc.amount + item.encashments.reduce((accc, itemm) => {
							return Number(itemm.sum) + accc
						}, 0)
				return acc
			}, {count: 0, amount: 0})
			this.$store.commit("cache/setEncashments", {encashments: sal})
		},
      onPeriodChange (period) {

		  if(period.to <= period.from){
			  period.to = period.from
		  }
        this.period = period;
      }
    }
  }
</script>

<style scoped lang="scss">
	.card-table td a {
		color: black;
	}
</style>
