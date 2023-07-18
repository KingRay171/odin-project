import Ship from "./ship.js";

class Gameboard {
  board;
  ships;
  constructor() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.ships = [];
  }
  addShip = (x, y, length) => {
    const ship = new Ship(length);
    this.ships.push(ship);
    const shipNum = this.ships.length;
    this.board[y][x] = shipNum;
    for (let i = 1; i < length; i++) {
      this.board[y][x + i] = shipNum;
    }
  };
  recieveAttack = (x, y) => {
    if (this.board[y][x] !== 0) {
      this.ships[this.board[y][x] - 1].hit();
      this.board[y][x] = -1 * this.board[y][x];
    } else {
      this.board[y][x] = "X";
    }
  };
  allShipsSunk = () => {
    return this.ships.every((e) => e.sunk);
  };
}

export default Gameboard;
