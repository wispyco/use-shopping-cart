const validateCartItems = (inventorySrc, cartDetails) => {
  console.log('in the server utils')
  const validatedItems = []
  for (const sku in cartDetails) {
    const product = cartDetails[sku]
    const inventoryItem = inventorySrc.find(
      (currentProduct) => currentProduct.sku === sku
    )
    if (!inventoryItem) throw new Error(`Product ${sku} not found!`)
    const item = {
      name: inventoryItem.name,
      amount: inventoryItem.price,
      currency: inventoryItem.currency,
      quantity: product.quantity
    }
    if (inventoryItem.description) item.description = inventoryItem.description
    if (inventoryItem.image) item.images = [inventoryItem.image]
    validatedItems.push(item)
  }

  return validatedItems
}

module.exports = {
  validateCartItems
}
