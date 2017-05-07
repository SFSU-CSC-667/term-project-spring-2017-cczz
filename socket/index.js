const socketIo = require( 'socket.io' )


const init = ( app, server ) => {
  const io = socketIo( server )

  app.set( 'io', io )

  io.on( 'connection', socket => {
    console.log('hello');
    console.log( 'client connected' )

    socket.on( 'disconnect', data => {
      console.log( 'client disconnected' )
    })

    socket.on( 'message', data => io.emit( 'message-display', data ))
  })
}

module.exports = { init }