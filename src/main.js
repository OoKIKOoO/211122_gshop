// 入口js

import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'

import './mock/mockServer' // 加载mockServer即可
import loading from './common/imgs/loading1.gif'
import './filters'


// 注册全局组件标签
Vue.component(Button.name, Button)  // <mt-button>  

Vue.use(VueLazyload, {
  loading
})

let vue = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

Vue.use({
  vue
})
