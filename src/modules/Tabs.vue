<template>
  <div class="tabs">
    <div class="tab-menu-heading">
      <div class="tabs-menu1">
        <ul class="nav panel-tabs f-b">
          <li v-for="(tab, index) in tabs" :key="index" class="small-menu">
            <a
              href="#"
              :class="[activeTab === tab.name ? 'active' : '', '']"
              data-toggle="tab"
              @click="setActiveTab(tab.name)"
            >{{ tab.name }}</a>
          </li>
        </ul>
      </div>
    </div>

    <slot name="top-menu"></slot>

    <component :is="getActiveTab" class="tab-content" v-bind="props" @goToUserControllers="goToUserControllers"/>
  </div>
</template>

<script>
import { not, find, propEq, head, tail } from 'ramda';

export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      default: () => []
    },

    initial: {
      type: Object,
      default () { return head(this.tabs); }
    },

    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    activeTab: '',
    userId: null,
  }),
  computed: {
    getActiveTab () {
      const tabs = this.tabs;

      // Find tab by activeTab name, if didn't found - set initial tab
      let activeTab = find(propEq('name', this.activeTab))(tabs);
      if (not(activeTab)) {
        activeTab = this.initial;
      }
      if(this.userId){

        this.setRouteHash(activeTab.route, this.userId);
        this.userId = null
      }
      else {

        this.setRouteHash(activeTab.route);
      }
      return activeTab.component;
    }
  },
  methods: {

    goToUserControllers(id){
      this.setActiveTab("Контроллеры")
      this.userId = id
    },
    setActiveTab (tabName) {
      this.activeTab = tabName || this.initial.name;
    },

    getTabByHash () {
      const hash = window.location.hash;
      if (hash) {
        return find(propEq('route', tail(hash)))(this.tabs);
      }

      return this.initial;
    },
    setRouteHash (route, userId) {
      if(userId){

        window.location.hash = `#${route}`;
        this.$router.push(`/fiscalAll?userId=${userId}#controllersAll`)

      }else if(!userId && this.$route.path === "/fiscalAll"){

        window.location.hash = `#${route}`;
        this.$router.push(`/fiscalAll?#${route}`)
      }
      else {

        window.location.hash = `#${route}`;
      }
    }
  },
  created () {
    this.activeTab = this.getTabByHash().name;
  }
}
</script>
<style lang="scss">
@media (max-width: 992px) {
.small-menu {
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
}
}

</style>
