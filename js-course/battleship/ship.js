class Ship {
  length;
  numHits;
  sunk;
  constructor(length) {
    this.length = length;
    this.numHits = 0;
    this.sunk = false;
  }

  hit = () => {
    if (!this.sunk) this.numHits++;
    this.sunk = this.numHits >= this.length;
  };

  isSunk = () => {
    return this.sunk;
  };
}

export default Ship;
