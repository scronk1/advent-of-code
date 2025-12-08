import { parseInput, parseExample } from '../util';

export interface Problem {
  vals: number[];
  operator: string;
}

const example = parseExample();
const input = parseInput();
let data = input;

const numberOfProbs = data[0].split(" ").filter((x: string) => x !== "").length;
let problems: Problem[] = [];
for (let x = 1; x<= numberOfProbs; x++) {
  problems.push({
    vals: [],
    operator: "",
  });
}

for (let row of data) {
  const s = row.split(" ").filter((x: string) => x !== "");
  for (let i = 0; i<s.length; i++) {
    let item = s[i];
    let a = Number(item);
    if (!Number.isNaN(a)) {
      problems[i].vals.push(a);
    } else {
      problems[i].operator = item;
    }
  }
}

let count = 0;
for (let problem of problems) {
  if (problem.operator == "+") {
    count += problem.vals.reduce((sum, current) => sum + current, 0);
  } else {
    count += problem.vals.reduce((product, current) => product * current, 1);
  }
}

// Solution
module.exports = {
  default: count
}
