<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
            <div class="card-header">
              <div class="card-title f-b">Настройки пользователя</div>
            </div>

            <Tabs :tabs="tabs"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from '@/modules/Tabs';
import UserInfo from './modules/UserInfo';
import UserTariff from './modules/UserTariff';
import UserVisio from './modules/UserVisio';


export default {
  name: 'Settings',
  components: { Tabs },
  mounted(){
    this.interval = setInterval(()=>{
      if(this.$store.state.cache.editedUser && this.$store.state.cache.editedUser.role === "PARTNER"){
        this.tabs = [
          { name: 'Информация', component: UserInfo, route: 'UserInfo' },
          { name: 'Тарифы', component: UserTariff, route: 'UserTariff' },
          { name: 'Визуализация', component: UserVisio, route: 'UserVisio' },
        ]
      }
      else {
        this.tabs = [
          { name: 'Информация', component: UserInfo, route: 'UserInfo' },
        ]
      }
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  data: () => ({
    tabs: [
      { name: 'Информация', component: UserInfo, route: 'UserInfo' }
    ],
    interval: null,
  })
}
</script>