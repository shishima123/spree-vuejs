<template>
  <div class="mb-4">
    <div class="col-12">
      <form @submit.prevent="create">
        <div class="row border p-3">
          <div class="col-12 border-bottom h5 font-weight-bold">New Variant</div>
          <div class="col-6 mt-3">
            <div class="form-group">
              <label for="size">Size</label>
              <multiselect v-model="sizeSelected"
                           id="size"
                           label="presentation"
                           placeholder=""
                           track-by="id"
                           open-direction="bottom"
                           :options="sizeOptions"
                           :searchable="true"
                           :show-labels="false">
              </multiselect>
            </div>
            <div class="form-group">
              <label for="color">Color</label>
              <multiselect v-model="colorSelected"
                           placeholder=""
                           id="color"
                           label="presentation"
                           track-by="id"
                           open-direction="bottom"
                           :options="colorOptions"
                           :searchable="true"
                           :show-labels="false">
              </multiselect>
            </div>
            <div class="form-group">
              <label for="variant_sku">SKU</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.sku}" id="variant_sku"
                     v-model="variant['sku']">
              <div v-if="error && errors.sku" class="invalid-feedback">
                {{ errors.sku[0] }}
              </div>
            </div>
            <div class="form-group">
              <label for="variant_price">PRICE</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="variant_price"
                     v-model="variant['price']">
              <div v-if="error && errors.price" class="invalid-feedback">
                {{ errors.price[0] }}
              </div>
            </div>
            <div class="form-group">
              <label for="variant_cost_price">COST PRICE</label>
              <input type="text" class="form-control" id="variant_cost_price"
                     v-model="variant['cost_price']">
              <div v-if="error && errors.cost_price" class="invalid-feedback">
                {{ errors.cost_price[0] }}
              </div>
            </div>
          </div>
          <div class="col-6 mt-3">
            <div class="form-group">
              <label for="variant_weight">WEIGHT</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.weight}" id="variant_weight"
                     v-model="variant['weight']">
              <div v-if="error && errors.weight" class="invalid-feedback">
                {{ errors.weight[0] }}
              </div>
            </div>
            <div class="form-group">
              <label for="variant_height">HEIGHT</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.height}" id="variant_height"
                     v-model="variant['height']">
              <div v-if="error && errors.height" class="invalid-feedback">
                {{ errors.height[0] }}
              </div>
            </div>
            <div class="form-group">
              <label for="variant_width">WIDTH</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.width}" id="variant_width"
                     v-model="variant['width']">
              <div v-if="error && errors.width" class="invalid-feedback">
                {{ errors.width[0] }}
              </div>
            </div>
            <div class="form-group">
              <label for="variant_depth">DEPTH</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.depth}" id="variant_depth"
                     v-model="variant['depth']">
              <div v-if="error && errors.depth" class="invalid-feedback">
                {{ errors.depth[0] }}
              </div>
            </div>
          </div>
          <div class="col-12 d-flex align-items-center">
            <button type="submit" class="btn btn-success"><i class="fa fa-check mr-1" aria-hidden="true"></i>Create</button>
            <span class="mx-2">Or</span>
            <router-link :to="{name: 'VariantList'}" class="btn btn-outline-dark"><i class="fa fa-times mr-1" aria-hidden="true"></i>Cancel</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Select2 from 'v-select2-component'
import { productMixin } from '../../mixins/product'

export default {
  name: 'VariantEdit',
  data () {
    return {
      variant: {
        sku: '',
        price: '',
        cost_price: '',
        weight: '',
        height: '',
        width: '',
        depth: ''
      },
      sizeSelected: '',
      colorSelected: '',
      sizeOptions: [],
      colorOptions: [],
      error: false,
      errors: {}
    }
  },
  mixins: [productMixin],
  methods: {
    create () {
      let size = this.sizeSelected !== '' ? `&variant[option_value_ids][]=${this.sizeSelected.id}` : ''
      let color = this.colorSelected !== '' ? `&variant[option_value_ids][]=${this.colorSelected.id}` : ''
      let url = this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/variants/${this.$route.params.variant_id}?`
      url = this.generateUrlToCreateAndUpdate(url, this.variant, 'variant')
      url = url + size + color
      this.axios.put(url).then((response) => {
        this.error = false
        this.errors = {}
        if (typeof response.data !== 'undefined') {
          this.$toasted.success('Create Variant Successfully')
          this.$router.push({name: 'VariantList'})
        } else {
          this.$toasted.error('Create Variant Fail')
        }
      }).catch((e) => {
        this.error = true
        this.$toasted.error("Option Value can't be blank")
      })
    },
    setDataVariant (variant) {
      this.variant.sku = variant.sku
      this.variant.price = variant.price
      this.variant.cost_price = variant.cost_price
      this.variant.weight = variant.weight
      this.variant.height = variant.height
      this.variant.width = variant.width
      this.variant.depth = variant.depth

      this.sizeSelected = variant.option_values.filter(e => e.option_type_presentation === 'Size')[0]
      this.colorSelected = variant.option_values.filter(e => e.option_type_presentation === 'Color')[0]
    }
  },
  mounted () {
    this.axios.get(this.$hostServer + `/api/v1/option_values`).then(response => {
      if (typeof response.data !== 'undefined') {
        this.sizeOptions = response.data.filter(e => e.option_type_presentation === 'Size')
        this.colorOptions = response.data.filter(e => e.option_type_presentation === 'Color')
      }
    })
    this.axios.get(this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/variants/${this.$route.params.variant_id}`)
      .then(response => {
        if (typeof response.data !== 'undefined') {
          let variant = response.data
          this.setDataVariant(variant)
        }
      })
  },
  components: {
    Datepicker,
    Select2
  }
}
</script>

<style scoped>

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
