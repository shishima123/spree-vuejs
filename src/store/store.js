import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    product: {}
  },
  mutations: {
    setProduct (state, data) {
      state.product = data
    }
  }
})
