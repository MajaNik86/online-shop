const Order = require("../model/order.model");
const User = require("../model/user.model");

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAllOrdersForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    return next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart; //getting access to our cart
  //we want to transform cart data into order data which we store in a new stand alone collection so we need a model
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null; //clear cart

  res.redirect("/orders");
}
module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};
