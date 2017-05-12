var express = require('express');
var router = express.Router();
var db = require('../model');

/* Create a Round */
router.post('/', function( request, response, next ) {
	db.createRound( request ).then( function( data ) {
		response.status( 200 ).send( data );
	})
})

module.exports = router;