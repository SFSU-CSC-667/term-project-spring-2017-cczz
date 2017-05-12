'use strict';

var db = require('../db');


module.exports = {
  createUser: function(){
    return db.one('INSERT INTO users VALUES (username, email, password, money, ranking, image_path)'); 
  }, 

  getAllUsers: function () {
    return db.any('SELECT * FROM users');
  },

  getUserById: function (id) {
  	return db.one('SELECT * FROM users WHERE id = $1', id);
  },

  getUserByUsername: function(email) {
  	return db.one('SELECT * FROM users WHERE username = $1', email);
  }, 


  getAllRooms: function() {
  	return db.any('SELECT * FROM rooms'); 
  },

  getRoomById: function(id) {
    return db.one('SELECT * FROM rooms WHERE id = $1', id); 
  },

  updateRoomById: function(id, numOfPlayer) {
    return db.any('UPDATE rooms SET player_amount = $1 WHERE id = $2', numOfPlayer, id); 
  },

  getAllRounds: function(){
    return db.any('SELECT * FROM rounds');
  },

  getRoundById: function(id) {
    return db.one('SELECT * FROM rounds WHERE id = $1', id); 
  }

};