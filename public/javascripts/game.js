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

// const createHiddenButton = function(val){
//   const button = $('<input>').attr({
//     type: 'txt',
//     id: 'username',
//     value: val
//   });
//   return button[0];
// }


$(document).ready(function () {
      var gameroomcanvas = $("#game-room");
      var context = gameroomcanvas[0].getContext("2d");
      context.canvas.width = $(window).width();
      context.canvas.height = $(window).height();
      drawURLImg(context, "/images/card_back.gif", 10, 150, 5);
      drawURLImg(context, "/images/card_back.gif", 50, 150, 5); 
      drawURLImg(context, "/images/card_back.gif", 300, 30, 5); 
      drawURLImg(context, "/images/card_back.gif", 340, 30, 5);
      drawURLImg(context, "/images/card_back.gif", 600, 150, 5);
      drawURLImg(context, "/images/card_back.gif", 640, 150, 5);
      drawURLImg(context, "/images/card_back.gif", 300, 300, 5);
      drawURLImg(context, "/images/card_back.gif", 340, 300, 5);

      context.font = "20px Arial"; 
      context.fillText("Cheng", 40,280);
      context.fillText("1000", 40,300);
      context.fillText("Xinlu", 340, 160);
      context.fillText("1000", 340,180);
      context.fillText("Lijie", 650, 280);
      context.fillText("1000", 650,300);
      context.fillText("Xuan", 340, 430);
      context.fillText("1000", 340,450);

      $('#canvas-container').append(createInputButton('/images/call.png'));
      $('.game-button').on("submit",function(){alert("yes")});
    }
);
