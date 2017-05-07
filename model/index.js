'use strict';

var db = require('../db');


module.exports = {
  getAllUsers: function () {
    return db.any('SELECT * FROM users');
  },

  getUserById: function (id) {
  	return db.one('SELECT * FROM users WHERE id = $1', id);
  },

<<<<<<< HEAD
  getAllRooms: function() {
  	return db.any('SELECT * FROM rooms'); 
=======
  getAllRooms: function () {
  	return db.any('SELECT * FROM rooms');
>>>>>>> 290a15c598330bfc05bcd1df02951ea85c268dfa
  }
};