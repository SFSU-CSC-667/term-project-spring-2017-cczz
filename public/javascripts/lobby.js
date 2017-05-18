const ROOM_ID = 'room-id';
const USER_JOINED = "user-joined";
const ROOM_CREATED = "room-created";

var socket = io();

const listItem = function (data, title) {
  const item = $('<a>').attr({
    href: "/game",
    class: "room-item list-group-item",
    'data-roomid': data.id
  });
  const head = $('<h4>', {class: "list-group-item-heading", html: title + data.id});
  const text = $('<div>', {class: "list-group-item-text", html: JSON.stringify(data)});
  item.append(head);
  item.append(text);
  return item[0];
};


$(document).ready(function () {
  /*Fill the score board and room board*/
  $.get("/api/rooms", function (data, status) {
    for (var i = 0; i < data.length; i++) {
      $('#rooms').append(listItem(data[i], "Room: "));
    }
  });

  $.get("/api/users", function (data, status) {
    for (var i = 0; i < data.length; i++) {
      $('.score1').append(listItem(data[i], "User: "));
    }
  });


  /*Operation for chatting button*/
  $('#chat-board button').click(function () {
    const message = $('.form-control').val();
    // console.log(message);
    socket.emit('message', {data: message});
  });

  /*Operation on create room, send to create room then store roomid that in cookie*/
  $(".creat-new-room").on("submit", function () {
    socket.emit(ROOM_CREATED, {userid: 1});
  });

  socket.on(ROOM_CREATED, function (data) {
    $.cookie(ROOM_ID, data, {path: "/"});
    window.location = "/game";
  });

  /*Operation to join room*/
  $('#rooms').on('click', 'a', function () {
    $.cookie(ROOM_ID, $(this).attr("data-roomid"), {path: "/"});
  });

  //reset the input area after message submission
  $('button.btn.btn-default').click(function () {
    $('input.form-control').val('');
  });

  //socket on the lobby page
  socket.on('message-display', function (data) {
    console.log(data);
    $('div.display-message').append('<div>').append(data.data);
  });


  /* clear all cookies ans session when closing the window */
  $(window).on("beforeunload", function(e) {
      $.get("/logout", function (data, status) {}); //destroy session
      var cookies = $.cookie();
      for(var cookie in cookies) {
          $.removeCookie(cookie);
      }
  });
});
