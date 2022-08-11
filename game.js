var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(200).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + level);
  level++;
}

// switch (randomChosenColour) {
//   case "blue": var blue = new Audio("sounds/blue.mp3");
//   blue.play();
//   break;
//   case "green": var green = new Audio("sounds/green.mp3");
//   green.play();
//   break;
//   case "red": var red = new Audio("sounds/red.mp3");
//   red.play();
//   break;
//   case "yellow": var yellow = new Audio("sounds/yellow.mp3");
//   yellow.play();
//   break;
// }

$(".btn").click(function() {
  userClickedPattern.push(this.id);
  console.log(userClickedPattern);
  animatePress(this.id);
  playSound(this.id);
  switch (this.id) {
    case "red": checkAnswer(0);
    break;
    case "blue": checkAnswer(1);
    break;
    case "green": checkAnswer(2);
    break;
    case "yellow": checkAnswer(3);
    break;
  }
});

function playSound(name) {
  if(name !== "wrong") {
    var audiosrc = "sounds/" + name +".mp3";
    var audio = new Audio (audiosrc);
    audio.play();
  }
  else {
    var audiosrc = "sounds/wrong.mp3";
    var audio = new Audio (audiosrc);
    audio.play();
  }
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

var started = true;
var level = 0;
$(document).keypress(function () {
  if (started) {
    nextSequence();
    started = !started;
  }
});

function checkAnswer (currentLevel) {
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("right");
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
}
