let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let player1 = 'X';
let player2 = 'O';
let currentPlayer = player1;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
  frameRate(1);
}

function draw() {
  background(220);
  let w = width / 3;
  let h = height / 3;

  // Draw the grid
  strokeWeight(4);
  line(w, 0, w, height); 
  line(2 * w, 0, 2 * w, height); 
  line(0, h, width, h); 
  line(0, 2 * h, width, 2 * h); 

  // Draw the X's and O's
  textSize(32);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let spot = board[i][j];
      let x = w * j + w / 2;
      let y = h * i + h / 2;
      text(spot, x, y);
    }
  }

  if (!gameOver) {
    makeRandomMove();
    checkWinner();
  }
}

function makeRandomMove() {
  // Find all empty spots
  let emptySpots = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        emptySpots.push({ i, j });
      }
    }
  }

  // If no empty spots are left, end the game
  if (emptySpots.length === 0) {
    gameOver = true;
    return;
  }

  
  let randomIndex = floor(random(emptySpots.length));
  let { i, j } = emptySpots[randomIndex];

  
  board[i][j] = currentPlayer;

  
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

function checkWinner() {
  let winner = null;

   
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
      winner = board[i][0];
    }
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
      winner = board[0][i];
    }
  }
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
    winner = board[0][0];
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
    winner = board[0][2];
  }

  // If there's a winner, end the game
  if (winner != null) {
    gameOver = true;
    console.log(winner + " wins!");
  }

 
  let emptySpots = board.flat().filter(spot => spot === '');
  if (winner == null && emptySpots.length === 0) {
    gameOver = true;
    console.log("It's a tie!");
  }
}