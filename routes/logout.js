var express = require('express');
var router = express.Router();


router.get('/', function (request, response) {
  request.session.destroy(function() {
    console.log("user logged out.")
  });
  response.clearCookie("email");
  response.clearCookie("user_id");
  response.redirect('/login');
});

module.exports = router;