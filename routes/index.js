var express = require('express');
var router = express.Router();
var db = require('../model');

/* GET home page. */
router.get('/', ( request, response ) => {
  
  db.getAllUsers().then(function (data) {
  	
  	
    response.render( 'index', {title: data});
    // console.log(data);
  	
  })
  
  

  
});





module.exports = router;

