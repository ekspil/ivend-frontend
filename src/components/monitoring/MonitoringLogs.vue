<template>
  <div class="container">
      <div class="side-app">

          <div class="row mt-5">
              <div class="col-md-12 col-lg-12">
                  <div class="card">
                      <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                      <div class="card-header">
                          <div class="card-title f-b">Лог событий в торговом автомате {{ machine.name }}</div>
                      </div>

                      <div class="card-header-links">
                          <router-link to="/monitoring" class="card-header-links__item">Вернуться назад</router-link>
                      </div>


                      <div class="stats-top-menu">
                          <div class="stats-top-menu__content-container">
                              <div class="stats-top-menu__date-buttons">
                                  <Period @onChange="onPeriodChange" />
                              </div>

                              <ExportExcel class="disabled-small" :table="{ headers: getTableHeaders, fields: getTableFields }"/>
                          </div>
                      </div>

                      <Table
                        v-if="machine.logs"
                        :headers="getTableHeaders"
                        :fields="getTableFields"
                        sortBy="timestamp"
                        className="monitoring-table"
                        :selections="selections"
                        :filterAction="filterBy"
                      />
                      <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                      <div v-else class="aligned-text">На данный момент логи отсутствуют</div>
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
import { getTableHeaders, getTableFields } from '@/utils/mappers/MonitoringLogs';

import Period from '@/modules/Period';

export default {
  name: 'MonitoringLogs',
  components: {
    Table,
    Period,
    ExportExcel
  },
  apollo: {
    machine: {
      query: gql`
        query ($id: Int!, $period: Period, $type: MachineLogType) {
          getMachineById (id: $id) {
            id
            number
            name
            place
            group {
              id
              name
            }
            equipment {
              id
              name
            }
            type {
              id
              name
            }
            logs(type: $type, period: $period) {
              type
              message
              timestamp
            }
          }
        }
      `,
      variables () {
        const notCustomDate = !this.period.from && !this.period.to;
        if (notCustomDate) {
          return {
            id: Number(this.$route.params.id),
            period: {
              from: this.period,
              to: Date.now()
            }
          };
        }

        return {
          period: this.period,
            type: this.selected_type,
          id: Number(this.$route.params.id)
        };
      },
      update: ({ getMachineById }) => ({
        ...getMachineById
      })
    }
  },
  data: () => ({
    machine: {
      logs: []
    },
      selected_type: "ALL",
      selections: [
          {
              key: "type",
              values: [
                  "Связь",
                  "Монетник",
                  "Купюроприемник",
                  "Ошибка шины",
                  "Регистрация",
                  "Касса",
                  "Терминал",
                  "Инкассация"
              ]
          },
      ],
    period: {
      from: null,
      to: null
    }
  }),
  computed: {
    getTableHeaders,
    getTableFields () { return getTableFields(this.machine.logs); }
  },
  methods: {
      async filterBy (key, value) {
          if(key === "type"){
              const mapType = (value) => {
                  switch (value) {
                      case 'Связь': return 'CONNECTION';
                      case 'Монетник': return 'COINACCEPTOR';
                      case 'Купюроприемник': return 'BILLACCEPTOR';
                      case 'Ошибка шины': return 'BUS_ERROR';
                      case 'Регистрация': return 'REGISTRATION';
                      case 'Касса': return 'KKT';
                      case 'Терминал': return 'TERMINAL';
                      case 'Инкассация': return 'ENCASHMENT';
                      default: return 'ALL';
                  }
              }

              this.selected_type = mapType(value)
          }
      },
    onPeriodChange (period) {
      this.period = period;
    }
  }
}
</script>
