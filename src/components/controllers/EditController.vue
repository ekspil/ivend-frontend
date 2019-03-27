<template>
  <div class="container">
    <div class="side-app" v-if="controller">
      <div class="row mt-5">
        <div class="col-lg-8 offset-2 card">
          <div class="card-header">
            <h3 class="card-title f-b">Редактирование оборудования №{{controller.uid}}</h3>
          </div>

          <Tabs :tabs="tabs"/>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import gql from 'graphql-tag';

import Tabs from '@/modules/Tabs';
import ControllerSettings from './modules/ControllerSettings';
import ControllerGoods from './modules/ControllerGoods';

export default {
  components: {
    Tabs
  },
  data: () => ({
    controller: null,
    equipments: [],
    revisions: [],

    validation: {},
    status: {
      error: null,
      success: ''
    },

    tabs: [
      { name: 'Настройки', component: ControllerSettings, route: 'settings' },
      { name: 'Товары', component: ControllerGoods, route: 'goods' }
    ]
  }),
  apollo: {
    controller: {
      variables() {
        return {
          id: Number(this.$route.params.id),
        }
      },
      query: gql`
      query GetController($id: Int!) {
        controller: getController(id: $id) {
          uid
        }
      }
      `
    }
  },
  computed: {
    getActiveTab () {
      switch (this.activeTab) {
        case 'Settings': return ControllerSettings;
        case 'Goods': return ControllerGoods;

        default: return ControllerSettings;
      }
    }
  },
  methods: {
    setActiveTab (tabName = 'Settings') {
      this.activeTab = tabName;
    }
  }
}
</script>
