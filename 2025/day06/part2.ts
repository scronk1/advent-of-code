import { parseInput, parseExample } from "../util";
import { Problem } from "./part1";

const example = parseExample();
const input = parseInput();

let data = input;

let problems: Problem[] = [];
let problem: Problem = {
  vals: [],
  operator: "",
};
for (let i = 0; i < data[0].length; i++) {
  let col = data.map((row: string) => row[i]).join("");
  let numberCol = Number(col);
  if (col.split(" ").filter((x: string) => x !== "").length == 0) {
    problems.push(problem);
    problem = {
      vals: [],
      operator: "",
    };
    continue;
  }
  if (Number.isNaN(numberCol)) {
    problem.operator = col[col.length - 1];
    col = col.slice(0, -1);
  }
  problem.vals.push(Number(col));
}
problems.push(problem);

let count = 0;
for (let problem of problems) {
  if (problem.operator == "+") {
    count += problem.vals.reduce((sum, current) => sum + current, 0);
  } else {
    count += problem.vals.reduce((product, current) => product * current, 1);
  }
}

console.log(problems)

// Solution
module.exports = {
  default: count,
};
