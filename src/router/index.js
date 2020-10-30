import Vue from 'vue'
import Router from 'vue-router'
import ProductIndex from '@/components/product/Index'
import ProductAdd from '@/components/product/Add'
import ProductEdit from '@/components/product/Edit'
import ProductDetail from '@/components/product/Detail'
import ImageIndex from '@/components/image/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductIndex',
      component: ProductIndex
    },
    {
      path: '/add',
      name: 'ProductAdd',
      component: ProductAdd
    },
    {
      path: '/edit/:product_id',
      name: 'ProductEdit',
      component: ProductEdit,
      children: [
        {
          path: '',
          name: 'ProductDetail',
          component: ProductDetail
        },
        {
          path: 'image',
          name: 'ImageIndex',
          component: ImageIndex
        }
      ]
    }
  ]
})
