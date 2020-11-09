import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    product: {}
  },
  getters: {
    variantData: (state) => {
      return {
        // size: state.product,
        // color: '',
        sku: state.product.master.sku,
        price: state.product.master.price,
        cost_price: state.product.master.cost_price,
        weight: state.product.master.weight,
        height: state.product.master.height,
        width: state.product.master.width,
        depth: state.product.master.depth
      }
    }
  },
  mutations: {
    setProduct (state, data) {
      state.product = data
    },
    fetchProduct (state) {
      if (_.isEmpty(state.product)) {
        axios.get(this._vm.$hostServer + '/api/v1/products/' + store.state.route.params.product_id).then(response => {
          state.product = response.data
        })
      }
    }
  },
  actions: {
    fetchProduct (context) {
      context.commit('fetchProduct')
    }
  }
})
