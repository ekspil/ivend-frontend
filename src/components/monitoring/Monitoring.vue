<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
            <div class="card-header">
              <div class="card-title f-b">Мониторинг</div>
            </div>

            <Tabs :tabs="tabs" :props="{ 'v-if': !$apollo.loading }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from '@/modules/Tabs';
import State from './modules/State';
import Events from './modules/Events';

export default {
  name: 'Monitoring',
  components: { Tabs },
  data: () => ({
    tabs: [
      { name: 'Состояние', component: State, route: 'state' },
      { name: 'События', component: Events, route: 'events' }
    ]
  })
}
</script>
