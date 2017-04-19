var express = require('express');
var router = express.Router();
var db = require('../model');

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.getAllUsers().then(function(data) {
		res.status(200).send(data);
	})
});

/* GET a specific user id */
rouer.get('/:id', function(req, res, next) {
	db.getUserById(req.params.id).then(function(data)) {
		res.status(200).send(data);
	}
})

/* create a user id */
router.post('/', function(req, res, next) {
	db.createUser().then(function(data)) {
		res.status(200).send(data);
	}
})

/* update a user by id */
router.put('/', function(req, res, next) {
	db.updataUser(req.params.id).then(function(data)) {
		res.status(200).sned(data);
	}
})

/* DELETE a user */
router.delete('/:id', function(req, res, next) {
	db.deleteUser(req.params.id).then(function(data)) {
		res.status(200)
			.json({
				status: 'success',
				message: 'Removed one user'
			});
	}
})

module.exports = router;
