var express = require('express');

var router = express.Router();

var controller = require('../controller/searchcontroller')

router.get('/', controller.index);
router.get('/:id', controller.timtrongnt);

module.exports = router;