var express = require('express');
var router = express.Router();


router.get('/', function (request, response) {
  if (!request.session.user_id) { //not login
    response.render('login');
  } else {
    response.redirect('/lobby');
  }
});

module.exports = router;