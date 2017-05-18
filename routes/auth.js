var express = require('express');
var router = express.Router();
var db = require('../model');


router.post( '/', function( request, response, next ) {
  console.log( request.body.email );
  console.log( request.body.password );
	db.verifyUserByEmailAndPassword( request.body.email, request.body.password )
	  .then( function( data ) {
	    request.session.user_id = data.email;
	    response.cookie('email', data.email);
	    response.cookie('user_id', data.id);
	    response.cookie('username', data.username);
      response.redirect('/lobby');
  	})
  	.catch( function( error ) {
  	  console.log( error );
  	  response.redirect('/login');

  	})
});


module.exports = router;