'use strict';

var db = require('../db');


module.exports = {

  /* USERS */
  getAllUsers: function () {
    return db.any('SELECT * FROM users');
  },

  getUserById: function (id) {
    return db.one('SELECT * FROM users WHERE id = $1', id);
  },

  getUserByUsername: function (username) {
    return db.one('SELECT * FROM users WHERE username = $1', username);
  },

  getUserByEmail: function (email) {
    return db.one('SELECT * FROM users WHERE email = $1', email);
  },

  createUser: function (req) {
    return db.none('INSERT INTO users(username,email, password)' +
        'VALUES (${username}, ${email}, ${password})', req.body);
  },

  verifyUserByEmailAndPassword: function (email, password) {
    return db.one('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
  },


  /* ROOMS */
  getAllRooms: function () {
    return db.any('SELECT * FROM rooms');
  },


  getRoomById: function (id) {
    return db.one('SELECT * FROM rooms WHERE id = $1', id);
  },

  createRoom: function (dealer_pid, small_blind) {
    return db.one('INSERT INTO rooms(dealer_pid, small_blind) VALUES ($1, $2) RETURNING id', [dealer_pid, small_blind]);
  },

  updateRoomById: function (id, numOfPlayer) {
    return db.one('UPDATE rooms SET player_amount = $2 WHERE id = $1 RETURNING id, player_amount', [id, numOfPlayer]);
  },

  /*Roomplayers*/
  createRoomPlayers: function (user_id, room_id, user_name, position_id) {
    return db.one('INSERT INTO roomplayers(user_id, room_id, username, position_id) VALUES ($1, $2, $3, $4) RETURNING position_id', [user_id, room_id, user_name, position_id]);
  },
  getRoomPlayerByID: function (userid) {
    return db.any('SELECT * FROM roomplayers WHERE user_id = $1', userid);
  },

  getRoomPlayerByRoomID: function (roomid) {
    return db.any('SELECT * FROM roomplayers WHERE room_id = $1', roomid);
  },

  /* ROUNDS */
  getAllRounds: function () {
    return db.any('SELECT * FROM rounds');
  },

  getRoundById: function (id) {
    return db.one('SELECT * FROM rounds WHERE id = $1', id);
  },

  createRound: function (room_id) {
    return db.one('INSERT INTO rounds(room_id)' + 'VALUES($1) RETURNING id', room_id);
  },

  /*RoundCards & Deck*/


};

