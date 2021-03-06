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
restartButton = document.querySelector("#restart-button");
restartButtonTwo = document.querySelector("#restart-button-two");

//~~~~~~~~Modals
let modalOne = document.querySelector("#modal-one");
let modalTwo = document.querySelector("#modal-two");
let modalThree = document.querySelector("#modal-three");

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
//Qtip Class
class gamePiece {
  constructor(x, y, color, width, height, image) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.image = image;
    this.alive = true;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
///fences game pieces Class
class enemyGamePieces {
  constructor(x, y, color, width, height, image) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.image = image;
    this.alive = true;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
//Game Pieces
let qTipImage = new Image();
qTipImage.src = "./images/colorQtipcropped.png";
let qTipRunningImage = new Image();
qTipRunningImage.src = "./images/jumper.png";
let qTip = new gamePiece(100, 400, "white", 400, 270, qTipImage);

let fenceImage = new Image();
fenceImage.src = "./images/littlefence.png";
let fences = [];

//music
class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }
  play() {
    this.sound.play();
  }
}
let jumpSound = new Sound("sound/jumpsound.wav");
let winnerSound = new Sound("sound/winner.wav");
let loserSound = new Sound("sound/loser.wav");

//Functions//////////////////////////////////////////

function generateFences() {
  for (let i = 1; i < 100; i++) {
    randomInt = Math.floor(Math.random() * (2000 - 400 + 1) + 400);
    // console.log(randomInt);
    let spacingVar = i * randomInt;
    fences.push(
      new enemyGamePieces(1000 + spacingVar, 450, "brown", 90, 370, fenceImage)
    );
  }
}

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
  //hides modal #1 when start is pressed
  modalOne.style.display = "none";

  if (gameOver === true) {
    initializeGame();
    startButton = null;
    gameOver = false;
  }
}
function pressRestart() {
  modalTwo.style.display = "none";
  initializeGame();
  updateClock();
  gameLoop();
  qTip.alive = true;
}
function pressRestartTwo() {
  modalThree.style.display = "none";
  initializeGame();
  updateClock();
  gameLoop();
  qTip.alive = true;
}
function moveGamePieces(e) {
  switch (e.key) {
    case " ":
      qTip.y = qTip.y - 400;
      jumpSound.play();
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
    endGame("yes the game is won");
  }
  timer.innerText = timeRemaining;
}
function initializeGame() {
  // console.log("Set the game up!")
  timeRemaining = INITIAL_TIME;
  //new fences
  fences = [];
  generateFences();

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
  clearInterval(gameLoopInterval);

  if (isGameWon === "yes the game is won") {
    console.log("Finally, I can get some rest.");
    modalThree.style.display = "block";
    winnerSound.play();
  } else if (isGameWon === "the game is lost") {
    console.log("No sleep tonight!");
    qTip.alive = false;
    fence = false;
    modalTwo.style.display = "block";
    loserSound.play();
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
  if (qTip.y < 300) {
    qTip.image = qTipRunningImage;
  } else {
    qTip.image = qTipImage;
  }
}

//Event Listeners
document.addEventListener("keydown", moveGamePieces);
startButton.addEventListener("click", pressStart);
restartButton.addEventListener("click", pressRestart);
restartButtonTwo.addEventListener("click", pressRestartTwo);
