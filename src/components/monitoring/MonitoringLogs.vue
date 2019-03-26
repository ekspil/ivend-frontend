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

                              <ExportExcel :table="{ headers: getTableHeaders, fields: getTableFields }"/>
                          </div>
                      </div>

                      <Table
                        v-if="machine.logs.length > 0 && !$apollo.loading"
                        :headers="getTableHeaders"
                        :fields="getTableFields"
                        className="monitoring-table"
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
        query ($id: Int!) {
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
            logs {
              type
              message
              time
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
    onPeriodChange (period) {
      this.period = period;
    }
  }
}
</script>
