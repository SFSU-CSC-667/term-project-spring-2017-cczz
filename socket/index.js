const ROOM_ID = 'room-id';
const USER_JOINED = "user-joined";
const ROOM_CREATED = "room-created";
const START_GAME = 'start-game';
const USER_RETURN = 'user_return';
const USER_NAME = 'username';
var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];

const socketIo = require('socket.io');
var db = require('../model');

const shuffle = function (array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  //while there remain elements to shuffle
  while (0 !== currentIndex) {
    //pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    //Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const init = function (app, server) {
  const io = socketIo(server); // the websocket connection


  io.sockets.on('connection', function (socket) {

    /*For room created, work with lobby.js */
    socket.on(ROOM_CREATED, function (data) {
      db.createRoom(1, 100).then(function (data) {
        socket.emit(ROOM_CREATED, data.id);

      });
    });

    /*For user join/return, work with game.js*/
    socket.on(USER_RETURN, function (data) {
      socket.join(data.roomid);
    });

    socket.on(USER_JOINED, function (data) {
      var userid = data.userid;
      var roomid = data.roomid;
      var username = data.username;

      socket.join(data.roomid);

      db.getRoomById(data.roomid).then(function (data) {
        db.updateRoomById(data.id, data.player_amount + 1).then(function (data) {
          db.createRoomPlayers(userid, data.id, username, data.player_amount).then(function (data) {
            io.sockets.in(roomid).emit(USER_JOINED, {roomid: roomid, userid: userid, positionid: data});
          });
        });
      });
    });

    /*For button on Game action */
    socket.on(START_GAME, function (data) {
      console.log(data.roomid);
      var roomid = data.roomid;
      var shuffleCards = shuffle(cards);
      var cardsInRounds = shuffleCards.slice(0, 20); // only need the first 13 cards for judging
      console.log(cardsInRounds);
      io.sockets.in(data.roomid).emit(START_GAME, {cards: cardsInRounds});
    });

    /*For message from the lobby*/
    socket.on('message', function (data) {
      io.emit('message-display', data);
      console.log(data.data);
    });


    /*For message from the room*/
    socket.on('room-message', function (data) {
      socket.join(data.roomid);
      io.sockets.in(data.roomid).emit('room-message-display', data);
    });

  })
};

module.exports = {init: init};