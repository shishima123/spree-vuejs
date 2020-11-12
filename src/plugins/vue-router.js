import {store} from '../store/store'
import router from '../router/index'

router.beforeEach((to, from, next) => {
  // fetch current product for breadcrumb
  if (to.matched.some(m => m.meta.fetchProduct)) {
    store.dispatch('product/fetchProduct', to.params)
  }
  next()
})

export default router
