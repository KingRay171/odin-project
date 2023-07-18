import reverse from "./reverseString";

test("reverses string", () => {
  expect(reverse("hello")).toBe("olleh");
});
