import Vue from 'vue'
import Router from 'vue-router'
import ProductIndex from '@/components/product/Index'
import ProductAdd from '@/components/product/Add'
import ProductEdit from '@/components/product/Edit'
import ProductDetail from '@/components/product/Detail'
import ImageIndex from '@/components/image/Index'
import ImageList from '@/components/image/List'
import ImageAdd from '@/components/image/Add'
import ImageEdit from '@/components/image/Edit'
import PropertyIndex from '@/components/property/Index'
import VariantIndex from '@/components/variant/Index'
import VariantList from '@/components/variant/List'
import VariantAdd from '@/components/variant/Add'
import VariantEdit from '@/components/variant/Edit'
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
      component: ProductEdit,
      children: [
        {
          path: '',
          name: 'ProductDetail',
          component: ProductDetail
        },
        {
          path: 'images',
          component: ImageIndex,
          children: [
            {
              path: '',
              name: 'ImageList',
              component: ImageList
            },
            {
              path: 'new',
              name: 'ImageAdd',
              component: ImageAdd
            },
            {
              path: ':image_id/edit',
              name: 'ImageEdit',
              component: ImageEdit
            }
          ]
        },
        {
          path: 'property',
          name: 'PropertyIndex',
          component: PropertyIndex
        },
        {
          path: 'variant',
          component: VariantIndex,
          children: [
            {
              path: '',
              name: 'VariantList',
              component: VariantList
            }, {
              path: 'new',
              name: 'VariantAdd',
              component: VariantAdd
            },
            {
              path: ':variant_id/edit',
              name: 'VariantEdit',
              component: VariantEdit
            }
          ]
        }
      ]
    }
  ]
})
