const Cart = require("../model/cart.model");
//its job is looking at the incoming request and determining wheather it is comming from a user who already has a cart or who doesnt have it yet, either way the cart should then be initialized correctly

function initializeCart(req, res, next) {
  let cart;
  if (!req.session.cart) {
    cart = new Cart();
  }else{
    const sessionCart = req.session.cart;
    cart = new Cart(sessionCart.items,sessionCart.totalQuantity,sessionCart.totalPrice);
    
  }
  res.locals.cart = cart;
  next();
}

module.exports = initializeCart;
