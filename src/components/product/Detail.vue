<template>
    <div class="col-9 row">
      <div class="col-9">
        <div class="form-group">
          <label for="name">NAME *</label>
          <input type="text" class="form-control" :class="{ 'is-invalid':errors.name}" id="name" v-model="product.name"
                 required>
          <div v-if="error && errors.name" class="invalid-feedback">
            {{ errors.name[0] }}
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-12">
            <label for="sku">SLUG *</label>
            <input type="text" :class="{ 'is-invalid':errors.sku}" class="form-control" id="sku" v-model="product.sku">
            <div v-if="error && errors.sku" class="invalid-feedback">
              {{ errors.sku[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-12">
            <label for="sku">DESCRIPTION *</label>
            <textarea type="text" rows="20" :class="{ 'is-invalid':errors.sku}" class="form-control" id="sku"
                      v-model="product.sku"></textarea>
            <div v-if="error && errors.sku" class="invalid-feedback">
              {{ errors.sku[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="price">MASTER PRICE *</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="price">COST PRICE</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="price">COST CURRENCY</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="price">AVAILABLE ON</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="price">DISCONTINUE ON</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="price">PROMOTABLE</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="price">MASTER SKU</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="price">WEIGHT</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="price">HEIGHT</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="price">WIDTH</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="price">DEPTH</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="shippingCategory">SHIPPING CATEGORY</label>
            <Select2 id="shippingCategory" :class="{ 'is-invalid':errors.shipping_category}"
                     v-model="product.shipping_category_id" :settings="{ theme: 'bootstrap4' }"
                     :options="shippingCategoryOption" required/>
            <div v-if="error && errors.shipping_category" class="invalid-feedback">
              {{ errors.shipping_category[0] }}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="taxCategory">TAX CATEGORY</label>
            <Select2 id="taxCategory" :class="{ 'is-invalid':errors.shipping_category}"
                     v-model="product.shipping_category_id" :settings="{ theme: 'bootstrap4' }"
                     :options="shippingCategoryOption" required/>
            <div v-if="error && errors.shipping_category" class="invalid-feedback">
              {{ errors.shipping_category[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="taxCategory">TAXONS</label>
            <Select2 id="taxCategory" :class="{ 'is-invalid':errors.shipping_category}"
                     v-model="product.shipping_category_id" :settings="{ theme: 'bootstrap4' }"
                     :options="shippingCategoryOption" required/>
            <div v-if="error && errors.shipping_category" class="invalid-feedback">
              {{ errors.shipping_category[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="taxCategory">OPTION TYPES</label>
            <Select2 id="taxCategory" :class="{ 'is-invalid':errors.shipping_category}"
                     v-model="product.shipping_category_id" :settings="{ theme: 'bootstrap4' }"
                     :options="shippingCategoryOption" required/>
            <div v-if="error && errors.shipping_category" class="invalid-feedback">
              {{ errors.shipping_category[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="taxCategory">TAGS</label>
            <Select2 id="taxCategory" :class="{ 'is-invalid':errors.shipping_category}"
                     v-model="product.shipping_category_id" :settings="{ theme: 'bootstrap4' }"
                     :options="shippingCategoryOption" required/>
            <div v-if="error && errors.shipping_category" class="invalid-feedback">
              {{ errors.shipping_category[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="price">META TITLE</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="price">META KEYWORDS</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="price">META DESCRIPTION</label>
            <input type="text" class="form-control" :class="{ 'is-invalid':errors.price}" id="price"
                   v-model="product.price" required>
            <div v-if="error && errors.price" class="invalid-feedback">
              {{ errors.price[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import Select2 from 'v-select2-component'

export default {
  name: 'product-detail',
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

<style scoped>

</style>
