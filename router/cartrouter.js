var express = require('express');

var router = express.Router();

var controller = require('../controller/nhathuoc/cartcontroller');
var controllercty = require('../controller/company/cartctycontroller')


router.post('/add', controller.cart);
router.get('/add', controller.getcart);
router.post('/addto', controller.cartaddto);

router.post('/addcty', controllercty.cart);
router.get('/addcty', controllercty.getcart);
router.post('/addtocty', controllercty.cartaddto);

//router.get('/themproductserver', controller.themproductserver);

module.exports = router;