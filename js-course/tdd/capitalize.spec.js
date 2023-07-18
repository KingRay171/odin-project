import capitalize from "./capitalize";
test("capitalizes string", () => {
  expect(capitalize("hey")).toEqual("Hey");
});
