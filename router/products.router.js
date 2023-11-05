const express = require('express');
const productsController = require('../controller/products.controller')
const router = express.Router();

router.get('/products',productsController.getAllProducts)


module.exports = router 