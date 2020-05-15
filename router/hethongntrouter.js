var express = require('express');

var router = express.Router();

var controller = require('../controller/hethongntcontroller');


router.get('/', controller.hethongnt);


module.exports = router;