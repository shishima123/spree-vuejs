<template>
  <div class="container">
    <product-header/>
    <portal to="product-header-title">
      <div class="d-flex">
        <router-link tag="h3" class="text-primary" :to="{name:'ProductIndex'}"><a>Product</a></router-link>
        <h3>&nbsp;/&nbsp;</h3>
        <h3 class="text-center m-0">New Product</h3>
      </div>
    </portal>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="create">
          <div class="form-group">
            <label for="name">NAME *</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.name}" id="name" v-model="product.name" required>
            <div v-if="error && errors.name" class="invalid-feedback">
              {{ errors.name[0] }}
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="sku">SKU</label>
              <input type="text" :class="{ 'is-invalid':errors.sku}" class="form-control" id="sku" v-model="product.sku">
              <div v-if="error && errors.sku" class="invalid-feedback">
                {{ errors.sku[0] }}
              </div></div>
            <div class="form-group col-md-4">
              <label for="prototype_id">PROTOTYPE</label>
              <Select2 id="prototype_id" :class="{ 'is-invalid':errors.prototype_id}" v-model="product.prototype_id" :settings="{ theme: 'bootstrap4' }" :options="prototypeOption"/>
              <div v-if="error && errors.prototype_id" class="invalid-feedback">
                {{ errors.prototype_id[0] }}
              </div>
            </div>
            <div class="form-group col-md-4">
              <label for="price">MASTER PRICE *</label>
              <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price" v-model="product.price" required>
              <div v-if="error && errors.price" class="invalid-feedback">
                {{ errors.price[0] }}
              </div></div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label>AVAILABLE ON</label>
              <datepicker @selected="formatDate" :class="{ 'is-invalid':errors.available_on}" v-model="product.available_on" format="yyyy/MM/dd" :bootstrap-styling="true" :readonly="false"></datepicker>
              <div v-if="error && errors.available_on" class="invalid-feedback">
                {{ errors.available_on[0] }}
              </div>
            </div>
            <div class="form-group col-md-4">
              <label for="shippingCategory">SHIPPING CATEGORIES*</label>
              <Select2 id="shippingCategory" :class="{ 'is-invalid':errors.shipping_category}" v-model="product.shipping_category_id" :settings="{ theme: 'bootstrap4' }" :options="shippingCategoryOption" required/>
              <div v-if="error && errors.shipping_category" class="invalid-feedback">
                {{ errors.shipping_category[0] }}
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-success"><i class="fa fa-check mr-1" aria-hidden="true"></i>Create</button>
          <span class="mx-2">Or</span>
          <router-link :to="{ name: 'ProductIndex'}" class="btn btn-outline-dark"><i class="fa fa-times mr-1" aria-hidden="true"></i>Cancel</router-link>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Select2 from 'v-select2-component'
import '@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css'
import ProductHeader from './Header'
export default {
  name: 'product.add',
  data () {
    return {
      product: {
        name: '',
        sku: '',
        price: '',
        available_on: '',
        shipping_category_id: 0
      },
      shippingCategoryOption: [{id: 0, text: 'None'}, {id: 1, text: 'Default'}],
      prototypeOption: [{id: 0, text: 'Shirt'}, {id: 1, text: 'Bag'}, {id: 1, text: 'Mugs'}],
      error: false,
      errors: {}
    }
  },
  methods: {
    create () {
      let url = this.$hostServer + '/api/v1/products?'
      Object.keys(this.product).forEach((key) => {
        let value = this.product[key]
        if (value !== '') {
          url += `product[${key}]=${this.product[key]}&`
        }
      })
      url = url.slice(0, -1)
      this.axios.post(url).then((response) => {
        this.error = false
        this.errors = {}
        if (typeof response.data !== 'undefined') {
          this.$toasted.success('Create Product Successfully')
          this.$router.push({name: 'ProductIndex'})
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
    formatDate (date) {
      if (date) {
        this.product.available_on = this.$moment(date).format('YYYY/MM/DD')
      }
    }
  },
  components: {
    Datepicker,
    Select2,
    ProductHeader
  }
}
</script>

<style>
  .form-control[readonly] {
    background-color: #fff;
  }
  .is-invalid .select2-selection--single {
    border: 1px solid red!important;
  }
</style>
