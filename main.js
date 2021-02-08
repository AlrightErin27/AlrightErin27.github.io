//constants//
const INITIAL_TIME = 60;

//app's state vars//
let timeRemaining = 0;
let countDown = null;
let gameOver = false;
let resetButtonEl = null;
let timerEl = null;
console.log(timerEl);

function updateClock() {
  console.log("Countdown the timer!");
  //decrease time remaining, if no time left then end game
  timeRemaining--;
  if (timeRemaining <= 0) {
    console.log("Game over! Bomb exploded!");
    endGame(false);
  }
  timerEl.textContent = "00:" + timeRemaining;
}

///
function initializeGame() {
  console.log("Set the game up!");
  timeRemaining = INITIAL_TIME;
  countdown = setInterval(updateClock, 1000);
  gameOver = false;
}
initializeGame();

//handle game over state
function endGame(isGameWon) {
  console.log("END GAME");
  //clearcount and update game over state var
  clearInterval(countdown);
  gameOver = true;

  //If the game is won chant text to green
  if (isGameWon) {
    timerEl.style.color = "green";
    console.log("winner");
  } else {
    console.log("loser");
    backgroundEl.style.backgroundImage = "url(img/explosion.jpg)";
  }
  //if lost make background img change
}

timerEl = document.querySelector("#timer");
