'use strict';

var db = require( '../db' );


module.exports = {

  /* USERS */
  createUser: function(){
    return db.one('INSERT INTO users VALUES (username, email, password)');
  }, 

  getAllUsers: function () {
    return db.any( 'SELECT * FROM users' );
  },

  getUserById: function ( id ) {
  	return db.one( 'SELECT * FROM users WHERE id = $1', id );
  },

  verifyUserByEmailAndPassword: function ( email, password ) {
    return db.one( 'SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
  },

  getUserByUsername: function(email) {
  	return db.one('SELECT * FROM users WHERE username = $1', email);
  }, 

  /* ROOMS */
  getAllRooms: function() {
  	return db.any('SELECT * FROM rooms'); 
  },

  getRoomById: function(id) {
    return db.one('SELECT * FROM rooms WHERE id = $1', id); 
  },

  updateRoomById: function(id, numOfPlayer) {
    return db.any('UPDATE rooms SET player_amount = $1 WHERE id = $2', numOfPlayer, id); 
  },

  /* ROUNDS */
  getAllRounds: function(){
    return db.any( 'SELECT * FROM rounds' );
  },

  getRoundById: function(id) {
    return db.one( 'SELECT * FROM rounds WHERE id = $1', id );
  }

//  createRound: function ( roomId, allBet, currentBet, nextPlayer, activePlayerNumber ) {
//    return db.one( 'INSERT INTO rounds ( room_id, all_bet, current_bet, next_player, active_player_number ) VALUES ( roomId, allBet, currentBet, nextPlayer, activePlayerNumber ) RETURNING *');
//  },

//  updateRoundById: function ( roomId, allBet, currentBet, nextPlayer, activePlayerNumber ) {
//    return db.one( 'UPDATE rounds SET all_bet = $1, current_bet = $2, next_player = $3, active_player_number = $4 WHERE room_id = $2', allBet, currentBet, nextPlayer, activePlayerNumber, roomId );
//  },

  /* MESSAGES */
//  getMessageByRoomId: function ( roomId ) {
//    return db.any( 'SELECT * FROM messages WHERE room_id = $1', roomId );
//  },
//
//  createMessage: function () {
//    return db.one( 'INSERT INTO messages ( user_id, timestamp, content, room_id ) VALUES ( $1, $2, $3, $4 ) RETURNING *');
//  },

};

