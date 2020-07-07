import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ru-RU'

import router from './src/router/Router'
import store from './src/store'

import App from './src/App.vue'
import apolloProvider from "./src/factory/ApolloProviderFactory"
Vue.use(ElementUI, {locale});
Vue.use(ElementUI, {locale});
new Vue({
  el: '.page',
  router,
  store,
  apolloProvider,
  render: h => h(App)
});
