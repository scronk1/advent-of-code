import { parseInput, parseExample, arraysEqual } from "../util";

const example = parseExample()[0].split("");
const input = parseInput()[0].split("");

const puzzle = example;

const isEven = (n: number) => {
  return n === 0 || !!(n && !(n % 2));
};

const visualise = (testValues: (Space | Block)[]) => {
  let ahh = "";
  for (let value of testValues) {
    for (let i = 0; i < value.length; i++) {
      if (value instanceof Space) {
        ahh += ".";
      } else if (value instanceof Block) {
        ahh += value.id.toString();
      }
    }
  }
  console.log(ahh.slice(0, 150));
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
    values.push(new Block(id, value * Number(id.toString().length)));
    id += 1;
  } else {
    if (value !== 0) {
      values.push(new Space(value));
    }
  }
}

visualise(values);

let blocks = [...values]
  .filter((x) => x instanceof Block)
  .sort((n1, n2) => {
    if ("id" in n1 && "id" in n2) {
      return n2.id - n1.id;
    }
    return 0;
  });

const runThrough = (inputValues: (Space | Block)[]) => {
  let tempValues = [...inputValues];
  const block = blocks[0];
  console.log(block);
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
        return tempValues;
      } else if (block.length < value.length) {
        tempValues.splice(
          tempValues.indexOf(block),
          1,
          new Space(block.length)
        );
        tempValues[i] = block;
        tempValues.splice(i + 1, 0, new Space(value.length - block.length));
        return tempValues;
      }
    }
  }
  return tempValues;
};

const condenseSpaces = (testValues: (Space | Block)[]) => {
  for (let k = 0; k < testValues.length - 1; k++) {
    const val = testValues[k];
    if (val instanceof Space && testValues[k + 1] instanceof Space) {
      testValues[k] = new Space(val.length + testValues[k + 1].length);
      testValues.splice(k + 1, 1);
    }
  }
  return testValues;
};

let newValues = runThrough(values);
while (blocks.length > 0) {
  const v = runThrough(newValues);
  const k = condenseSpaces(v);
  newValues = k;
  blocks.splice(0, 1);
}

visualise(newValues);

let index = -1;
let sum = 0;
for (let value of newValues) {
  if (value instanceof Block) {
    for (let x = 1; x <= value.length; x++) {
      let pos = index + x;
      sum += pos * value.id;
    }
  }
  index += value.length;
}

// Solution
module.exports = {
  default: sum,
};

// 15769158320781 - too high
// 15769158320781
// 15769158320781
// 148844622305722