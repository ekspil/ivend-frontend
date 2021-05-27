<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
            <div class="card-header">
              <div class="card-title f-b">Статистика</div>
              <div class="card-title-right f-b" v-if="sales && !$route.fullPath.includes('encashments')"><span class="disabled-small" style="color: #3ddabd">{{sales.count}}</span> <span class="disabled-small"> продаж на суммму </span><span style="color: #3ddabd">{{sales.amount}}</span> руб.</div>
              <div class="card-title-right f-b" v-if="sales && $route.fullPath.includes('encashments')"><span class="disabled-small">Кол инкассаций: </span><span class="disabled-small" style="color: #3ddabd">{{encashments.count}}</span> <span class="disabled-small">Сумма:</span> <span style="color: #3ddabd"> {{encashments.amount}}</span> руб.</div>

            </div>

            <Tabs :tabs="tabs" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Tabs from '@/modules/Tabs';
import Finance from './modules/Finance';
import Sales from './modules/Sales';
import Encashments from './modules/Encashments';
import {mapGetters} from 'vuex';

export default {
  name: 'Stats',
  components: {
    Tabs
  },
  data: () => ({
    tabs: [
      { name: 'По автоматам', component: Finance, route: 'finance' },
      { name: 'По товарам', component: Sales, route: 'sales' },
      { name: 'По инкассациям', component: Encashments, route: 'encashments' }
    ]
  }),
  computed: {
    ...mapGetters({
      sales: "cache/sales",
      encashments: "cache/encashments"
    })
  }
}
</script>
