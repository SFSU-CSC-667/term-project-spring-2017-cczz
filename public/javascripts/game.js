/**
 * Created by Administrator on 5/5/2017.
 */

var socket = io();
const USER_JOINED = "user-joined";

const tableInit = function (context) {
  var img = new Image();
  img.src = "/images/gametable.jpg";
  img.onload = function () {
    context.beginPath();
    context.fillStyle = context.createPattern(img, "repeat");
    context.fillRect(0, 0, $(window).width(), $(window).height())
  };
};  //deprecated

const drawURLImg = function (context, src, posX, posY, scale) {
  var img = new Image();
  img.onload = function () {
    context.beginPath();
    context.drawImage(img, posX, posY, img.width / scale, img.height / scale);
  };
  img.src = src;
};

const createInputButton = function (src) {
  const button = $('<input>').attr({
    type: 'image',
    class: 'game-button',
    src: src
  });

  const form = $('<form>').attr({
    id: 'new game',
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
      drawURLImg(context, "/images/card_back.gif", 10, 10, 2.5);

      socket.emit(USER_JOINED,{roomid:"yes"});

      $('#canvas-container').append(createInputButton('/images/call.png'));
      $('.game-form').on("submit", function () {
        socket.emit('message', {data: "helslo world1"});
        return false; // prevent refresh
      });
    }
);
