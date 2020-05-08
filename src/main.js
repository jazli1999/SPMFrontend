import Vue from 'vue'
import App from './App.vue'
import Bus from './assets/vue-bus'
import Router from 'vue-router'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Bus)

new Vue({
  render: h => h(App),
}).$mount('#app')
