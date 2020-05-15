var express = require('express');

var router = express.Router();

var controller = require('../controller/company/showproductscontroller');


router.get('/:id', controller.showproductscongty);

router.get('/:id/:sp', controller.showproductcongty);

module.exports = router;