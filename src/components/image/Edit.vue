<template>
  <div class="col-12">
    <portal to="product-header-title">
      <div class="d-flex">
        <router-link tag="h3" class="text-primary" :to="{name:'ProductIndex'}"><a>Product</a></router-link>
        <h3>&nbsp;/&nbsp;</h3>
        <h3 class="text-center m-0">{{ storeProduct.name }}</h3>
      </div>
    </portal>
    <portal to="product-header-button">
      <div></div>
    </portal>
    <form @submit.prevent="update" class="p-3 border">
      <div class="row">
        <div class="col-md-4 d-flex justify-content-center">
          <div class="form-group text-center">
            <label>THUMBNAIL</label>
            <div>
              <img :src="img_url" alt="" width="120">
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="image">FILENAME</label>
            <input type="file" class="form-control-file" id="image" @change="onImageChange">
          </div>
          <div class="form-group">
            <label for="variant">VARIANT</label>
            <multiselect v-model="image.viewable_id"
                         id="variant"
                         label="name"
                         track-by="id"
                         open-direction="bottom"
                         :options="variantOptions"
                         :searchable="true"
                         :show-labels="false">
            </multiselect>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="form-group">
            <label for="alt_text">ALTERNATIVE TEXT</label>
            <textarea v-model="image.alt" type="text" class="form-control" id="alt_text" rows="4"></textarea>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-success"><i class="fa fa-check mr-1" aria-hidden="true"></i>Update</button>
      <span class="mx-2">Or</span>
      <router-link :to="{ name: 'ImageList'}" class="btn btn-outline-dark"><i class="fa fa-times mr-1" aria-hidden="true"></i>Cancel</router-link>
    </form>
  </div>
</template>

<script>
import {productMixin} from '../../mixins/product'
export default {
  name: 'Edit',
  data () {
    return {
      image: {
        attachment: ''
      },
      img_url: '',
      variantOptions: [{id: this.$route.params.product_id, name: 'ALL'}]
    }
  },
  mixins: [productMixin],
  methods: {
    onImageChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) { return }
      this.image.attachment = files[0]
    },
    update () {
      let data = new FormData()
      if (this.image.attachment !== '') {
        data.append('image[attachment]', this.image.attachment)
      }
      data.append('image[alt]', this.image.alt)
      data.append('image[viewable_id]', this.image.viewable_id[0].id)
      this.axios.put(this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/images/${this.$route.params.image_id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (typeof response.data !== 'undefined') {
          this.$toasted.success('Image has been successfully updated!')
          this.$router.push({name: 'ImageList'})
        } else {
          this.$toasted.error('Update Image Fail.')
        }
      }).catch(e => {
        this.$toasted.error('Update Image Fail.')
      })
    }
  },
  mounted () {
    this.axios.get(this.$hostServer + `/api/v1/products/16/images/${this.$route.params.image_id}`)
      .then(response => {
        if (typeof response.data !== 'undefined') {
          let image = response.data
          let selectedOption = this.variantOptions.filter(x => image.viewable_id === x['id'])
          this.$set(this.image, 'viewable_id', selectedOption)
          this.$set(this.image, 'alt', image.alt)
          this.$set(this, 'img_url', image.product_url)
        }
      }).catch(e => {
        console.log(e)
      })
  }
}
</script>

<style scoped>

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
