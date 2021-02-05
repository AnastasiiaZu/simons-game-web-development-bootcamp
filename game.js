var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStart = false;

var level = 0;

$(document).keydown(function() { //detects the first click on the keyboard to start the game
  if (gameStart === false) {
    nextSequence();
    gameStart = true;
    $("#level-title").text("Level " + level);
  };
});

function nextSequence() { //generates a random button click and puts it into an array

  userClickedPattern = []; //empties the user generated pattern so you need to fill it again

  var randomNumber = Math.floor(Math.random() * 4); // generates a ransom number between 0 and 3

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);

  playSound(randomChosenColour);

  level++;

  $("#level-title").text("Level " + level);
};

$(".btn").click(function() { //listener for button clicks of the user

  var userChosenColour = this.id; //adding an id of the happened event

  userClickedPattern.push(userChosenColour); //pushes each click into the array

  animatePress(userChosenColour);

  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) { // plays a sound when clicking the button or a random generated sequence

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColour) { //adds and removes a shadow after 0,1 sec

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

function checkAnswer(currentLevel) { //checks the user clicked array against the game generated array

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { //if the pattern is the same on all levels
    if (userClickedPattern.length === gamePattern.length) { //and once the arrays are the same length
      setTimeout(function() { //it creates the next level pattern
        nextSequence();
      }, 1000);
    }

  } else {

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 1000);

    $("h1").text("Game Over, Press Any Key to Restart");

    audio.play("wrong");

    startOver();
  };
};

function startOver() { //starting the game over

  level = 0;
  gamePattern = [];
  gameStart = false;
};
