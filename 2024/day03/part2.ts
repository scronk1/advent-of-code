import { parseInput, parseExample } from "../util";

const example = parseExample();
const input = parseInput();

const all = input;

let corrupted = all[0];
for (let i = 1; i < input.length; i++) {
  corrupted = corrupted.concat(all[i]);
}

const getAllIndexes = (corrupted: string, value: string) => {
  var indexes = [];
  let i = -1;
  while ((i = corrupted.indexOf(value, i + 1)) != -1) {
    indexes.push({
      index: i,
      value: value,
    });
  }
  return indexes;
};

const getValueFromMul = (item: string) => {
  const numbs = item.slice(4);
  const vals = numbs.split(",");
  const left = Number(vals[0]);
  const right = Number(vals[1].slice(0, -1));
  return left * right;
};

const mulRegex = /mul\([0-9]+,[0-9]+\)/g;
const mulFound = corrupted.match(mulRegex);
const muls = [];
for (let mul of mulFound) {
  muls.push({
    index: corrupted.indexOf(mul),
    value: mul,
  });
}
const dos = getAllIndexes(corrupted, "do()");
const donts = getAllIndexes(corrupted, "don't()");

let sum = 0;

let relevantValues = [...muls, ...dos, ...donts];
relevantValues.sort((n1, n2) => n1.index - n2.index);

let matching = true;
for (let item of relevantValues) {
  if (item.value == "don't()") {
    matching = false;
  }
  if (item.value == "do()") {
    matching = true;
  }
  if (matching && item.value.startsWith("mul(")) {
    sum += getValueFromMul(item.value);
  }
}

// Solution
module.exports = {
  default: sum,
};
