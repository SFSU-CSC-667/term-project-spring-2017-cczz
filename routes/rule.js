var express = require('express');
var router = express.Router();
//var db = require('../model');

/* GET rule */
router.get('/', function (request, response, next) {
    response.render('rule')
  })


module.exports = router;
