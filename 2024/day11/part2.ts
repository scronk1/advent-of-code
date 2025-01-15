import { parseInput, parseExample } from "../util";

const example = parseExample();
const input = parseInput();

const puzzle: number[] = input[0].split(" ").map((x: string) => Number(x));

const iterateChanges = (values: number[]) => {
  return values.flatMap((value) => {
    const stringVal = value.toString();
    const l = stringVal.length;
    if (value === 0) {
      return [1];
    } else if (l % 2 === 0) {
      const a = Number(stringVal.slice(0, l / 2));
      const b = Number(stringVal.slice(l / 2, l));
      return [a, b];
    } else {
      return [value * 2024];
    }
  });
};

// const recur = (subset: number[], accumulator: number) => {
//   if (subset.length >= 100_000) {
//     let chunkSize = 1000;
//     for (let j = 0; j < subset.length; j+= chunkSize) { 
//       const chunk = subset.slice(j, j + chunkSize);
//       recur(chunk, accumulator);
//     }
//   } else {
//     accumulator += iterateChanges(subset).length;
//   }
// }

// first 25
let values = puzzle;
for (let i = 0; i < 25; i++) {
  values = iterateChanges(values);
}

let collatedTotal = 0;
for (let value of values) {
  let subset = [value];
  for (let i = 0; i < 25; i++) {
    subset = iterateChanges(subset);
  }
  for (let sub of subset) {
    let s = [sub];
    for (let j = 0; j < 25; j++) {
      s = iterateChanges(s);
      collatedTotal += s.length;
    }
  }
}


// Solution
module.exports = {
  default: values.length,
};