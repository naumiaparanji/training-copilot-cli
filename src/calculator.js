#!/usr/bin/env node

// Supported binary operations: addition (+), subtraction (-), multiplication (*),
// division (/), modulo (%), and exponentiation (^).
function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new Error("Cannot divide by zero.");
  }

  return left / right;
}

function modulo(left, right) {
  if (right === 0) {
    throw new Error("Cannot modulo by zero.");
  }

  return left % right;
}

function power(base, exponent) {
  const result = base ** exponent;

  if (!Number.isFinite(result)) {
    throw new Error("Exponentiation result must be a finite number.");
  }

  return result;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot calculate the square root of a negative number.");
  }

  return Math.sqrt(n);
}

const exponentiate = power;

const operations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "%": modulo,
  "^": power,
};

function calculate(left, operator, right) {
  if (operator === "sqrt") {
    if (!Number.isFinite(left)) {
      throw new Error("The operand must be a valid finite number.");
    }

    return squareRoot(left);
  }

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error("Both operands must be valid finite numbers.");
  }

  if (!Object.hasOwn(operations, operator)) {
    throw new Error(`Unsupported operation: ${operator}`);
  }

  return operations[operator](left, right);
}

function main(args) {
  if (args.length === 2 && args[0] === "sqrt") {
    const value = Number(args[1]);

    try {
      console.log(calculate(value, "sqrt"));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }

    return;
  }

  if (args.length !== 3) {
    console.error(
      "Usage: node src/calculator.js <number> <+|-|*|/|%|^> <number> | sqrt <number>",
    );
    process.exitCode = 1;
    return;
  }

  const [leftInput, operator, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);

  try {
    console.log(calculate(left, operator, right));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  exponentiate,
  squareRoot,
  calculate,
  main,
};
