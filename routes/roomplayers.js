var express = require('express');
var router = express.Router();
var db = require('../model');


/* GET roomplayerby user id */
router.get('/:id', function (req, res, next) {
  db.getRoomPlayerByID(parseInt(req.params.id)).then(function (data) {
    res.status(200).send(data);
  })
});

router.get('/roomid/:id', function (req, res, next) {
  db.getRoomPlayerByRoomID(parseInt(req.params.id)).then(function (data) {
    res.status(200).send(data);
  })
});

module.exports = router;