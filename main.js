//Constants//
const INITIAL_TIME = 60;

//App State//
let timeRemaining = 0;
let countDown = null;
let gameOver = false;
let timer = null;

//variables//
//~~~~~~~~Buttons
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const restartButton = document.querySelector("#restart-button");
//~~~~~~~~Timer
timer = document.querySelector("#timer");
//~~~~~~~~Info Display
const infoTextContainer = document.querySelector("#center-bottom-box");
let infoTextDisplay = infoTextContainer.innerText;
//~~~~~~~~DOM Selectors
const canvas = document.getElementById("canvas");
//canvas set-up//
const ctx = canvas.getContext("2d");
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);

ctx.fillStyle = "white";

//Game Piece Class
class gamePiece {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

//Game Pieces
let qTip = new gamePiece(100, 400, "white", 270, 270);
let fence = new gamePiece(800, 400, "brown", 50, 200);
qTip.render();
fence.render();

//Functions
function updateClock() {
  console.log("Countdown the timer!");
  timeRemaining--;
  if (timeRemaining <= 0) {
    console.log("Game over! Bomb exploded!");
    endGame(false);
  }
  timer.innerText = "00:" + timeRemaining;
}
// updateClock();

function initializeGame() {
  // console.log("Set the game up!")
  timeRemaining = INITIAL_TIME;
  //set up remaining time variable
  countdown = setInterval(updateClock, 1000); //runs update clock() every second
  gameOver = false;
}
initializeGame();

function endGame(isGameWon) {
  console.log("END GAME");
  //clear count and update game over state var
  clearInterval(countdown);
  gameOver = true;
  //If the game is won chant text to green
  if (isGameWon) {
    timerEl.style.color = "green";
    console.log("Hooray! You're hero!");
  } else {
    console.log("Everyone is dead!");
    canvas.style.backgroundImage = "url(images/jumper.jpg)";
  }
  //if lost make background img change
}
//Event Listeners
