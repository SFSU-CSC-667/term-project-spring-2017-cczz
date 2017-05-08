var express = require('express');
var router = express.Router();
var db = require('../model');


router.post( '/', function( request, response, next ) {
  console.log( request.body.email );
  console.log( request.body.password );
	db.verifyUserByEmailAndPassword( request.body.email, request.body.password )
	  .then( function( data ) {
  		response.status( 200 ).send( data );
  	})
  	.catch( function( error ) {
  	  console.log( error );
  	  response.status( 200 ).send( "no matched email and password" );
  	})
});


module.exports = router;