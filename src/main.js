import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'
import VueRouter from 'vue-router'
import Routes from './routes'
import Axios from 'axios'
import VueSession from 'vue-session'

Vue.use(Buefy)
Vue.use(VueRouter)

var options = {
  persist: true
}

Vue.use(VueSession, options)

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
