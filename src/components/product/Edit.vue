<template>
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-between py-3">
          <div class="d-flex">
            <router-link tag="h3" class="text-primary" :to="{name:'ProductIndex'}"><a>Product</a></router-link>
            <h3>&nbsp;/&nbsp;</h3>
            <h3 class="text-center m-0">{{ product.name }}</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <router-view></router-view>
        <div class="col-3">
          <div class="list-group">
            <router-link :to="{name: 'ProductDetail'}" class="list-group-item list-group-item-action" active-class="active" exact><i class="fa fa-pencil mr-1" aria-hidden="true"></i>Details</router-link>
            <router-link :to="{name: 'ImageIndex'}" class="list-group-item list-group-item-action" active-class="active"><i class="fa fa-file-image-o mr-1" aria-hidden="true"></i>Images</router-link>
            <a href="#" class="list-group-item list-group-item-action"><i class="fa fa-th-large mr-1" aria-hidden="true"></i>Variants</a>
            <a href="#" class="list-group-item list-group-item-action"><i class="fa fa-list-alt mr-1" aria-hidden="true"></i>Properties</a>
            <a href="#" class="list-group-item list-group-item-action"><i class="fa fa-home mr-1" aria-hidden="true"></i>Stock</a>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Select2 from 'v-select2-component'
import '@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.min.css'

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
      prototypeOption: [],
      shippingCategoryOption: [{id: 0, text: 'None'}, {id: 1, text: 'Default'}],
      error: false,
      errors: {}
    }
  },
  methods: {
    update () {
      let url = this.$hostServer + `/api/v1/products/${this.$route.params.product_id}?`
      Object.keys(this.product).forEach((key) => {
        let value = this.product[key]
        if (value !== '') {
          url += `product[${key}]=${this.product[key]}&`
        }
      })
      url = url.slice(0, -1)
      this.axios.put(url).then((response) => {
        this.error = false
        this.errors = {}
        if (typeof response.data !== 'undefined') {
          this.$toasted.success('Update Product Successfully')
          this.$router.push({name: 'ProductIndex'})
        } else {
          this.$toasted.error('Update Product Fail')
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
    },
    filterObjectInObject (data, allowed) {
      return Object.keys(data)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: data[key]
          }
        }, {})
    }
  },
  created () {
    this.axios.get(this.$hostServer + '/api/v1/products/' + this.$route.params.product_id).then(response => {
      let product = response.data
      const allowed = ['name', 'price', 'available_on', 'shipping_category_id']
      this.product = this.filterObjectInObject(product, allowed)
      this.product.sku = product.master.sku
    })
  },
  components: {
    Datepicker,
    Select2
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
