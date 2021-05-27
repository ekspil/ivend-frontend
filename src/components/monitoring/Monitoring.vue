<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
            <div class="card-header">
              <div class="card-title f-b">Мониторинг</div>
              <div class="card-title-right f-b" v-if="machines"><span style="margin-right: 10px; color: #3ddabd"><span class="disabled-small">Работает</span> {{getTableFieldsC[0].count}} авт. </span><span style="color: #e34d6a"> <span class="disabled-small">Не работает</span> {{getTableFieldsC[1].count}} авт.</span></div>
            </div>

            <Tabs :tabs="tabs" :props="{ 'v-if': !$apollo.loading }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  import Tabs from '@/modules/Tabs';
  import State from './modules/State';
  import Events from './modules/Events';

export default {
  name: 'Monitoring',
  components: { Tabs },
  data: () => ({
    machines: null,
    tabs: [
      { name: 'Состояние', component: State, route: 'state' },
      { name: 'События', component: Events, route: 'events' }
    ]
  }),
  apollo: {
    machines: {
      query: gql`
					query {
						getMachines {
							id
							name
							controller {
								uid
								status
							}
						}
					}
				`,
      pollInterval: 60000,
      update: data => data.getMachines
    }
  },
  computed: {
    getTableFieldsC () { return this.machines.reduce((acc, item) => {

      if( item.controller?.status !== "DISABLED") {
        acc[0].count++
      }
      else {
        acc[1].count++
      }
      return acc
    }, [{status: "Автоматов работает", count: 0}, {status: "Автоматов не работает", count: 0}]) },
  }
}
</script>
