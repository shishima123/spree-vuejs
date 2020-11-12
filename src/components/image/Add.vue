<template>
    <div class="col-12">
      <portal to="product-header-title">
        <div class="d-flex">
          <router-link tag="h3" class="text-primary" :to="{name:'ProductIndex'}"><a>Product</a></router-link>
          <h3>&nbsp;/&nbsp;</h3>
          <h3 class="text-center m-0">{{ storeProduct.name }} New Image</h3>
        </div>
      </portal>
      <portal to="product-header-button" v-if="!usePortal">
      </portal>
      <form @submit.prevent="create">
        <div class="row border p-3">
          <div class="col-12 border-bottom h5 font-weight-bold pb-2">Add Image</div>
          <div class="col-12 d-flex mt-3">
            <div class="form-group col-md-4">
              <label for="image">FILENAME</label>
              <input type="file" class="form-control-file" id="image" @change="onImageChange">
            </div>
            <div class="form-group col-md-4">
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
            <div class="form-group col-md-4">
              <label for="alt_text">ALTERNATIVE TEXT</label>
              <textarea v-model="image.alt" type="text" class="form-control" id="alt_text"></textarea>
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-success"><i class="fa fa-check mr-1" aria-hidden="true"></i>Create</button>
            <span class="mx-2">Or</span>
            <router-link :to="{ name: 'ImageList'}" class="btn btn-outline-dark"><i class="fa fa-times mr-1" aria-hidden="true"></i>Cancel</router-link>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import { productMixin } from '../../mixins/product'

export default {
  name: 'ImageIndex',
  data () {
    return {
      image: {
        attachment: '',
        viewable_id: '',
        alt: ''
      },
      initialValues: this.$route.params.product_id,
      variantOptions: [{id: this.$route.params.product_id, name: 'ALL'}]
    }
  },
  mixins: [productMixin],
  watch: {
    initialValues: {
      immediate: true,
      handler (values) {
        this.image.viewable_id = this.variantOptions.filter(x => values === x['id'])
      }
    }
  },
  computed: {
    usePortal () {
      return this.$route.name === 'ImageAdd'
    }
  },
  methods: {
    onImageChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) { return }
      this.image.attachment = files[0]
    },
    create () {
      let data = new FormData()
      data.append('image[attachment]', this.image.attachment)
      data.append('image[alt]', this.image.alt)
      data.append('image[viewable_id]', this.image.viewable_id[0].id)
      this.axios.post(this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/images`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (typeof response.data !== 'undefined') {
          this.$toasted.success('Image has been successfully created!')
          this.$router.push({name: 'ImageList'})
        } else {
          this.$toasted.error('Create Image Fail.')
        }
      }).catch(e => {
        this.$toasted.error('Create Image Fail.')
      })
    }
  }
}
</script>

<style scoped>

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
