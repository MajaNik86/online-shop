const Product = require("../model/product.model");

async function getAllProducts(req, res, error) {
  try {
    const products = await Product.findAll();
    res.render("customer/products/all-products", { products: products });
  } catch (error) {
    next(error);
  }
}

async function getProductDetails(req, res, next) {
   try {
     const product = await Product.findById(req.params.id);
       res.render('customer/products/product-details',{product:product})
   } catch (error) {
     return next(error);
   }
 }

module.exports = { getAllProducts: getAllProducts , getProductDetails:getProductDetails};
