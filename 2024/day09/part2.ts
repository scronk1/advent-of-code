import { parseInput, parseExample, arraysEqual } from "../util";

const example = parseExample()[0].split("");
const input = parseInput()[0].split("");

const puzzle = example;

const isEven = (n: number) => {
  return n === 0 || !!(n && !(n % 2));
};

class Block {
  id: number;
  length: number;
  constructor(id: number, length: number) {
    this.id = id;
    this.length = length;
  }
}

class Space {
  length: number;
  constructor(length: number) {
    this.length = length;
  }
}

let values: (Space | Block)[] = [];
let id = 0;
for (let i = 0; i < puzzle.length; i++) {
  const value = Number(puzzle[i]);
  if (isEven(i)) {
    values.push(new Block(id, value));
    id += 1;
  } else {
    if (value !== 0) {
      values.push(new Space(value));
    }
  }
}

let blocks = [...values].filter((x) => x instanceof Block).reverse();

const runThrough = (inputValues: (Space | Block)[]) => {
  let tempValues = [...inputValues];
  for (let j = 0; j < blocks.length; j++) {
    const block = blocks[j];
    const k = inputValues.indexOf(block);
    for (let i = 0; i < k; i++) {
      const value = inputValues[i];
      if (value instanceof Space) {
        if (value.length === block.length) {
          tempValues.splice(
            tempValues.indexOf(block),
            1,
            new Space(block.length)
          );
          tempValues[i] = block;
          blocks.splice(j, 1);
          return tempValues;
        } else if (block.length < value.length) {
          tempValues.splice(
            tempValues.indexOf(block),
            1,
            new Space(block.length)
          );
          tempValues[i] = block;
          tempValues.splice(i + 1, 0, new Space(value.length - block.length));
          blocks.splice(j, 1);
          return tempValues;
        }
      }
    }
    blocks.splice(j, 1);
    j = j - 1;
  }
};

let count = 0;
let loop = true;
let newValues = values;
while (loop) {
  count += 1;
  let v = runThrough(newValues);
  if (v) {
    newValues = v;
  }
  if (count === 10) {
    loop = false;
  }
}

let index = -1;
let sum = 0;
for (let value of newValues) {
  if (value instanceof Block) {
    for (let x = 1; x <= value.length; x++) {
      let pos = index + x;
      sum += pos*value.id
    }
  }
  index += value.length;
}

// Solution
module.exports = {
  default: sum,
};
