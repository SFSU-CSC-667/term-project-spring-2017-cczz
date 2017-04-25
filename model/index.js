'use strict';

var db = require('../db');


module.exports = {
  getAllUsers: function () {
    return db.any('SELECT * FROM users');
  },

  getUserById: function (id) {
  	return db.one('SELECT * FROM users WHERE id = $1', id);
  },

  getMessageByRoomId: function (id) {
    return db.one('SELECT * FROM messages WHERE room_id = $1', id)
  }
};