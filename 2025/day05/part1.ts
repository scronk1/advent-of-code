import { parseInput, parseExample } from "../util";

const example = parseExample();
const input = parseInput();

const checkIfFresh = (ranges: number[][], ingredient: number) => {
  for (let r of ranges) {
    if (r[0] <= ingredient && ingredient <= r[1]) {
      return true;
    }
  }
  return false;
};

let ranges = [];
let freshIngredients = [];
let detectRanges = true;
for (let row of input) {
  if (row == "") {
    detectRanges = false;
  }
  if (detectRanges) {
    const a = row.split("-");
    ranges.push([Number(a[0]), Number(a[1])]);
  } else {
    let i = Number(row);
    if (checkIfFresh(ranges, i)) {
      freshIngredients.push(i);
    }
  }
}

// Solution
module.exports = {
  default: freshIngredients.length,
};
