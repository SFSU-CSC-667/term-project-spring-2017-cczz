var express = require('express');
var router = express.Router();
var db = require('../model');


router.post( '/', function( request, response, next ) {
  console.log( request.body.email );
  console.log( request.body.password );
	db.verifyUserByEmailAndPassword( request.body.email, request.body.password )
	  .then( function( data ) {
	    //request.session.user = request.body.email;
	    response.cookie('email', request.body.email);
      response.redirect('/lobby');
  	})
  	.catch( function( error ) {
  	  console.log( error );
  	  response.redirect('/login');
  	  response.status( 200 ).send( "no matched email and password" );

  	})
});


module.exports = router;