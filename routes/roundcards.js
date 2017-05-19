var express = require('express');
var router = express.Router();
var db = require('../model');


/* GET home page. */
router.get('/', function (request, response){
  db.getAllCards().then(function (data) {   
  	response.status(200).send(data);   
  })
});



module.exports = router;