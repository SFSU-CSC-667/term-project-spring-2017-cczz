const ROOM_ID = 'room-id';
const USER_JOINED = "user-joined";

const socketIo = require('socket.io');
const db = require( '../model' );


//Shuffle cards
function shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex; 

  //while there remain elements to shuffle
  while(0 !== currentIndex){
    //pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex); 
    currentIndex -= 1;

    //Swap it with the current element
    temporaryValue = array[currentIndex]; 
    array[currentIndex] = array[randomIndex]; 
    array[randomIndex] = temporaryValue; 
  }
  return array; 
}

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
      // console.log(data.data);
    }); 

    /*socket on the start_game button*/
    socket.on('start_game', function(data){
      
      var room_id = data.roomid; 
      // console.log(data.roomid);
      var cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
      var shuffled_cards = shuffle(cards); 
      var shuffled_cards_length = shuffled_cards.length;

      var round = db.createRound(room_id);     
      var cardDeck =  db.createDeck(room_id, 1, shuffled_cards); 
      
      var roundCards = db.createRoundCard(shuffled_cards[shuffled_cards_length-1]); 
      cards = db.getRoundCards(1); 
      // console.log(cards);

    })

    socket.on(USER_JOINED, function (data) {
      // console.log(data.roomid);
      socket.join(data.roomid);
      io.sockets.in(data.roomid).emit(USER_JOINED, {msg: "user join room:"+data.roomid});
    });

  })
};

module.exports = {init: init};