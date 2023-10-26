const express = require('express');
const baseController = require('../controller/base.controller');

const router = express.Router();

router.get('/',baseController.getHome);

module.exports = router