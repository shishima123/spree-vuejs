<template>
    <div class="col-9">
      <div class="row">
        <div class="col-9">
          <div class="form-group">
            <label for="product_name">NAME *</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.name}" id="product_name" v-model="product['name']"
                   required>
            <div v-if="error && errors.name" class="invalid-feedback">
              {{ errors.name[0] }}
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-12">
              <label for="product_slug">SLUG *</label>
              <input type="text" :class="{ 'is-invalid':errors.slug}" class="form-control" id="product_slug" v-model="product['slug']">
              <div v-if="error && errors.slug" class="invalid-feedback">
                {{ errors.slug[0] }}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-12">
              <label for="product_description">DESCRIPTION *</label>
              <textarea type="text" rows="20" :class="{ 'is-invalid':errors.description}" class="form-control" id="product_description"
                        v-model="product['description']"></textarea>
              <div v-if="error && errors.description" class="invalid-feedback">
                {{ errors.description[0] }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="product_price">MASTER PRICE *</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="product_price"
                     v-model="product['price']" required>
              <div v-if="error && errors.price" class="invalid-feedback">
                {{ errors.price[0] }}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="product_cost_price">COST PRICE</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="product_cost_price"
                     v-model="product['cost_price']">
              <div v-if="error && errors.cost_price" class="invalid-feedback">
                {{ errors.cost_price[0] }}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="product_cost_currency">COST CURRENCY</label>
              <input type="text" class="form-control" id="product_cost_currency"
                     value="USD">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label>AVAILABLE ON</label>
              <datepicker @selected="formatDate" :class="{ 'is-invalid':errors.available_on}" v-model="product['available_on']" format="yyyy/MM/dd" :bootstrap-styling="true" :readonly="false"></datepicker>
              <div v-if="error && errors.available_on" class="invalid-feedback">
                {{ errors.available_on[0] }}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="product_sku">MASTER SKU</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="product_sku"
                     v-model="product['sku']">
              <div v-if="error && errors.sku" class="invalid-feedback">
                {{ errors.sku[0] }}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="product_weight">WEIGHT</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.weight}" id="product_weight"
                     v-model="product['weight']">
              <div v-if="error && errors.weight" class="invalid-feedback">
                {{ errors.weight[0] }}
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="product_height">HEIGHT</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.height}" id="product_height"
                     v-model="product['height']">
              <div v-if="error && errors.height" class="invalid-feedback">
                {{ errors.height[0] }}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="product_width">WIDTH</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.width}" id="product_width"
                     v-model="product['width']">
              <div v-if="error && errors.width" class="invalid-feedback">
                {{ errors.width[0] }}
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="product_depth">DEPTH</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.depth}" id="product_depth"
                     v-model="product['depth']">
              <div v-if="error && errors.depth" class="invalid-feedback">
                {{ errors.depth[0] }}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="product_shipping_category_id">SHIPPING CATEGORY</label>
              <Select2 id="product_shipping_category_id" :class="{ 'is-invalid':errors.shipping_category}"
                       v-model="product['shipping_category_id']" :settings="{ theme: 'bootstrap4' }"
                       :options="shippingCategoryOption"/>
              <div v-if="error && errors.shipping_category" class="invalid-feedback">
                {{ errors.shipping_category[0] }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="product_taxon_ids">TAXONS</label>
              <multiselect v-model="product.taxon_ids"
                           id="product_taxon_ids"
                           label="pretty_name"
                           track-by="id"
                           placeholder="Add a Taxon"
                           open-direction="bottom"
                           :options="taxonsOption"
                           :multiple="true"
                           :searchable="true"
                           :loading="isLoading"
                           :internal-search="false"
                           :clear-on-select="false"
                           :close-on-select="false"
                           :options-limit="300"
                           :show-no-results="false"
                           :hide-selected="true"
                           @search-change="getTaxonsOption">
                <template slot="option" slot-scope="props">
                  <div class="option__desc"><span class="option__title">{{ props.option.pretty_name }}</span></div>
                </template>
                <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
              </multiselect>
              <div v-if="error && errors.taxon_ids" class="invalid-feedback">
                {{ errors.taxon_ids[0] }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="product_option_type_ids">OPTION TYPES</label>
              <multiselect v-model="product.option_type_ids"
                           id="product_option_type_ids"
                           label="name"
                           track-by="id"
                           placeholder="Choosen an option type"
                           open-direction="bottom"
                           :options="optionTypeOption"
                           :multiple="true"
                           :searchable="true"
                           :loading="isLoading"
                           :internal-search="false"
                           :clear-on-select="false"
                           :close-on-select="false"
                           :options-limit="300"
                           :show-no-results="false"
                           :hide-selected="true"
                           @search-change="getOptionTypeOption">
                <template slot="option" slot-scope="props">
                  <div class="option__desc"><span class="option__title">{{ props.option.name }}</span></div>
                </template>
                <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
              </multiselect>
              <div v-if="error && errors.option_type_ids" class="invalid-feedback">
                {{ errors.option_type_ids[0] }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="product_meta_keywords">META KEYWORDS</label>
              <input type="text"
                     class="form-control"
                     :class="{ 'is-invalid':errors.meta_keywords}"
                     id="product_meta_keywords"
                     v-model="product['meta_keywords']">
              <div v-if="error && errors.meta_keywords" class="invalid-feedback">
                {{ errors.meta_keywords[0] }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="product_meta_description">META DESCRIPTION</label>
              <input type="text"
                     class="form-control"
                     :class="{ 'is-invalid':errors.meta_description}"
                     id="product_meta_description"
                     v-model="product['meta_description']">
              <div v-if="error && errors.meta_description" class="invalid-feedback">
                {{ errors.meta_description[0] }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mb-5">
          <button class="btn btn-primary" @click="updateProduct">Update</button>
          <span class="mx-2">Or</span>
          <router-link :to="{ name: 'ProductIndex'}" class="btn btn-outline-dark"><i class="fa fa-times mr-1" aria-hidden="true"></i>Cancel</router-link>
        </div>
      </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Select2 from 'v-select2-component'
import _ from 'lodash'
import { productMixin } from '../../mixins/product'

export default {
  name: 'product-detail',
  data () {
    return {
      product: {},
      prototypeOption: [],
      taxonsOption: [],
      optionTypeOption: [],
      shippingCategoryOption: [{id: 0, text: 'None'}, {id: 1, text: 'Default'}],
      error: false,
      errors: {},
      isLoading: false
    }
  },
  mixins: [productMixin],
  methods: {
    updateProduct () {
      let product = {...this.product}
      product.available_on = this.formatDate(product.available_on)
      product.option_type_ids = _.map(product.option_type_ids, 'id').toString()
      product.taxon_ids = _.map(product.taxon_ids, 'id').toString()
      let url = this.$hostServer + `/api/v1/products/${this.$route.params.product_id}?`
      url = this.generateUrlToCreateAndUpdate(url, product, 'product')
      this.axios.put(url).then((response) => {
        this.error = false
        this.errors = {}
        if (typeof response.data !== 'undefined') {
          this.$toasted.success('Create Product Successfully')
          this.setProduct(response.data)
        } else {
          this.$toasted.error('Create Product Fail')
        }
      }).catch((e) => {
        this.error = true
        if (typeof e.response.data.errors !== 'undefined') {
          this.errors = e.response.data.errors
          this.error = true
        }
      })
    },
    getProductDetail () {
      this.axios.get(this.$hostServer + '/api/v1/products/' + this.$route.params.product_id).then(response => {
        let productResponse = response.data
        this.setProduct(productResponse)
      })
    },
    formatDate (date) {
      if (date) {
        date = this.$moment(date).format('YYYY/MM/DD')
        this.product.available_on = date
      }
      return date
    },
    getTaxonsOption (query = '') {
      this.isLoading = true
      this.axios.get(this.$hostServer + '/api/v1/taxons?q[name_cont]=' + query).then(response => {
        this.taxonsOption = response.data.taxons
        this.isLoading = false
      })
    },
    getOptionTypeOption (query = '') {
      this.isLoading = true
      this.axios.get(this.$hostServer + '/api/v1/option_types?q[name_cont]=' + query).then(response => {
        this.optionTypeOption = response.data
        this.isLoading = false
      })
    },
    getTaxonInClassifications (data) {
      let rs = []
      data.forEach(element => {
        rs.push(element.taxon)
      })
      return rs
    },
    setProduct (productResponse) {
      this.$set(this.product, 'name', productResponse.name)
      this.$set(this.product, 'slug', productResponse.slug)
      this.$set(this.product, 'description', productResponse.description)
      this.$set(this.product, 'price', productResponse.price)
      this.$set(this.product, 'cost_price', productResponse.master.cost_price)
      this.$set(this.product, 'available_on', productResponse.available_on)
      this.$set(this.product, 'sku', productResponse.master.sku)
      this.$set(this.product, 'weight', productResponse.master.weight)
      this.$set(this.product, 'height', productResponse.master.height)
      this.$set(this.product, 'width', productResponse.master.width)
      this.$set(this.product, 'depth', productResponse.master.depth)
      this.$set(this.product, 'shipping_category_id', productResponse.shipping_category_id)
      this.$set(this.product, 'taxon_ids', this.getTaxonInClassifications(productResponse.classifications))
      this.taxonsOption = this.getTaxonInClassifications(productResponse.classifications)
      this.$set(this.product, 'option_type_ids', productResponse.option_types)
      this.$set(this.product, 'meta_keywords', productResponse.meta_keywords)
      this.$set(this.product, 'meta_description', productResponse.meta_description)
    }
  },
  created () {
    this.getTaxonsOption()
    this.getOptionTypeOption()
    this.getProductDetail()
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
