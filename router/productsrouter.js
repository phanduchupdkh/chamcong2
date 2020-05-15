var express = require('express');

var router = express.Router();

var controller = require('../controller/nhathuoc/showproductscontroller');


router.get('/:id', controller.showproductsnhathuoc);

router.get('/:id/:sp', controller.showproductnhathuoc);

module.exports = router;