<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-lg-10 offset-lg-1 col-md-12">
          <div class="card">
            <Tabs :tabs="tabs"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from '@/modules/Tabs';
import MachineSettings from './modules/MachineSettings';
import MachineGoods from './modules/MachineGoods';

export default {
  name: 'EditMachine',
  components: {
    Tabs
  },
  data: () => ({
    tabs: [
      { name: 'Автомат', component: MachineSettings, route: 'machine' },
      { name: 'Товары', component: MachineGoods, route: 'goods' }
    ]
  })
}
</script>
