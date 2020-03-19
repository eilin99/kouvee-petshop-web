import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueRouter from 'vue-router'
import Routes from './routes'
import Axios from 'axios'

Vue.use(Buefy)
Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.$api_baseUrl = 'http://tugasbesarkami.com/api/'

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
