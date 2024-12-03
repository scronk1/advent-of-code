import { parseInput, parseExample } from "../util";

const example = parseExample();
const input = parseInput();

const all = input;

let corrupted = all[0];
for (let i = 1; i < input.length; i++) {
  corrupted = corrupted.concat(all[i])
}

const regex = /mul\([0-9]+,[0-9]+\)/g;
const found = corrupted.match(regex);

let sum = 0;
for (let item of found) {
  const numbs = item.slice(4);
  const vals = numbs.split(",");
  const left = Number(vals[0]);
  const right = Number(vals[1].slice(0, -1));
  sum += left * right;
}

// Solution
module.exports = {
  default: sum,
};
