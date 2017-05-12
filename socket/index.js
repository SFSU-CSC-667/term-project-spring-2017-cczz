const socketIo = require('socket.io');
const USER_JOINED = "user-joined";

const init = function (app, server) {
  const io = socketIo(server); // the websocket connection

  //app.set('io', io);//useless

  io.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
      console.log(data.data);
    });

    socket.on('user-joined', function (data) {
      console.log("joined");
      //io.emit('message-display', data);
    });

  })
};

module.exports = {init: init};