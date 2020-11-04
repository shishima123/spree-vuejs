<template>
  <div>
    <portal to="product-header-button">
      <router-link :to="{name:'ImageAdd'}" class="btn btn-success"><i class="fa fa-plus mr-1" aria-hidden="true"></i>New
        Image
      </router-link>
    </portal>
    <div class="row">
      <div class="col-12">
        <div v-if="state === constants.DATA_NOT_FOUND" class="alert alert-warning" role="alert">
          No Image found.
        </div>
        <table class="table table-striped table-bordered table-hover" v-if="state === constants.LOADED_SUCCESS">
          <thead>
          <tr>
            <th scope="col" class="text-center">THUMBNAIL</th>
            <th scope="col" class="text-center">ALTERNATIVE TEXT</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(image) in images" :key="image.id">
            <td class="text-center"><img :src="checkImage(image.mini_url)" alt=""></td>
            <td>{{ image.alt }}</td>
            <td class="text-center">
              <router-link :to="{ name:'ImageEdit', params: {image_id: image.id}}" class="btn btn-primary mr-3"
                 data-toggle="tooltip" data-placement="bot" title="Edit">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </router-link>
              <button @click="deleteImage(image.id)" class="btn btn-danger" data-toggle="tooltip"
                      data-placement="top" title="Remove">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../../constants/constants'
import MiniNoImage from '../../assets/images/mini-no-image.png'

export default {
  name: 'list',
  data () {
    return {
      product_id: this.$route.params.product_id,
      images: [],
      state: Loading.LOADING,
      constants: Loading
    }
  },
  methods: {
    checkImage (images) {
      if (typeof images !== 'undefined') {
        return images
      }
      return MiniNoImage
    },
    deleteImage (imageId) {
      this.axios.delete(this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/images/${imageId}`).then((response) => {
        this.$toasted.success('Delete Product Successfully')
        this.fetchData()
      }).catch(e => {
        this.$toasted.error('Delete Fail')
      })
    },
    fetchData () {
      this.axios.get(this.$hostServer + `/api/v1/products/${this.$route.params.product_id}/images`).then(response => {
        if (typeof response.data !== 'undefined' && response.data.images.length > 0) {
          this.images = response.data.images
          this.state = this.constants.LOADED_SUCCESS
        } else {
          this.state = this.constants.DATA_NOT_FOUND
        }
      }).catch(e => {
        this.state = this.constants.DATA_NOT_FOUND
      })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>

</style>
