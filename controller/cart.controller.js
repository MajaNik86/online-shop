const Product = require("../model/product.model");

async function addCartItem(req, res) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart; // save updated cart back into session


  res.status(201).json({
    message: "cart updated!",
    newTotalItems: cart.totalQuantity, 
  }); 
}

module.exports = {
  addCartItem: addCartItem,
};
