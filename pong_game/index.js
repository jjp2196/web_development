// Get references to paddles, ball, and game board
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const ball = document.querySelector(".ball");
const gameBoard = document.querySelector(".game-board");

// Set initial positions for the paddles and the ball
let player1Position = 160;
let player2Position = 160;
let ballX = 390;
let ballY = 190;
let ballSpeedX = 3 * (Math.random() > 0.5 ? 1 : -1); // Random initial direction for the ball
let ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1); // Random initial direction for the ball

// Function to update the positions of paddles and ball
function update() {
  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check for collisions with top and bottom walls
  if (ballY <= 0 || ballY >= gameBoard.clientHeight - 20) {
    ballSpeedY *= -1;
  }

  // Check for collisions with paddles
  if (
    (ballX <= 20 && ballY + 20 >= player1Position && ballY <= player1Position + 80) ||
    (ballX >= gameBoard.clientWidth - 40 && ballY + 20 >= player2Position && ballY <= player2Position + 80)
  ) {
    ballSpeedX *= -1;
  }

  // Check for left and right side collisions (scoring)
  if (ballX <= 0 || ballX >= gameBoard.clientWidth - 20) {
    ballX = 390;
    ballY = 190;
    ballSpeedX = 3 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
  }

  // Update paddles positions
  player1.style.top = player1Position + "px";
  player2.style.top = player2Position + "px";
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // Request next animation frame
  requestAnimationFrame(update);
}

// Function to handle player controls
function handleControls(event) {
  // Player 1 controls
  if (event.key === "w" && player1Position > 0) {
    player1Position -= 10;
  } else if (event.key === "s" && player1Position < gameBoard.clientHeight - 80) {
    player1Position += 10;
  }

  // Player 2 controls
  if (event.key === "ArrowUp" && player2Position > 0) {
    player2Position -= 10;
  } else if (event.key === "ArrowDown" && player2Position < gameBoard.clientHeight - 80) {
    player2Position += 10;
  }
}

// Start the game on pressing the "Enter" key
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    requestAnimationFrame(update);
    document.addEventListener("keydown", handleControls);
  }
});