<template>
    <div class="col-9">
      <portal to="product-header-title">
        <div class="d-flex">
          <router-link tag="h3" class="text-primary" :to="{name:'ProductIndex'}"><a>Product</a></router-link>
          <h3>&nbsp;/&nbsp;</h3>
          <h3 class="text-center m-0">{{ product.name }} New Image</h3>
        </div>
      </portal>
    </div>
</template>

<script>
export default {
  name: 'ImageIndex',
  data () {
    return {
      images: []
    }
  },
  mounted () {
    console.log(this.images.length < 1)
    this.axios.get(this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/images`).then(response => {
      if (typeof response.data !== 'undefined') {
        console.log(response.data)
        this.images = response.data.images
      }
    }).catch(e => {
      console.log(e)
    })
  }
}
</script>

<style scoped>

</style>
