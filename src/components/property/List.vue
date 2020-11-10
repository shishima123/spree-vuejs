<template>
  <div>
    <portal to="product-header-button">
      <router-link :to="{name: 'PropertyAdd'}" class="btn btn-success"><i class="fa fa-plus mr-1" aria-hidden="true"></i>New
        Property
      </router-link>
    </portal>
    <div class="row">
      <div class="col-12">
        <p v-if="state === constants.LOADING" class="d-flex justify-content-center align-items-center loading-product">
          <spinner />
        </p>
        <form @submit.prevent="create">
          <table class="table table-striped table-bordered table-hover" v-if="state === constants.LOADED_SUCCESS">
            <thead>
            <tr>
              <th scope="col" class="text-center">PROPERTY</th>
              <th scope="col" class="text-center">VALUE</th>
              <th scope="col" class="text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(product_property) in product_properties" :key="product_property.id">
              <td class="text-center">
                <input type="text" class="form-control" :value="product_property.property_name">
              </td>
              <td class="text-center">
                <input type="text" class="form-control" :value="product_property.value">
              </td>
              <td class="text-center">
                <button v-if="product_property.id !== undefined" @click="deleteProductProperty(product_property.id)" class="btn btn-danger" data-toggle="tooltip"
                        data-placement="top" title="Remove">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          <button type="submit" class="btn btn-success"><i class="fa fa-check mr-1" aria-hidden="true"></i>Create</button>
          <span class="mx-2">Or</span>
          <router-link :to="{name: 'ProductIndex'}" class="btn btn-outline-dark"><i class="fa fa-times mr-1" aria-hidden="true"></i>Cancel</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../../constants/constants'
export default {
  name: 'PropertyList',
  data () {
    return {
      product_id: this.$route.params.product_id,
      product_properties: [],
      state: Loading.LOADING,
      constants: Loading
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    }
  },
  methods: {
    deleteProductProperty (productPropertyId) {
      this.axios.delete(this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/product_properties/${productPropertyId}`).then((response) => {
        this.$toasted.success('Delete Product Property Successfully')
        this.fetchData()
      }).catch(e => {
        this.$toasted.error('Delete Fail')
      })
    },
    fetchData () {
      this.axios.get(this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/product_properties`).then(response => {
        if (typeof response.data !== 'undefined' && response.data.product_properties.length > 0) {
          this.product_properties = response.data.product_properties
          this.state = this.constants.LOADED_SUCCESS
        }
      }).catch(e => {
        this.state = this.constants.DATA_NOT_FOUND
      })
    }
  },
  created () {
    this.fetchData()
    this.$store.dispatch('fetchProduct')
  }
}
</script>

<style scoped>

</style>
