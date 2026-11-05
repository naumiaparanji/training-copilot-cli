const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  exponentiate,
  squareRoot,
  calculate,
} = require("../calculator");

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

  test.each([
    [20, 6, 2],
    [5, 2, 1],
    [-7, 3, -1],
    [7.5, 2.5, 0],
  ])("calculates %s modulo %s", (left, right, expected) => {
    expect(modulo(left, right)).toBe(expected);
    expect(calculate(left, "%", right)).toBe(expected);
  });

  test("rejects modulo by zero", () => {
    expect(() => modulo(20, 0)).toThrow("Cannot modulo by zero.");
    expect(() => calculate(20, "%", 0)).toThrow("Cannot modulo by zero.");
  });

  test.each([
    [2, 3, 8],
    [5, 0, 1],
    [-2, 3, -8],
  ])("raises %s to the power of %s", (left, right, expected) => {
    expect(power(left, right)).toBe(expected);
    expect(exponentiate(left, right)).toBe(expected);
    expect(calculate(left, "^", right)).toBe(expected);
  });

  test("rejects invalid exponentiation results", () => {
    expect(() => power(-1, 0.5)).toThrow(
      "Exponentiation result must be a finite number.",
    );
    expect(() => calculate(0, "^", -1)).toThrow(
      "Exponentiation result must be a finite number.",
    );
  });

  test.each([
    [0, 0],
    [9, 3],
    [16, 4],
    [2.25, 1.5],
  ])("calculates the square root of %s", (value, expected) => {
    expect(squareRoot(value)).toBe(expected);
    expect(calculate(value, "sqrt")).toBe(expected);
  });

  test("rejects square roots of negative numbers", () => {
    expect(() => squareRoot(-1)).toThrow(
      "Cannot calculate the square root of a negative number.",
    );
    expect(() => calculate(-1, "sqrt")).toThrow(
      "Cannot calculate the square root of a negative number.",
    );
  });

  test("rejects division by zero", () => {
    expect(() => divide(20, 0)).toThrow("Cannot divide by zero.");
    expect(() => divide(20, -0)).toThrow("Cannot divide by zero.");
    expect(() => calculate(20, "/", 0)).toThrow("Cannot divide by zero.");
  });

  test("rejects unsupported operations", () => {
    expect(() => calculate(2, "?", 3)).toThrow("Unsupported operation: ?");
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
    [20, "%", 6, 2],
    [2, "^", 3, 8],
  ])("calculates the image example %s %s %s", (left, operator, right, expected) => {
    expect(calculate(left, operator, right)).toBe(expected);
  });
});
