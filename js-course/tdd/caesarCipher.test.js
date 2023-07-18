import caesarCipher from "./caesarCipher";

test("works as intended", () => {
  expect(caesarCipher("abcdef", 1)).toBe("bcdefg");
});

test("works with different cases", () => {
  expect(caesarCipher("aAbBcCdD", 1)).toBe("bBcCdDeE");
});

test("skips commas", () => {
  expect(caesarCipher("a,,,,b,,,c", 1)).toBe("b,,,,c,,,d");
});
