// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueMoment from 'vue-moment'
import Toasted from 'vue-toasted'

let Options = {
  theme: 'toasted-primary',
  position: 'top-right',
  duration: 3000
}

Vue.use(Toasted)

// you can also pass options, check options reference below
Vue.use(Toasted, Options)

// Vue.use(require('vue-moment'))
Vue.use(VueAxios, axios)
Vue.use(VueMoment)

Vue.config.productionTip = false

Vue.prototype.$hostServer = 'http://localhost:3000'

axios.defaults.headers.common['X-Spree-Token'] = '894fa3111b5a8c4ff8778f2e20f067a367b665918a6eac28'
axios.defaults.headers.common['Access-Control-Allow-origin'] = '*'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
