import { parseInput, parseExample, getMatrix } from "../util";

const example = parseExample();
const input = parseInput();

interface Point {
  x: number;
  y: number;
}

const matrix = getMatrix(input);
const height = matrix.length;
const width = matrix[0].length;

let trailheads: Point[] = [];
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    let p = { x: j, y: i };
    if (matrix[i][j] === "0" && !trailheads.includes(p)) {
      trailheads.push({ x: j, y: i });
    }
  }
}

const findNextPoint = (x: number, y: number, index: number) => {
  const nextPoints = [];
  if (y - 1 >= 0 && Number(matrix[y - 1][x]) == index) {
    nextPoints.push({ x: x, y: y - 1 });
  }
  if (x - 1 >= 0 && Number(matrix[y][x - 1]) == index) {
    nextPoints.push({ x: x - 1, y: y });
  }
  if (y + 1 < height && Number(matrix[y + 1][x]) == index) {
    nextPoints.push({ x: x, y: y + 1 });
  }
  if (x + 1 < width && Number(matrix[y][x + 1]) == index) {
    nextPoints.push({ x: x + 1, y: y });
  }
  return nextPoints;
};

const recurFindingPoints = (
  nextPoints: Point[],
  accumulator: Point[],
  index: number
) => {
  let someNines: Point[] = [];
  for (let np of nextPoints) {
    const newNp = findNextPoint(np.x, np.y, index);
    if (index == 9 && newNp.length > 0) {
      for (let item of newNp) {
        someNines.push(item);
      }
    } else {
      const response = recurFindingPoints(newNp, accumulator, index + 1);
      if (response.length > 0) {
        for (let item of response) {
          accumulator.push(item);
        }
      }
    }
  }
  return someNines;
};

let sum = 0;
for (let trailhead of trailheads) {
  let nines: Point[] = [];
  recurFindingPoints([trailhead], nines, 1);
  sum += nines.length;
}

// Solution
module.exports = {
  default: sum,
};
