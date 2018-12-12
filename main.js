import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'

new Vue({
    el: '#vue_app',
    render: h => h(App)
})
