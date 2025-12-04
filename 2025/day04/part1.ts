import { parseInput, parseExample, getMatrix } from "../util";

const example = parseExample();
const input = parseInput();

const matrix = getMatrix(input);

const canRemoveRoll = (matrix: string[][], i: number, j: number) => {
  let count = 0;
  let coords = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];
  for (let coord of coords) {
    try {
      if (matrix[coord[0]][coord[1]] == "@") {
        count += 1;
        if (count == 4) {
          return false;
        }
      }
    } catch {
      continue;
    }
  }

  return true;
};

let rolls = [];
for (let i = 0; i <= matrix.length - 1; i++) {
  for (let j = 0; j <= matrix[0].length - 1; j++) {
    if (matrix[i][j] === "@") {
      let isAccessible = canRemoveRoll(matrix, i, j);
      if (isAccessible) {
        rolls.push([i, j]);
      }
    }
  }
}

// Solution
module.exports = {
  default: rolls,
};
