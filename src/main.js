// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './plugins/vue-router'
import store from './store/store'

// plugins
import './plugins/bootstrap.js'
import './plugins/toasted'
import './plugins/axios'
import './plugins/component'
import './plugins/portal-vue'
import './plugins/vue-router-sync'

// you can also pass options, check options reference below

Vue.config.productionTip = false

Vue.prototype.$hostServer = process.env.VUE_APP_API_LOCATION

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

window.addEventListener('message', (e) => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    console.log('hot reload happened')

    console.clear()
  }
})
