<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-between py-3">
        <div>
          <h3 class="text-center m-0">Product</h3>
        </div>
        <router-link :to="{name:'ProductAdd'}" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i>New Product</router-link>
      </div>
      <div class="col-12">
        <p v-if="state === constants.DATA_NOT_FOUND">No data found.</p>
        <p v-if="state === constants.LOADING">Loading ...</p>
        <table class="table table-striped table-bordered table-hover" v-if="state === constants.LOADED_SUCCESS">
          <thead>
          <tr>
            <th scope="col">Sku</th>
            <th scope="col">Status</th>
            <th scope="col">Name</th>
            <th scope="col">Master Price</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(product,index) in products" :key="index">
            <td>{{ product.master.sku }}</td>
            <td>{{ formatStatus(product.available_on) }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.display_price }}</td>
            <td class="text-center">
              <button class="btn btn-primary" data-toggle="tooltip" data-placement="bot" title="Edit">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
              <button class="btn btn-success mx-3" data-toggle="tooltip" data-placement="top" title="Clone">
                <i class="fa fa-clone" aria-hidden="true"></i>
              </button>
              <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Remove">
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
import productConstants from '../../constants/product'
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
    }
  },
  created () {
    this.axios.get(this.$hostServer + '/api/v1/products').then((response) => {
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
}
</script>

<style>

</style>
