<template>
  <div class="container">
    <product-header/>
    <portal to="product-header-title">
      <div class="d-flex">
        <h3 class="text-center m-0">Products</h3>
      </div>
    </portal>
    <portal to="product-header-button">
      <router-link :to="{name:'ProductAdd'}" class="btn btn-success"><i class="fa fa-plus mr-1" aria-hidden="true"></i>New
        Product
      </router-link>
    </portal>
    <div class="row">
      <div class="col-12">
        <p v-if="state === constants.DATA_NOT_FOUND">No data found.</p>
        <p v-if="state === constants.LOADING">Loading ...</p>
        <table class="table table-striped table-bordered table-hover" v-if="state === constants.LOADED_SUCCESS">
          <thead>
          <tr>
            <th scope="col" class="text-center">Sku</th>
            <th scope="col" class="text-center">Status</th>
            <th scope="col" class="text-center">Name</th>
            <th scope="col" class="text-center">Master Price</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(product) in products" :key="product.id">
            <td>{{ product.master.sku }}</td>
            <td>{{ formatStatus(product.available_on) }}</td>
            <td><img :src="checkImage(product.master.images)" class="mr-4" alt=""><span>{{ product.name }}</span></td>
            <td>{{ product.display_price }}</td>
            <td class="text-center">
              <router-link :to="{name: 'ProductDetail', params: {product_id: product.id}}" class="btn btn-primary mr-3"
                           data-toggle="tooltip" data-placement="bot" title="Edit">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </router-link>
              <button @click="deleteProduct(product.id)" class="btn btn-danger" data-toggle="tooltip"
                      data-placement="top" title="Remove">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ProductHeader from './Header'
import productConstants from '../../constants/product'
import MiniNoImage from '../../assets/images/mini-no-image.png'
import _ from 'lodash'

export default {
  name: 'product.index',
  data () {
    return {
      products: [],
      state: productConstants.LOADING,
      constants: productConstants
    }
  },
  methods: {
    formatStatus (availableOn) {
      return availableOn !== null ? 'Available' : 'No available date set'
    },
    checkImage (images) {
      let miniUrl = _.get(images, '[0].mini_url')
      if (typeof miniUrl !== 'undefined') {
        return miniUrl
      }
      return MiniNoImage
    },
    deleteProduct (productId) {
      this.axios.delete(this.$hostServer + `/api/v1/products/${productId}`).then((response) => {
        this.$toasted.success('Delete Product Successfully')
        this.state = productConstants.LOADING
        this.fetchData()
      }).catch(e => {
        this.$toasted.error('Delete Fail')
      })
    },
    fetchData () {
      this.axios.get(this.$hostServer + '/api/v1/products?q[s]=id%20desc').then((response) => {
        let data = response.data
        if (typeof data !== 'undefined') {
          this.products = data.products
          if (data.products.length > 0) {
            this.state = this.constants.LOADED_SUCCESS
          } else {
            this.state = this.constants.DATA_NOT_FOUND
          }
        }
      }).catch((e) => {
        this.state = this.constants.DATA_NOT_FOUND
      })
    }
  },
  created () {
    this.fetchData()
  },
  components: {
    ProductHeader
  }
}
</script>

<style>

</style>
