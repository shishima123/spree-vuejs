<template>
  <div>
    <portal to="product-header-button">
      <button v-if="!isNewVariant" class="btn btn-success" @click="toggleNewVariant"><i class="fa fa-plus mr-1" aria-hidden="true"></i>New
        Variant
      </button>
    </portal>
    <slide-transition>
      <variant-add v-if="isNewVariant" @toggle:new:variant="toggleNewVariant" @fetch:data="fetchData"></variant-add>
    </slide-transition>
    <div class="row">
      <div class="col-12">
        <div v-if="state === constants.DATA_NOT_FOUND" class="alert alert-warning" role="alert">
          No Variants found -
          <a href="#" @click.prevent="toggleNewVariant">Add One!</a>
        </div>
        <table class="table table-striped table-bordered table-hover" v-if="state === constants.LOADED_SUCCESS">
          <thead>
          <tr>
            <th scope="col" class="text-center">Option</th>
            <th scope="col" class="text-center">Price</th>
            <th scope="col" class="text-center">Sku</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(variant) in variants" :key="variant.id">
            <td class="text-center">{{ variant.options_text}}</td>
            <td class="text-center">${{ variant.price }}</td>
            <td class="text-center">{{ variant.sku }}</td>
            <td class="text-center">
              <router-link :to="{ name:'ImageEdit', params: {image_id: variant.id}}" class="btn btn-primary mr-3"
                           data-toggle="tooltip" data-placement="bot" title="Edit">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </router-link>
              <button @click="deleteVariant(variant.id)" class="btn btn-danger" data-toggle="tooltip"
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
import Loading from '../../constants/constants'
import VariantAdd from './Add'
import SlideTransition from '../utils/slide-transition'
export default {
  name: 'VariantList',
  data () {
    return {
      product_id: this.$route.params.product_id,
      variants: [],
      state: Loading.LOADING,
      constants: Loading,
      isNewVariant: false
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    }
  },
  methods: {
    deleteVariant (variantId) {
      this.axios.delete(this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/variants/${variantId}`).then((response) => {
        this.$toasted.success('Delete Variant Successfully')
        this.fetchData()
      }).catch(e => {
        this.$toasted.error('Delete Fail')
      })
    },
    fetchData () {
      this.state = Loading.LOADING
      this.isNewVariant = false
      this.axios.get(this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/variants`).then(response => {
        if (typeof response.data !== 'undefined' && response.data.variants.length > 0) {
          this.variants = response.data.variants.filter(e => e.option_values.length > 0)
          if (this.variants.length > 0) {
            this.state = this.constants.LOADED_SUCCESS
          } else {
            this.state = this.constants.DATA_NOT_FOUND
          }
        } else {
          this.state = this.constants.DATA_NOT_FOUND
        }
      }).catch(e => {
        this.state = this.constants.DATA_NOT_FOUND
      })
    },
    toggleNewVariant () {
      this.isNewVariant = !this.isNewVariant
    }
  },
  created () {
    this.fetchData()
    this.$store.dispatch('fetchProduct')
  },
  components: {
    VariantAdd,
    SlideTransition
  }
}
</script>

<style scoped>

</style>
