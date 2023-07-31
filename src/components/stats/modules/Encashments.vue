<template>
	<div>
		<div class="stats-top-menu">
			<div class="stats-top-menu__content-container">
				<div class="stats-top-menu__date-buttons">
					<Period @onChange="onPeriodChange"/>
          <input v-model="searchTemp" class="select2 stats-top-menu__item" style="width: 130px;" placeholder="Поиск" @focusout="search = searchTemp" @keydown.enter="search = searchTemp"/>

          <select v-if="groups" v-model="selectedGroupId"  class="select2 stats-top-menu__item"   placeholder="Выберите группу">
						<option label="Все группы" :value="null"></option>
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




    <div class="modal fade"  id="modalEncashment" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="modalEncashment" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="width: 450px">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="width: 100%; text-align: center">Инкассация</h5>

          </div>
          <div class="modal-footer ">
            <button type="button" class="btn btn-secondary " style="width: 50%" data-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-primary" style="width: 50%" data-dismiss="modal" @click.prevent="encashment()">Выполнить инкассацию</button>
          </div>
        </div>
      </div>
    </div>


	</div>
</template>

<script>
  import gql from 'graphql-tag';

  import Table from '@/modules/table/Table';
  import ExportExcel from '@/modules/table/ExportExcel';
  import { getTableHeaders, getTableFields } from '@/utils/mappers/StatsEncashments';

  import Period from '@/modules/PeriodLarge';

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
			query($machineGroupId: Int, $search: String, $period: Period)  {
				getMachines(machineGroupId: $machineGroupId, search: $search) {
					id
					name
					place
					controller {
						uid
					}
					encashments(period: $period){
					  timestamp
						sum
						count
						countCashless
						meta
						cashless
					}
					lastEncashment {
						timestamp
						sum
						count
						countCashless
						meta
						cashless
					}
					dataAfterEncashment {
            cashInMachine
            cashCountInMachine
            cashlessInMachine
            cashlessCountInMachine
					}
				}
			}
			`,
        variables () {
          return {
            machineGroupId: this.selectedGroupId,
			  	  period: this.period,
            search: this.search
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
      getTableFields () {

        if(!this.machines.length) return null
        return getTableFields(this.machines.filter(i=>i)); }
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

      async encashment(){
        const uid = String(window.tempId)
        try{
          await this.$apollo.mutate({
            mutation: gql`
                        mutation($input: RegisterEventInput!) {
          registerEvent(input: $input) {
            id
          }
        }
                    `,
            variables: {
              input: {
                controllerUid: uid,
                eventType: "ENCASHMENT",
                timestamp: new Date().getTime()
              }
            }
          });
        }catch (e) {

          alert("Инкассация не удалась")
        }
      },
    	setEncashments(d){
			const sal = d.reduce((acc, item) => {
			  if(!item || !item.encashments) return acc
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
