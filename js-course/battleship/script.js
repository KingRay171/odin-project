import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const playerBoard = document.querySelector(".player-board");
const computerBoard = document.querySelector(".computer-board");
let playerGameboard = new Gameboard();
let computerGameboard = new Gameboard();
const gameOver = document.querySelector(".game-over");
const playAgain = document.querySelector(".restart");

const populateComputerDOM = () => {
  for (let i = 2; i < 6; i++) {
    let x = 0;
    let y = 0;
    while (computerGameboard.board[y].slice(x, x + i).some((e) => e !== 0)) {
      x = Math.round(Math.random() * (8 - i));
      y = Math.round(Math.random() * (8 - i));
      console.log(x);
    }
    computerGameboard.addShip(x, y, i);
  }
};

const populatePlayerDOM = () => {
  for (let i = 2; i < 6; i++) {
    let x = 0;
    let y = 0;
    while (playerGameboard.board[y].slice(x, x + i).some((e) => e !== 0)) {
      x = Math.round(Math.random() * (8 - i));
      y = Math.round(Math.random() * (8 - i));
      console.log(x);
    }
    playerGameboard.addShip(x, y, i);
    let childIdx = y * 8 + x;
    for (let j = childIdx; j < childIdx + i; j++)
      playerBoard.children[j].style.backgroundColor = "gray";
  }
};

const endGame = (player) => {
  gameOver.textContent = `${player} won!`;
  playAgain.style.visibility = "visible";
};

const playerTurn = (e) => {
  const idx = Array.from(computerBoard.children).indexOf(e.target);
  const row = Math.floor(idx / 8);
  const column = idx % 8;
  computerGameboard.recieveAttack(column, row);
  if (computerGameboard.board[row][column] === "X") {
    e.target.textContent = "X";
  } else {
    e.target.style.backgroundColor = "red";
  }
  if (computerGameboard.allShipsSunk()) {
    endGame("Player");
  }
  let computerAttack = Math.round(Math.random() * 64);
  while (
    playerGameboard.board[Math.floor(computerAttack / 8)][
      computerAttack % 8
    ] === "X" ||
    playerGameboard.board[Math.floor(computerAttack / 8)][computerAttack % 8] <
      0
  ) {
    computerAttack = Math.round(Math.random() * 64);
  }
  let computerRow = Math.floor(computerAttack / 8);
  let computerColumn = computerAttack % 8;
  playerGameboard.recieveAttack(computerColumn, computerRow);
  if (playerGameboard.board[computerRow][computerColumn] === "X") {
    playerBoard.children[computerAttack].textContent = "X";
  } else {
    playerBoard.children[computerAttack].style.backgroundColor = "red";
  }
  if (playerGameboard.allShipsSunk()) {
    endGame("Computer");
  }
  e.target.removeEventListener("click", playerTurn);
};

const initGame = () => {
  playerGameboard = new Gameboard();
  computerGameboard = new Gameboard();

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const tile = document.createElement("div");
      tile.addEventListener("click", playerTurn);

      computerBoard.appendChild(tile);
      const tile2 = document.createElement("div");
      playerBoard.appendChild(tile2);
    }
  }
  populateComputerDOM();
  populatePlayerDOM();
};

playAgain.addEventListener("click", () => {
  Array.from(playerBoard.children).forEach((e) => e.remove());
  Array.from(computerBoard.children).forEach((e) => e.remove());
  gameOver.textContent = "";
  playAgain.style.visibility = "hidden";
  initGame();
});

initGame();
