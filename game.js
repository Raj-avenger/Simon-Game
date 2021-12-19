var level = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $(".start-btn").text("START");
  $("#level-title").text("Simon Game");
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);

  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if(userClickedPattern.length == gamePattern.length){
    var i;
    for(i=0;i<userClickedPattern.length && i<gamePattern.length;i++){
      if(userClickedPattern[i] != gamePattern[i]){
        break;
      }
    }
    if(i==userClickedPattern.length && i==gamePattern.length){
      setTimeout(nextSequence(),1000);
    }
    else{
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      $("h1").text("Game over, Press Any Key to Restart");
      startOver();

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
    }
  }
}

$(document).keydown(function(event){
  if(started && ( event.key === "R" || event.key === "r" )){
    startOver();
  }
  if(!started && event.key === "Enter"){
    $(".start-btn").text("RESET");
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".start-btn").click(function(){
  if(!started){
    $(".start-btn").text("RESET");
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  else{
    startOver();
  }
});
