<template>
    <div class="container">
      <product-header/>
      <portal to="product-header-title">
        <div class="d-flex">
          <router-link tag="h3" class="text-primary" :to="{name:'ProductIndex'}"><a>Product</a></router-link>
          <h3>&nbsp;/&nbsp;</h3>
          <h3 class="text-center m-0">{{ product.name }}</h3>
        </div>
      </portal>
      <portal to="product-header-button" v-if="usePortal">
        <router-link :to="{name:'ProductAdd'}" class="btn btn-success">
          <i class="fa fa-plus mr-1" aria-hidden="true"></i>
          New Products
        </router-link>
      </portal>
      <div class="row">
        <slide-transition>
          <router-view></router-view>
        </slide-transition>
        <div class="col-3">
          <div class="list-group">
            <router-link :to="{name: 'ProductDetail'}" class="list-group-item list-group-item-action" active-class="active" exact><i class="fa fa-pencil mr-1" aria-hidden="true"></i>Details</router-link>
            <router-link :to="{name: 'ImageList'}" class="list-group-item list-group-item-action" active-class="active"><i class="fa fa-file-image-o mr-1" aria-hidden="true"></i>Images</router-link>
            <router-link :to="{name: 'VariantIndex'}" class="list-group-item list-group-item-action" active-class="active"><i class="fa fa-th-large mr-1" aria-hidden="true"></i>Variants</router-link>
            <router-link :to="{name: 'PropertyIndex'}" class="list-group-item list-group-item-action" active-class="active"><i class="fa fa-list-alt mr-1" aria-hidden="true"></i>Properties</router-link>
            <router-link :to="{name: 'StockIndex'}" class="list-group-item list-group-item-action" active-class="active"><i class="fa fa-home mr-1" aria-hidden="true"></i>Stock</router-link>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import ProductHeader from './Header'
import SlideTransition from '../utils/slide-transition'

export default {
  name: 'product.edit',
  computed: {
    product () {
      return this.$store.state.product
    },
    usePortal () {
      return this.$route.name === 'ProductDetail'
    }
  },
  components: {
    SlideTransition,
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
