const { add, subtract, multiply, divide, calculate } = require("../calculator");

describe("calculator operations", () => {
  test.each([
    [2, 3, 5],
    [0, 0, 0],
    [-2, 3, 1],
    [1.5, 2.25, 3.75],
  ])("adds %s and %s", (left, right, expected) => {
    expect(add(left, right)).toBe(expected);
  });

  test.each([
    [10, 4, 6],
    [0, 0, 0],
    [-2, -3, 1],
    [5.5, 2.25, 3.25],
  ])("subtracts %s and %s", (left, right, expected) => {
    expect(subtract(left, right)).toBe(expected);
  });

  test.each([
    [45, 2, 90],
    [0, 10, 0],
    [-3, 4, -12],
    [1.5, 2, 3],
  ])("multiplies %s and %s", (left, right, expected) => {
    expect(multiply(left, right)).toBe(expected);
  });

  test.each([
    [20, 5, 4],
    [0, 5, 0],
    [-12, 3, -4],
    [7.5, 2.5, 3],
  ])("divides %s by %s", (left, right, expected) => {
    expect(divide(left, right)).toBe(expected);
  });

  test("rejects division by zero", () => {
    expect(() => divide(20, 0)).toThrow("Cannot divide by zero.");
    expect(() => divide(20, -0)).toThrow("Cannot divide by zero.");
    expect(() => calculate(20, "/", 0)).toThrow("Cannot divide by zero.");
  });

  test("rejects unsupported operations", () => {
    expect(() => calculate(2, "^", 3)).toThrow("Unsupported operation: ^");
  });

  test.each([
    [Number.NaN, "+", 1],
    [1, "+", Number.POSITIVE_INFINITY],
  ])("rejects non-finite operands", (left, operator, right) => {
    expect(() => calculate(left, operator, right)).toThrow(
      "Both operands must be valid finite numbers.",
    );
  });

  test.each([
    [2, "+", 3, 5],
    [10, "-", 4, 6],
    [45, "*", 2, 90],
    [20, "/", 5, 4],
  ])("calculates the image example %s %s %s", (left, operator, right, expected) => {
    expect(calculate(left, operator, right)).toBe(expected);
  });
});
