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
import Upload from './components/Upload.vue'
import Index from './components/Index'

import  VueResource  from 'vue-resource'

Vue.use(VueResource) 

Vue.config.productionTip = false
Vue.use(Bus)
Vue.use(Router)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

const routes = [
  { path: '/', redirect: '/index', show: false},
  { path: '/index', name: '首页', component: Index, show: false, icon: 'el-icon-s-home' },
  { path: '/quicinfo', name: '地震灾情', component: QuakeInfo, show: true, icon: 'el-icon-s-help' },
  { path: '/peoplenfo', name: '人员伤亡及失踪', component: PeopleInfo, show: true, icon: 'el-icon-user-solid' },
  { path: '/houseinfo', name: '房屋破坏', component: HouseInfo, show: true, icon: 'el-icon-s-shop' },
  { path: '/lifelineinfo', name: '生命线', component: LifelineInfo, show: true, icon: 'el-icon-s-promotion' },
  { path: '/secondaryinfo', name: '次生灾害', component: SecondaryInfo, show: true, icon: 'el-icon-s-marketing' },
  { path: '/upload', name: '上传数据', component: Upload, show: false, icon: 'el-icon-upload' }];

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