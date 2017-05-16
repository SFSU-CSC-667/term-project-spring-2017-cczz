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
      console.log(data.data);
    });

    socket.on(ROOM_CREATED, function (data) {
      
    });


    socket.on(USER_JOINED, function (data) {
      console.log(data.roomid);
      socket.join(data.roomid);
      io.sockets.in(data.roomid).emit(USER_JOINED, {msg: "user join room:" + data.roomid});
    });

  })
};

module.exports = {init: init};