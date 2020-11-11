<template>
  <div class="mb-4">
    <div class="col-12">
      <form @submit.prevent="create">
        <div class="row border p-3">
          <div class="col-12 border-bottom h5 font-weight-bold pb-2">New Product Property</div>
          <div class="col-6 mt-3">
            <div class="form-group">
              <label for="property">PROPERTY</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.property}" id="property"
                     v-model="property.property_name">
              <div v-if="error && errors.property" class="invalid-feedback">
                {{ errors.property[0] }}
              </div>
            </div>
          </div>
          <div class="col-6 mt-3">
            <div class="form-group">
              <label for="value">VALUE</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.value}" id="value"
                     v-model="property.value">
            </div>
            <div v-if="error && errors.value" class="invalid-feedback">
              {{ errors.value[0] }}
            </div>
          </div>
          <div class="col-12 d-flex align-items-center">
            <button type="submit" class="btn btn-success"><i class="fa fa-check mr-1" aria-hidden="true"></i>Create</button>
            <span class="mx-2">Or</span>
            <router-link :to="{name: 'PropertyList'}" type="button" class="btn btn-outline-dark"><i class="fa fa-times mr-1" aria-hidden="true"></i>Cancel</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import { productMixin } from '../../mixins/product'

export default {
  name: 'PropertyAdd',
  data () {
    return {
      property: {
        property_name: '',
        value: ''
      },
      error: false,
      errors: {}
    }
  },
  mixins: [productMixin],
  methods: {
    create () {
      let property = { ...this.property }
      let url = this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/product_properties?`
      url = this.generateUrlToCreateAndUpdate(url, property, 'product_property')
      this.axios.post(url).then((response) => {
        this.error = false
        this.errors = {}
        if (typeof response.data !== 'undefined') {
          this.$toasted.success('Create Product Property Successfully')
          this.$router.push({name: 'PropertyList'})
        } else {
          this.$toasted.error('Create Product Property Fail')
        }
      }).catch((e) => {
        this.error = true
        if (typeof e.response.data.errors !== 'undefined') {
          this.errors = e.response.data.errors
          this.error = true
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
