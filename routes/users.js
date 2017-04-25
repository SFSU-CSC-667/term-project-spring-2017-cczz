var express = require('express');
var router = express.Router();
var db = require('../model');

/* GET users listing. */
router.get('/', (request, response) => {

  
  db.getAllUsers().then(function (data) {
  	   
  	response.status(200).send(data);
  	   
  })

  


});


module.exports = router;
