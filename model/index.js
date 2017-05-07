'use strict';

var db = require('../db');


module.exports = {
  getAllUsers: function () {
    return db.any('SELECT * FROM users');
  },

  getUserById: function (id) {
  	return db.one('SELECT * FROM users WHERE id = $1', id);
  },

  getAllRooms: function () {
    return db.any('SELECT * FROM rooms');
    },

  getMessageByRoomId: function ( id ) {
    return db.one('SELECT * FROM messages WHERE id = $1', id);
  },

//  createRound: function () {
//    return db.one( 'INSERT INTO rounds ( id, room_id, all_bet, current_bet, next_player, active_player_number) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *');
//  },
 }
