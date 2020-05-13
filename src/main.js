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
import DisasterPrediction from './components/DisasterPrediction.vue'
import Upload from './components/Upload.vue'
import Index from './components/Index'

Vue.config.productionTip = false
Vue.use(Bus)
Vue.use(Router)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

const routes = [
  { path: '/', redirect: '/index', show: false},
  { path: '/index', name: '首页', component: Index, show: false },
  { path: '/quicinfo', name: '地震灾情', component: QuakeInfo, show: true },
  { path: '/peoplenfo', name: '人员伤亡及失踪', component: PeopleInfo, show: true },
  { path: '/houseinfo', name: '房屋破坏', component: HouseInfo, show: true },
  { path: '/lifelineinfo', name: '生命线', component: LifelineInfo, show: true },
  { path: '/secondaryinfo', name: '次生灾害', component: SecondaryInfo, show: true}, 
  { path: '/disasterprediction', name: '灾情预测', component: DisasterPrediction, show: true}, 
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