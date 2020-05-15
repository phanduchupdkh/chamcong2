var express = require('express');

var router = express.Router();

var controller = require('../controller/productcontroller')

router.get('/productsv', controller.productsv);

router.get('/users', controller.users);

module.exports = router;