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

//runs to game loop with a set interval
let gameLoopInterval = setInterval(gameLoop, 60);

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
class enemyGamePieces {
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
let fence = new enemyGamePieces(800, 400, "brown", 50, 200);
let fences = [];

//Functions
function moveGamePieces(e) {
  switch (e.key) {
    case " ":
      qTip.y = qTip.y - 400;
      break;
    case "w":
      fence.x = fence.x - 100;
  }
}

function updateClock() {
  timeRemaining--;
  if (timeRemaining <= 0) {
    timerEndsGame(false);
  }
  timer.innerText = timeRemaining;
}

function initializeGame() {
  // console.log("Set the game up!")
  timeRemaining = INITIAL_TIME;
  //set up remaining time variable
  countdown = setInterval(updateClock, 1000); //runs update clock() every second
  gameOver = false;
}
initializeGame();

function timerEndsGame(isGameWon) {
  console.log("END GAME");
  //clear count and update game over state var
  clearInterval(countdown);
  gameOver = true;
  if (isGameWon) {
    console.log("Finally, I can get some rest.");
  } else {
    console.log("No sleep tonight!");
    qTip.alive = false;
    fence = null;
    // canvas.style.backgroundImage = "url(images/jumper.jpg)";
  }
  //if lost make background img change
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Collision ends game
// function collisionEndsGame() {
//   qTip.alive = false;
//   clearInterval(gameLoopInterval);
//   movementDisplay.innerText = "dead!";
// }

// main game loop
function gameLoop() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // check for collisions
  // detectHit();
  // render our game objects!
  if (qTip.alive) {
    fence.render();
    qTip.render();
  }
  if (qTip.y < 400) {
    qTip.y = qTip.y + 10;
  }
}
//Event Listeners
document.addEventListener("keydown", moveGamePieces);
