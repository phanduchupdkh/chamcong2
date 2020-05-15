var express = require('express');
var router = express.Router();

var controller = require('../controller/dangkycontroller.js');


router.get('/',controller.dangky);

router.post('/',controller.postDangky);

module.exports = router;