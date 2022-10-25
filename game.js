var isGameOver = false;
var isCenter = false;
var position = "left";
var punkte = 0;

var drive = function(pos){
  track = $("#track-"+pos);

  if(pos%2==0){
    car = $('<img>', {src:"img/car_0.png",class: 'car'});
    moveY(car,pos,-200,$(window).height());
  }else{
    car = $('<img>', {src:"img/car_1.png",class: 'car'});
    moveY(car,pos,$(window).height(),-200);
  }
  track.append(car);
}

var moveY = function(car,pos,from, to){
  car.css({'top' : from + 'px'});
  car.animate({top: to}, random(500,2000), function() {
      setTimeout( function(){
            car.remove();
            drive(pos);
      }, random());
  });
}

var gameOver = function(){
  isGameOver = true;
  $(".gameover").css({'top' : '0px'});
}

var random = function(min,max){
  return Math.floor(Math.random() * max) + min
}

var setGreenForGivenTime = function(element,time){
  element.addClass("success");
  setTimeout( function(){
    element.removeClass("success");
    }, time
  );
}

var initCars = function(){
  var i;
  for(i=1; i<=4;i++){
    j=i;
    setTimeout( function(j){
        drive(j);
      }, random(100,1000),j
    );
  }
}

var checkCollision = function(){
  var cursorX;
  var cursorY;
  document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
  }
  setInterval(function(){
    $(".car").each(function(){
      var beginX = $(this).offset().left;
      var endX = $(this).offset().left+$(this).width();
      var beginY = $(this).offset().top;
      var endY = $(this).offset().top+$(this).height();
      if(cursorX>beginX && cursorX<endX && cursorY>beginY && cursorY<endY && isGameOver == false){
        gameOver();
      }
    });
  }, 50);

}

$(document).ready(function(){
  $(".center").mouseover(function(){
    isCenter = true;
    console.log(isCenter)
  });

  $(".left").mouseover(function(){
    if(position == "right" && isCenter==true){
        position="left";
        punkte++;
        isCenter = false;
        $("#punkte").html("Punkte:"+punkte);
        setGreenForGivenTime($(".left"),500);
    }
  });

  $(".right").mouseover(function(){
    if(position == "left" && isCenter==true){
        isCenter= false;
        position="right";
        punkte++;
        $("#punkte").html("Punkte:"+punkte)
        setGreenForGivenTime($(".right"),500);
    }
  });
  initCars();
  checkCollision();
});
