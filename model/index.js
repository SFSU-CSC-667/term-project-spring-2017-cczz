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
  	//console.log(username)
  	//console.log(req.body.username);
  	//return db.none('INSERT INTO users(username, email, password) VALUES (\'t2\', \'t2@h\', \'123\')');
  	return db.none('INSERT INTO users(username,email, password)' +
  	 'VALUES (${username}, ${email}, ${password})', req.body);
  	 //return db.none('INSERT INTO users(username, email, password) VALUES ($1, $2, $3)', [username, email, password] );
  },

  getAllRooms: function () {
  	return db.any('SELECT * FROM rooms');
  }
};