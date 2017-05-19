const ROOM_ID = 'room-id';
const USER_JOINED = "user-joined";
var socket = io();

const listItem = function (data) {
  const item = $('<a>').attr({
    href: "/game",
    class: "room-item list-group-item",
    'data-roomid': data.id
  });
  const head = $('<h4>', {class: "list-group-item-heading", html: "Room " + data.id});
  const text = $('<div>', {class: "list-group-item-text", html: JSON.stringify(data)});
  item.append(head);
  item.append(text);
  return item[0];
};


$(document).ready(function () {
  /*Fill the score board and room board*/
  $.get("/api/rooms", function (data, status) {
    for (var i = 0; i < data.length; i++) {
      $('#rooms').append(listItem(data[i]));
    }
  });

  $.get("/api/users", function (data, status) {
    for (var i = 0; i < data.length; i++) {
      $('.score1').append(data[i].id);
    }
  });

  // $.get("/api/roundCards", function(data, status){
  //   console.log(data.bar[0]);
  //   $('.score1').append(data.bar[0]);

  // })


  /*Operation for chatting button*/
  $('#chat-board button').click(function () {
    const message = $('.form-control').val();
    // console.log(message);
    socket.emit('message', {data: message});
  });

  /*Operation on join room*/
  $('#rooms').on('click', 'a', function () {
    $.cookie(ROOM_ID, $(this).attr("data-roomid"), {path: "/"});
  });

  //reset the input area after message submission
  $('button.btn.btn-default').click(function(){
    $('input.form-control').val(''); 
  });

  //socket on the lobby page
  socket.on('message-display', function (data) {
    console.log(data);
    $('div.display-message').append('<div>').append(data.data);
  });
});
