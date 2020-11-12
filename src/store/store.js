import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/index'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product
  }
})
