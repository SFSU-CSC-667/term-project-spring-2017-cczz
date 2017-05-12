var express = require('express');
var router = express.Router();
var db = require('../model');

/* GET a specific message id */
router.get('/:id', function(req, res, next) {
	db.getMessageByRoomId(parseInt(req.params.id)).then(function(data) {
		res.status(200).send(data);
	})
});

module.exports = router;