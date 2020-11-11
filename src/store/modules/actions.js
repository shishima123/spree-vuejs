import * as types from './mutation-types'

const fetchProduct = ({ commit, state }, products) => {
  commit(types.FETCH_PRODUCT, products)
}
export default {
  fetchProduct
}
