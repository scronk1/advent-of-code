import { parseInput, parseExample } from "../util";

const example = parseExample();
const input = parseInput();

const puzzle = input[0].split(" ").map((x: string) => Number(x));

const iterateChanges = (values: number[]) => {
  let newValues = [];
  for (let value of values) {
    const stringVal = value.toString();
    const l = stringVal.length;
    if (value === 0) {
      newValues.push(1);
    } else if (l % 2 === 0) {
      const a = Number(stringVal.slice(0, l / 2));
      const b = Number(stringVal.slice(l / 2, l));
      newValues.push(a);
      newValues.push(b);
    } else {
      newValues.push(value * 2024);
    }
  }
  return newValues;
};

let values = puzzle;
for (let i = 0; i < 25; i++) {
  values = iterateChanges(values);
}

// Solution
module.exports = {
  default: values.length,
};
