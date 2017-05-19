'use strict';

var db = require( '../db' );


module.exports = {

  /* USERS */
  //createUser: function(){
  //  return db.one('INSERT INTO users VALUES (username, email, password)');
  //},

  getAllUsers: function () {
    return db.any( 'SELECT * FROM users' );
  },

  getUserById: function ( id ) {
  	return db.one( 'SELECT * FROM users WHERE id = $1', id );
  },

  getUserByUsername: function(email) {
    return db.one('SELECT * FROM users WHERE username = $1', email);
  },

  getUserByEmail: function (email) {
    var data = db.one('SELECT * FROM users WHERE email = $1', email);
    console.log(data);
    return data;
  },

  createUser: function (req) {
    return db.none('INSERT INTO users(username,email, password)' +
        'VALUES (${username}, ${email}, ${password})', req.body);
  },

  createDeck: function(room_id, round_id, cards){
     return db.none( 'INSERT INTO card_deck(room_id,round_id, cards)' + 'VALUES ($1, $2, $3)', [room_id,round_id, cards] );
  },

  createRound: function(room_id){
    return db.none('INSERT INTO rounds(room_id)' + 'VALUES($1)', room_id);
  },

  createRoundCard: function(card_id){
    return db.none('INSERT INTO roundCards(card_id)' + 'VALUES($1)', card_id);
  },

  getRoundCards: function(round_id){
    return db.any('SELECT * FROM roundCards WHERE round_id = $1', round_id);
  },

  verifyUserByEmailAndPassword: function ( email, password ) {
    return db.one( 'SELECT * FROM users WHERE email = $1 AND password = $2', [email, password] );
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
  },

  /*Card_deck currently return one record*/
  getAllCards: function(){
    return db.one('SELECT * FROM card_deck'); 
  }

};

