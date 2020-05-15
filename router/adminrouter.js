var express = require('express');

var router = express.Router();

var controller = require('../controller/admincontroller')


router.get('/', controller.index);

router.get('/themproductserver', controller.themproductserver);


router.post('/themproductserver', controller.postthemproductserver);

router.get('/themproductnt', controller.themproductnt);

router.get('/donhang', controller.donhang);

router.get('/themproductnt/:id', controller.themproductntcuthe);

router.post('/themproductnt/:id', controller.postthemproductntcuthe);

router.get('/xoant/:id', controller.xoant);

router.get('/productwait', controller.productwait);

router.post('/productwait', controller.postproductwait);


module.exports = router;