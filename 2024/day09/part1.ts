import { parseInput, parseExample } from "../util";

const example = parseExample()[0].split("");
const input = parseInput()[0].split("");

const puzzle = input;

const isEven = (n: number) => {
  return n === 0 || !!(n && !(n % 2));
};

let values = [];
let id = 0;
for (let i = 0; i < puzzle.length; i++) {
  const value = Number(puzzle[i]);
  if (isEven(i)) {
    for (let j = 0; j < value; j++) {
      values.push(id);
    }
    id += 1;
  } else {
    for (let j = 0; j < value; j++) {
      values.push(".");
    }
  }
}

let sum = 0;
let valuesCopy = [...values].filter((x) => x !== ".");
const finishedLength = valuesCopy.length;

for (let i = 0; i < values.length; i++) {
  const v = values[i];
  if (i === finishedLength) {
    break;
  }
  if (v == ".") {
    let a = Number(valuesCopy.pop());
    sum += (i * a)
  } else {
    sum += (i * Number(v))
  }
}

// Solution
module.exports = {
  default: sum,
};
