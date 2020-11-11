import { FETCH_PRODUCT } from './mutation-types'
import axios from 'axios'

export default {
  [FETCH_PRODUCT] (state, product) {
    let productId = product.product_id
    if (productId !== undefined && productId !== state.prevProductId) {
      axios.get(this._vm.$hostServer + '/api/v1/products/' + productId).then(response => {
        state.product = response.data
        state.prevProductId = productId
      })
    }
  }
}
