const ROOM_ID = 'room-id';
const USER_JOINED = "user-joined";

const socketIo = require('socket.io');

const init = function (app, server) {
  const io = socketIo(server); // the websocket connection

  //app.set('io', io);//useless

  io.sockets.on('connection', function (socket) {
    /*socket on the message from the lobby*/
    socket.on('message', function (data) {
      io.emit( 'message-display', data );
      // console.log(data.data);
    });
    /*socket on the message from the room*/
    socket.on('room-message', function(data){
      // console.log(data.roomid);
      socket.join(data.roomid);
      io.sockets.in(data.roomid).emit('room-message-display', data); 
      console.log(data.data);
    }); 

    socket.on(USER_JOINED, function (data) {
      // console.log(data.roomid);
      socket.join(data.roomid);
      io.sockets.in(data.roomid).emit(USER_JOINED, {msg: "user join room:"+data.roomid});
    });

  })
};

module.exports = {init: init};