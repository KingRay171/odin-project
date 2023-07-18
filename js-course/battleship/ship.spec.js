import Ship from "./ship";

test("ship with length 2 goes down after 2 hits", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("sunk ships can't get hit", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
  expect(ship.numHits).toBe(2);
});
