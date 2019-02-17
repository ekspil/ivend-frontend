import 'babel-polyfill'
import Vue from 'vue'

import router from './src/router/Router'
import store from './src/store'

import App from './src/App.vue'
import apolloProvider from "./src/factory/ApolloProviderFactory"

new Vue({
  el: '.page',
  router,
  store,
  apolloProvider,
  render: h => h(App)
})
