var express = require('express');
var router = express.Router();
var db = require('../model');

/* GET users listing. */
router.get('/', function (request, response) {
  db.getAllUsers().then(function (data) {
    response.status(200).send(data);
  })
});


/* GET a specific user id */
/*router.get('/:id', function (req, res, next) {
  db.getUserById(parseInt(req.params.id)).then(function (data) {
    res.status(200).send(data);
  })
});*/


/* create a user */
router.post('/', function (req, res, next) {
  console.log(req.body.email);
  db.createUser(req).then(function (data) {
    res.render('login');
  });
});

/* GET a specific userprofile by username */
router.get('/:username', function (req, res, next) {
  db.getUserByUsername(req.params.username).then(function (data) {
    //res.status(200).send(data)
    //var email = data.email
    //console.log(email)
    res.render('userProfile', {userData: data})
    //console.log(data.username)
    //var user = data.username
    //res.render('userprofile', {username: user})
  })
});




module.exports = router;
