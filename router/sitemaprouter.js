var express = require('express');

var router = express.Router();

var controller = require('../controller/sitemapcontroller')

router.get('/trangchu.xml', controller.index);

router.get('/:id', controller.nhathuoc);

module.exports = router;