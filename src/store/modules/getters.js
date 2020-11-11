export default {
  variantData: (state) => {
    return {
      sku: state.product.master.sku,
      price: state.product.master.price,
      cost_price: state.product.master.cost_price,
      weight: state.product.master.weight,
      height: state.product.master.height,
      width: state.product.master.width,
      depth: state.product.master.depth
    }
  }
}
