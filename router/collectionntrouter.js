var express = require('express');

var router = express.Router();

var controller = require('../controller/nhathuoc/collectionntcontroller');

router.get('/danhmuctpcn/:id', controller.danhmuctpcn);
router.get('/danhmucmypham/:id', controller.danhmucmypham);

router.get('/:id/:cle', controller.collection);




module.exports = router;