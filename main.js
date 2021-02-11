//Constants//
const INITIAL_TIME = 60;

//App State//
let timeRemaining = 0;
let countDown = null;
let gameOver = true;
let timer = null;
let startButton = null;

//variables//
//~~~~~~~~Buttons
startButton = document.querySelector("#start-button");
//~~~~~~~~Modals
let modalOne = document.querySelector("#modal-one");
let modalTwo = document.querySelector("#modal-two");
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
let gameLoopInterval = null;

//Game Piece Class
class gamePiece {
  constructor(x, y, color, width, height, image) {
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

let fence = new enemyGamePieces(2000, 400, "brown", 50, 200);
let fences = [];
// fences.push(fence);
// fences.push(fence);
// console.log(fences);

//Functions//////////////////////////////////////////

function generateFences() {
  for (let i = 1; i < 100; i++) {
    //randomly generate the x for fences
    // integer = Math.floor(Math.random() );
    // console.log(integer);
    let spacingVar = i * 200;
    // fence.x = fence.x * integer;
    fences.push(new enemyGamePieces(2000 + spacingVar, 400, "brown", 50, 200));
  }
  // console.log(fences);
}
generateFences();

//Displaying Modals
function displayModalOne() {
  modalOne.style.display = "block";
}
function displayModalTwo() {
  modalTwo.style.display = "block";
}
// displayModalOne();
//Button's functions
function pressStart() {
  // console.log("start the game");
  if (gameOver === true) {
    initializeGame();
    startButton = null;
    gameOver = false;
  }
}

function moveGamePieces(e) {
  switch (e.key) {
    case " ":
      qTip.y = qTip.y - 400;
      break;
  }
}

function detectHit(anyFence) {
  if (
    qTip.x + qTip.width >= anyFence.x &&
    qTip.x <= anyFence.x + anyFence.width &&
    qTip.y + qTip.height >= anyFence.y &&
    qTip.y <= anyFence.y + anyFence.height
  ) {
    endGame("the game is lost");
  }
}

function updateClock() {
  timeRemaining--;
  if (timeRemaining <= 0) {
    endGame("the game is lost");
  }
  timer.innerText = timeRemaining;
}

function initializeGame() {
  // console.log("Set the game up!")
  timeRemaining = INITIAL_TIME;

  //set up remaining time variable
  countDown = setInterval(updateClock, 1000); //runs update clock() every second
  gameOver = false;
  gameLoopInterval = setInterval(gameLoop, 60);
}

function endGame(isGameWon) {
  console.log("END GAME");
  //clear count and update game over state var
  timeRemaining = 0;
  gameOver = true;
  clearInterval(countDown);

  if (isGameWon === "yes the game is won") {
    console.log("Finally, I can get some rest.");
  } else if (isGameWon === "the game is lost") {
    console.log("No sleep tonight!");
    qTip.alive = false;
    fence = false;
    // canvas.style.backgroundImage = "url(images/jumper.jpg)";
    //if lost make background img change
  }
}

// main game loop
function gameLoop() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // check for collisions
  if (qTip.alive) {
    for (let i = 0; i < fences.length; i++) {
      if (fences[i].alive) {
        detectHit(fences[i]);
      }
    }
  }

  // render our game objects & stop qTip from jumping too high!
  if (qTip.alive) {
    for (let i = 0; i < fences.length; i++) {
      if (fences[i].alive) {
        fences[i].x = fences[i].x - 10;
      }
      fences[i].render();
    }
    qTip.render();
  }
  if (qTip.y < 400) {
    qTip.y = qTip.y + 10;
  }
  if (qTip.y <= 0) {
    qTip.y = 0;
  }
}
//Event Listeners
document.addEventListener("keydown", moveGamePieces);
startButton.addEventListener("click", pressStart);
