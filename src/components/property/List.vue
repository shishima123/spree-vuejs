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
              <td class="text-center">{{ product_property.property_name }}</td>
              <td class="text-center">{{ product_property.value }}</td>
              <td class="text-center">
                <router-link :to="{ name:'PropertyEdit', params: {property_id: product_property.id}}" class="btn btn-primary mr-3"
                             data-toggle="tooltip" data-placement="bot" title="Edit">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </router-link>
                <button v-if="product_property.id !== undefined" @click="deleteProductProperty(product_property.id)" class="btn btn-danger" data-toggle="tooltip"
                        data-placement="top" title="Remove">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../../constants/constants'
import {productMixin} from '../../mixins/product'
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
  mixins: [productMixin],
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
  }
}
</script>

<style scoped>

</style>
