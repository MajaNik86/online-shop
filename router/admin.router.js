const express = require('express');
const adminController = require('../controller/admin.controller')
const router = express.Router();

router.get('/products',adminController.getProducts);

router.get('/products/new',adminController.getNewProduct)


module.exports = router