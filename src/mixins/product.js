export const productMixin = {
  computed: {
    storeProduct () {
      return this.$store.state.product.product
    }
  },
  methods: {
    /**
     * Method used to generate api url to create or update product
     *
     *
     * @returns {string} api url to create or update product
     * @param baseUrl
     * @param productObj
     * @param type
     */
    generateUrlToCreateAndUpdate (baseUrl, productObj, type) {
      Object.keys(productObj).forEach((key) => {
        let value = productObj[key]
        if (value !== null) {
          baseUrl += `${type}[${key}]=${productObj[key]}&`
        }
      })
      return baseUrl.slice(0, -1)
    }
  }
}
