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

    //socket listen on the lobby page to echo/display the message on the chat board 
    socket.on( 'message', data => io.emit( 'message-display', data ))
    //socket listen on the game page to new player join 
    socket.on( 'userjoin', data => io.emit('userupdate',data))
  })
}

module.exports = { init }