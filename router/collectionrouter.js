var express = require('express');

var router = express.Router();

var controller = require('../controller/collectioncontroller');


router.get('/:cle', controller.collection);


module.exports = router;