const ROOM_ID = 'room-id';
const USER_JOINED = "user-joined";
const ROOM_CREATED = "room-created";

const socketIo = require('socket.io');
var db = require('../model');

const init = function (app, server) {
  const io = socketIo(server); // the websocket connection

  //app.set('io', io);//useless

  io.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
      io.emit('message-display', data);
      //console.log(data.data);
    });

    /*For room created, work with lobby.js */
    socket.on(ROOM_CREATED, function (data) {
      db.createRoom(1, 100).then(function (data) {
        //console.log(data.id);
        socket.emit(ROOM_CREATED, data.id);

      });
    });

    /*For user join, work with game.js*/
    socket.on(USER_JOINED, function (data) {
      //console.log(data.roomid);
      socket.join(data.roomid);
      db.getRoomById(data.roomid).then(function (data) {
        db.updateRoomById(data.id, data.player_amount + 1).then(function (data) {
          //console.log("id:" + data.id + ";players:" + data.player_amount);
          io.sockets.in(data.id).emit(USER_JOINED, {roomid:data.id,playerAmount:data.player_amount});
        });
      });
    });


  })
};

module.exports = {init: init};