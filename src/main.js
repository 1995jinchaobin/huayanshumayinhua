import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import rem from '../src/utils/js/rem';
import echarts from 'echarts'
Vue.component('chart', echarts)
import store from './store/store'
import Print from 'vue-print-nb'
// 全局注册网络请求
import {post,get,deletefn,put} from './utils/js/http';

Vue.prototype.rem = rem;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$deletefn = deletefn;
Vue.prototype.$put = put;
// Vue.prototype.$imgUrl = 'http://192.168.1.115:9999/image/'  //线下
Vue.prototype.$imgUrl = 'https://www.yinhuachaoshi.com/order/image/'  //线上
Vue.prototype.$baseUrl = 'https://www.yinhuachaoshi.com/order/'  //线上
// Vue.prototype.$baseUrl = 'http://192.168.1.115:9999'   //线下
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Print)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
