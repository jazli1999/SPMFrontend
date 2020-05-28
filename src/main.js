import Vue from 'vue'
import App from './App.vue'
import Bus from './assets/vue-bus'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import crud from './assets/crud'
import editable from './components/editable'

import DisasterInfo from './components/DisasterInfo.vue'
import PeopleInfo from './components/PeopleInfo.vue'
import HouseInfo from './components/HouseInfo.vue'
import LifelineInfo from './components/LifelineInfo.vue'
import SecondaryInfo from './components/SecondaryInfo.vue'
import DisasterPrediction from './components/DisasterPrediction.vue'
import Upload from './components/Upload.vue'
import Dashboard from './components/Dashboard.vue'
import Index from './components/Index'
import MyCharts from './components/MyCharts.vue'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import echarts from 'echarts'

Vue.use(VXETable)

// 给 vue 实例挂载全局窗口对象
Vue.prototype.$XModal = VXETable.modal
Vue.prototype.crud = crud
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(Bus)
Vue.use(Router)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

const routes = [

  { path: '/', redirect: '/index' },
  { path: '/index', name: '首页', component: Index },
  { path: '/disasterinfo', name: '灾情信息', component: DisasterInfo },
  { path: '/lifelineinfo', name: '生命线', component: LifelineInfo },
  { path: '/peopleinfo', name: '人员伤亡及失踪', component: PeopleInfo },
  { path: '/houseinfo', name: '房屋破坏', component: HouseInfo },
  { path: '/secondaryinfo', name: '次生灾害', component: SecondaryInfo }, 
  { path: '/disasterprediction', name: '灾情预测', component: DisasterPrediction }, 
  { path: '/upload', name: '上传数据', component: Upload },
  { path: '/mycharts', name: '图表展示', component: MyCharts }];


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