/**
 * Created by Administrator on 5/5/2017.
 */

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
    id: 'new game',
    src: src
  });
  return button[0];
};


$(document).ready(function () {
      var rawEmail = document.cookie;
      var email = rawEmail.replace( '%40', '@' );
      alert(email);

      var gameroomcanvas = $("#game-room");
      var context = gameroomcanvas[0].getContext("2d");
      context.canvas.width = $(window).width();
      context.canvas.height = $(window).height();
      drawURLImg(context, "/images/card_back.gif", 10, 10, 2.5);
      $('#canvas-container').append(createInputButton('/images/call.png'));
      $('.game-button').on("submit",function(){alert("yes")});
    }
);
