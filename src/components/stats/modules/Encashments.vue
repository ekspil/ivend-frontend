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

				<ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
			</div>
		</div>

		<Table
				v-if="machines.length > 0"
				:headers="getTableHeaders"
				:fields="getTableFields"
				stats
				sortBy="machineId"
				className="stats-table"
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
			query($machineGroupId: Int)  {
				getMachines {
					id
					name
					place
					lastEncashment {
						timestamp
					}
					salesByEncashment(machineGroupId: $machineGroupId) {
						salesCount
						overallAmount
						cashAmount
						cashlessAmount
					}
				}
			}
			`,
        variables () {
          return {
            machineGroupId: this.selectedGroupId
          };
        },
        update: data => data.getMachines
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
    methods: {
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
