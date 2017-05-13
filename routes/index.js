var express = require('express');
var router = express.Router();
var db = require('../model');


/* GET home page. */
router.get('/', function (request, response) {
  response.redirect('/login');

});

router.get('/lobby', function (request, response) {

  response.render('index');

});

router.get('/game', function (request, response) {
  response.render('game');
});

router.get('/login', function (request, response) {
  response.render('login');

});

module.exports = router;

