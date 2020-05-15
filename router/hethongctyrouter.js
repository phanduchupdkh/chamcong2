var express = require('express');

var router = express.Router();

var controller = require('../controller/hethongctycontroller');


router.get('/', controller.hethongcty);


module.exports = router;