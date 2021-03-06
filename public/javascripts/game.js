/**
 * Created by Administrator on 5/5/2017.
 */
const USER_JOINED = "user-joined";
const ROOM_ID = 'room-id';
const USER_ID = 'user_id';
const ROOMS_IN = 'rooms_in';
const START_GAME = 'start-game';
const USER_RETURN = 'user_return';
const USER_NAME = 'username';

const namePlatePos = [{x: 370, y: 540}, {x: 20, y: 360}, {x: 370, y: 175}, {x: 720, y: 360}];
const cardPos = [{x: 360, y: 410}, {x: 50, y: 190}, {x: 400, y: 5}, {x: 750, y: 190}];
const pubCardsPos = [{x: 220, y: 240}, {x: 320, y: 240}, {x: 420, y: 240}, {x: 520, y: 240}, {x: 620, y: 240}];

var socket = io();
var returnGame = false;
var pos_id = 0;

const drawURLImg = function (context, src, posX, posY, scale) {
  var img = new Image();
  img.onload = function () {
    context.beginPath();
    context.drawImage(img, posX, posY, img.width / scale, img.height / scale);
  };
  img.src = src;
};

const drawNamePlate = function (context, posX, posY, name, money) {
  const nameOffsetX = 90, nameOffsetY = 33;
  const moneyOffsetX = 90, moneyOffsetY = 65;
  const imgSrc = "/images/nameplate_user.png";
  const scale = 1.5;
  var img = new Image();
  img.onload = function () {
    context.beginPath();
    context.drawImage(img, posX, posY, img.width / scale, img.height / scale);
    context.textAlign = 'center';

    context.font = "bold 25px Times New Roman";
    context.fillText(name, posX + nameOffsetX, posY + nameOffsetY);
    context.font = "20px Arial";
    context.fillText("$" + money, posX + moneyOffsetX, posY + moneyOffsetY);
  };
  img.src = imgSrc;
};

const drawOpponentPlate = function (context, posX, posY, name, money) {
  const nameOffsetX = 80, nameOffsetY = 28;
  const moneyOffsetX = 78, moneyOffsetY = 55;
  const imgSrc = "/images/nameplate_opponent.png";
  const scale = 1.4;
  var img = new Image();
  img.onload = function () {
    context.beginPath();
    context.drawImage(img, posX, posY, img.width / scale, img.height / scale);
    context.textAlign = 'center';

    context.font = "20px Times New Roman";
    context.fillText(name, posX + nameOffsetX, posY + nameOffsetY);
    context.font = "20px Arial";
    context.fillText("$" + money, posX + moneyOffsetX, posY + moneyOffsetY);
  };
  img.src = imgSrc;
};

const drawUserPlateByPosID = function (context, userid, roomid) {
  $.get("/api/roomplayers/roomid/" + roomid, function (data, status) {
    for (var i in data) {
      if (userid == data[i].user_id) {
        pos_id = data[i].position_id;
      }
    }
    console.log("@pos: " + pos_id);
    for (var j in data) {
      var canvasposition = data[j].position_id - pos_id;
      if (canvasposition < 0) {
        canvasposition += 4;
      }
      console.log("now process @pos: " + canvasposition);
      if (canvasposition == 0) {
        drawNamePlate(context, namePlatePos[0].x, namePlatePos[0].y, "Me", "100"); //draw me plate
      } else {
        drawOpponentPlate(context, namePlatePos[canvasposition].x, namePlatePos[canvasposition].y, data[j].username, "100");
      }
    }
  });
};

const drawCard = function (context, cardNum, posX, posY) {
  if (cardNum === 0 || cardNum == 0) {
    var imageSrc = "/images/card_back.gif";
    var scale = 4.0;
  } else {
    var imageSrc = "/images/svg-cards/" + cardNum + ".svg";
    var scale = 2.5;
  }
  drawURLImg(context, imageSrc, posX, posY, scale);
};

const drawBlindCards = function (context, posX, posY) {
  drawCard(context, 0, posX, posY);
  drawCard(context, 0, posX - 10, posY + 30);
};

const createInputButton = function (src, id) {
  const button = $('<input>').attr({
    type: 'image',
    class: 'game-button',
    src: src
  });

  const form = $('<form>').attr({
    id: id,
    class: 'game-form'
  });
  form.append(button);

  return form[0];
};


$(document).ready(function () {

  var gameroomcanvas = $("#game-room");
  var context = gameroomcanvas[0].getContext("2d");
  context.canvas.width = $(window).width();
  context.canvas.height = $(window).height();

  /*User Join  or Rreturn room*/
  var roomid = parseInt($.cookie(ROOM_ID));
  var userid = parseInt($.cookie(USER_ID));
  var username = $.cookie(USER_NAME);
  var inRooms = JSON.parse($.cookie(ROOMS_IN));

  //console.log(JSON.stringify(inRooms));
  //console.log(roomid);

  if ($.inArray(roomid, inRooms) > -1) {
    console.log("return game");
    returnGame = true;
    socket.emit(USER_RETURN,{roomid:roomid});
    drawUserPlateByPosID(context, userid, roomid);
  }

  /*New game join*/
  if (!returnGame) {
    console.log("new game");
    socket.emit(USER_JOINED, {userid: userid, roomid: roomid, username: username});
    inRooms.push(roomid);
    $.cookie(ROOMS_IN, JSON.stringify(inRooms), {path: "/"});
  }

  socket.on(USER_JOINED, function (data) {
    drawUserPlateByPosID(context, userid, roomid);
  });

  /*User Action buttons*/
  $('.buttons-container').append(createInputButton('/images/button_play.png', 'start_game'));
  $('.buttons-container').append(createInputButton('/images/call.png', 'call'));
  $('.buttons-container').append(createInputButton('/images/button_fold.png', 'fold'));
  $('.buttons-container').append(createInputButton('/images/button_check.png', 'check'));

  $('#start_game').on("submit", function () {
    socket.emit(START_GAME, {roomid: roomid});
    return false; // prevent refresh
  });

  socket.on(START_GAME, function (data) {
    console.log(JSON.stringify(data.cards));
    drawCard(context, data.cards[(pos_id-1)*2], cardPos[0].x, cardPos[0].y);
    drawCard(context, data.cards[(pos_id-1)*2+1], cardPos[0].x + 100, cardPos[0].y);
    drawBlindCards(context, cardPos[1].x, cardPos[1].y);
    drawBlindCards(context, cardPos[2].x, cardPos[2].y);
    drawBlindCards(context, cardPos[3].x, cardPos[3].y);
    for(var m = 8; m <13; m++){
      drawCard(context,data.cards[m],pubCardsPos[m-8].x,pubCardsPos[m-8].y);
    }
  });

  /* Room message */
  $('#chat-input button').click(function () {
    const message = $('.room-form-control').val();
    // console.log(message);
    // var username = $.cookie(username);
    socket.emit('room-message', {roomid: roomid});
    socket.emit('room-message', {data: message});
  });

  //socket on the game page
  var username = $.cookie('email');
  // console.log(username);
  socket.on('room-message-display', function (data) {
    $('div#room-chat-board').append('<div>').append(data.data);
  });

  //Clear input after submission
  $('button.btn.btn-default').click(function () {
    $('input.room-form-control').val('');
  });

});
