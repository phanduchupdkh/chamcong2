var express = require('express');

var router = express.Router();

var controller = require('../controller/nhathuoc/kenhnhathuoccontroller');


router.get('/', controller.index);

router.get('/sanpham', controller.sanpham); //tpcn
router.post('/sanpham', controller.postSanpham);
router.get('/addmypham', controller.addmypham);//mypham
router.post('/addmypham', controller.postaddmypham);

router.get('/addlist', controller.addlistindex);
router.get('/addlist/:id', controller.addlist);
router.post('/addlist/:id', controller.postListSanpham);

router.get('/thongtin', controller.thongtin);

router.get('/donhang',controller.donhang);
router.get('/xoadon/:id',controller.xoadon);

router.get('/sua/:id',controller.suasp);
router.post('/sua/:id', controller.postsuasp);

router.get('/xoa/:id',controller.xoasp);

router.get('/doimatkhau',controller.doimatkhau);
router.post('/doimatkhau',controller.postdoimatkhau);

router.get('/suathongtin',controller.suathongtin);
router.post('/suathongtin',controller.postsuathongtin);


module.exports = router;