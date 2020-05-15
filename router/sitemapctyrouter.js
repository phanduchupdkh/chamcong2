var express = require('express');

var router = express.Router();

var controller = require('../controller/sitemapctycontroller')

router.get('/:id',controller.congty);

module.exports = router;