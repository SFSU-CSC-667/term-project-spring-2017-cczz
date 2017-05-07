var express = require('express');
var router = express.Router();
var db = require('../model');

/* GET users listing. */
<<<<<<< HEAD
router.get('/', (request, response) => {  
  db.getAllRooms().then(function (data) { 	   
  	response.status(200).send(data);  	   
=======


router.get('/', function (req, res, next) {
  db.getAllRooms().then(function (data) {
    res.status(200).send(data);
>>>>>>> 290a15c598330bfc05bcd1df02951ea85c268dfa
  })
});

// router.get('/:id', function (req, res, next) {
//   db.getRoomById(id).then(function (data) {
//     res.status(200).send(data);
//   })
  
// });


module.exports = router;
