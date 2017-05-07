var express = require('express');
var router = express.Router();
var db = require('../model');


/* GET home page. */
router.get('/', function (request, response) {
  response.render('index');

});

router.get('/game', function (request, response) {
  response.render('game');

});


module.exports = router;

