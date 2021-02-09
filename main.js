//variables//
//~~~~~~~~Buttons
const startButton = document.querySelector("#start-button");
const pauseButton = document.querySelector("#pause-button");
const restartButton = document.querySelector("#restart-button");
//~~~~~~~~Timer
const timer = document.querySelector("#timer");
let timerText = timer.innerText;
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
