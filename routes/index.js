var express = require('express');
var router = express.Router();
var db = require('../model');


/* GET home page. */
router.get('/', function (request, response) {
  response.redirect('/login');

});


module.exports = router;

