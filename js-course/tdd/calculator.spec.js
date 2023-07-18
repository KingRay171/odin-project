import calculator from "./calculator";

test("2 + 2 is 4", () => {
  expect(calculator.add(2, 2)).toBe(4);
});

test("2 * 2 is 4 as well", () => {
  expect(calculator.multiply(2, 2)).toBe(4);
});

test("2 and 2 are the same number, right?", () => {
  expect(calculator.subtract(2, 2)).toBe(0);
});

test("Hmmm... one more time to make sure", () => {
  expect(calculator.divide(2, 2)).toBe(1);
});
