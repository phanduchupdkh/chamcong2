var express = require('express');

var router = express.Router();

var controller = require('../controller/aboutcontroller')

router.get('/gioithieu', controller.gioithieu);

router.get('/chinhsachbaomat', controller.chinhsachbaomat);
router.get('/dieukhoansudung', controller.dieukhoansudung);
router.get('/huongdanmuahang', controller.huongdanmuahang);
router.get('/chinhsachdoitra', controller.chinhsachdoitra);
router.get('/cauhoithuonggap', controller.cauhoithuonggap);

module.exports = router;