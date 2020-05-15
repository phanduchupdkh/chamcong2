var express = require('express');
var router = express.Router();


var controller = require('../controller/dangnhapcontroller.js')

router.get('/login', controller.login);
router.post('/login',controller.postLogin);

router.get('/logincompany', controller.logincompany);
router.post('/logincompany',controller.postLogincompany);

module.exports = router;