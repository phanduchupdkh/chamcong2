var express = require('express');

var router = express.Router();

var controller = require('../controller/showproductsvcontroller');

router.get('/:sp', controller.showproductsv);

module.exports = router;