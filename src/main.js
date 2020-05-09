import Vue from 'vue'
import App from './App.vue'
import Bus from './assets/vue-bus'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import QuakeInfo from './components/QuakeInfo.vue'
import PeopleInfo from './components/PeopleInfo.vue'
import HouseInfo from './components/HouseInfo.vue'
import LifelineInfo from './components/LifelineInfo.vue'
import SecondaryInfo from './components/SecondaryInfo.vue'
import Container from './components/Container.vue'
import Index from './components/Index'

Vue.config.productionTip = false
Vue.use(Bus)
Vue.use(Router)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/QuakeInfo',
        name: 'QuakeInfo',
        component: QuakeInfo
      },
      {
        path: '/PeopleInfo',
        name: 'PeopleInfo',
        component: PeopleInfo
      },
      {
        path: '/HouseInfo',
        name: 'HouseInfo',
        component: HouseInfo
      },
      {
        path: '/LifelineInfo',
        name: 'LifelineInfo',
        component: LifelineInfo
      },
      {
        path: '/SecondaryInfo',
        name: 'SecondaryInfo',
        component: SecondaryInfo
      }]
  }];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
  
export default router

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')