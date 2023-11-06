const express = require('express');
const cartController = require('../controller/cart.controller');

const router = express.Router();

router.post('/items',cartController.addCartItem )


module.exports=router;