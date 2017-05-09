'use strict';

var db = require('../db');


module.exports = {
  getAllUsers: function () {
    return db.any('SELECT * FROM users');
  },

  getUserById: function (id) {
  	return db.one('SELECT * FROM users WHERE id = $1', id);
  },

  createUser: function (req) {
  	return db.none('INSERT INTO users(username,email, password)' +
  	 'VALUES (${username}, ${email}, ${password})', req.body);
  },

  getAllRooms: function () {
  	return db.any('SELECT * FROM rooms');
  }
};