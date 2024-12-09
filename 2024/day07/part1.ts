import { parseInput, parseExample } from "../util";

const example = parseExample();
const input = parseInput();

const puzzle = input;


const buildPermutations = (count: number): string[][] => {
  if (count === 0) {
    return [[]];
  }
  const perms: string[][] = [];
  const oneSmallerPerm = buildPermutations(count - 1);
  for (const perm of oneSmallerPerm) {
    for (const operator of ["+", "*"]) {
      perms.push([...perm, operator]);
    }
  }

  return perms;
}

const checkEquations = (
  values: number[],
  perms: string[][],
  target: number
) => {
  for (let perm of perms) {
    const response = evaluateEquation(values, perm);
    if (response == target) {
      return true;
    }
  }
  return false;
};

const evaluateEquation = (values: number[], operators: string[]) => {
  let a = values[0];
  for (let i = 1; i < values.length; i++) {
    if (operators[i - 1] == "+") {
      a += values[i];
    } else if (operators[i - 1] == "*") {
      a *= values[i];
    }
  }
  return a;
};

let sum = 0;
for (let data of puzzle) {
  const a = data.split(":");
  const target = Number(a[0]);
  const values = a[1]
    .split(" ")
    .filter((x: string) => x !== "")
    .map((x: string) => Number(x));
  const noValues = values.length;
  let permutations: string[][] = buildPermutations(noValues - 1);

  const isValid = checkEquations(values, permutations, target);
  if (isValid) {
    sum += target;
  }
}

// Solution
module.exports = {
  default: sum,
};
