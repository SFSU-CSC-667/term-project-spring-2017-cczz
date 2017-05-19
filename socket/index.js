const ROOM_ID = 'room-id';
const USER_JOINED = "user-joined";
const ROOM_CREATED = "room-created";

const socketIo = require('socket.io');
var db = require('../model');

const init = function (app, server) {
  const io = socketIo(server); // the websocket connection

  //app.set('io', io);//useless

  io.sockets.on('connection', function (socket) {
    /*socket on the message from the lobby*/
    socket.on('message', function (data) {
      io.emit('message-display', data);
      //console.log(data.data);
    });

    /*socket on the message from the room*/
    socket.on('room-message', function (data) {
      //console.log(data.roomid);
      socket.join(data.roomid);
      io.sockets.in(data.roomid).emit('room-message-display', data);
      // console.log(data.data);
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
      var userid = data.userid;
      var roomid = data.roomid;

      socket.join(data.roomid);

      db.getRoomById(data.roomid).then(function (data) {
        db.updateRoomById(data.id, data.player_amount + 1).then(function (data) {
          db.createRoomPlayers(userid, data.id, data.player_amount).then(function (data) {
            //console.log("user joined id:" + userid + "roomid:" + roomid);
            io.sockets.in(roomid).emit(USER_JOINED, {roomid: roomid, userid: userid, positionid: data});
          });
        });
      });
    });


  })
};

module.exports = {init: init};