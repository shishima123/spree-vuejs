export const productMixin = {
  methods: {
    /**
     * Method used to generate api url to create or update product
     *
     *
     * @returns {string} api url to create or update product
     * @param baseUrl
     * @param productObj
     */
    generateUrlToCreateAndUpdate (baseUrl, productObj) {
      Object.keys(productObj).forEach((key) => {
        let value = productObj[key]
        if (value !== null) {
          baseUrl += `product[${key}]=${productObj[key]}&`
        }
      })
      return baseUrl.slice(0, -1)
    }
  }
}
