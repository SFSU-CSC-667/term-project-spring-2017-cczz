'use strict';

var db = require( '../db' );


module.exports = {
  getAllUsers: function () {
    return db.any( 'SELECT * FROM users' );
  },

  getUserById: function ( id ) {
  	return db.one( 'SELECT * FROM users WHERE id = $1', id );
  },

  createUser: function (req) {
  	db.none('INSERT INTO users(username,email, password)' +
  	 'VALUES (${username}, ${email}, ${password})', req.body);
    return db.one('SELECT * FROM users WHERE email = $1', req.body.email)
  },

  getAllRooms: function () {
    return db.any( 'SELECT * FROM rooms' );
    },

  getMessageByRoomId: function ( id ) {
    return db.one( 'SELECT * FROM messages WHERE id = $1', id );
  },

  verifyUserByEmailAndPassword: function ( email, password ) {
    return db.one( 'SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
  }
//  createRound: function () {
//    return db.one( 'INSERT INTO rounds ( id, room_id, all_bet, current_bet, next_player, active_player_number) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *');
//  },
 }
