const express = require('express');
const baseController = require('../controller/base.controller');

const router = express.Router();

router.get('/',baseController.getHome);

router.get('/401',function(req,res){
    res.status(401).render('shared/401')
})
router.get('/403',function(req,res){
    res.status(403).render('shared/403')
})


module.exports = router