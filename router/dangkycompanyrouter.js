var express = require('express');
var router = express.Router();

var controller = require('../controller/company/dangkycompanycontroller.js');


router.get('/',controller.dangky);

router.post('/',controller.postDangky);

module.exports = router;