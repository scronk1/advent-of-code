import { parseInput, parseExample, getMatrix } from "../util";

const example = parseExample();
const input = parseInput();

const matrix = getMatrix(input);

type Direction = "^" | "V" | ">" | "<";

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Guard extends Point {
  direction: Direction;
  constructor(x: number, y: number, direction: Direction) {
    super(x, y);
    this.direction = direction;
  }
}

let rawObstacles = [];
let rawGuard = new Guard(0, 0, "^");
for (let i = 0; i < matrix.length; i++) {
  let row = matrix[i];
  for (let j = 0; j < row.length; j++) {
    if (row[j] === "#") {
      rawObstacles.push(new Point(j, i));
    }
    if (row[j] == "^") {
      rawGuard = new Guard(j, i, row[j] as Direction);
    }
  }
}

const canGuardMove = (obstacles: Point[], guard: Guard, xMod: number, yMod: number, newDirection: Direction) => {
  let test = obstacles.filter(
    (a) => a.x == guard.x + xMod && a.y == guard.y + yMod
  );
  if (test.length > 0) {
    guard.direction = newDirection;
  } else {
    guard.x = guard.x + xMod;
    guard.y = guard.y + yMod;
  }
};

const testObstruction = (
  startX: number,
  startY: number,
  obstacles: Point[]
) => {
  let safetyCount = 0;
  let SAFETY_LIMIT = 10_000;
  let guard = new Guard(startX, startY, "^");
  while (
    guard.x < matrix[0].length - 1 &&
    guard.y < matrix.length - 1 &&
    guard.x > 0 &&
    guard.y > 0
  ) {
    safetyCount += 1;
    if (guard.direction == "^") {
      canGuardMove(obstacles, guard, 0, -1, ">")
    } else if (guard.direction == "V") {
      canGuardMove(obstacles, guard, 0, 1, "<");
    } else if (guard.direction == ">") {
      canGuardMove(obstacles, guard, 1, 0, "V");
    } else if (guard.direction == "<") {
      canGuardMove(obstacles, guard, -1, 0, "^");
    }
    if (safetyCount === SAFETY_LIMIT) {
      return false;
    }
  }
  return guard;
};

let loopObstructionCount = 0;
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (rawGuard.x == j && rawGuard.y == i) {
      continue;
    }
    const result = testObstruction(rawGuard.x, rawGuard.y, [...rawObstacles, new Point(j, i)]);
    if (!result) {
      loopObstructionCount += 1;
    }
  }
}

// Solution
module.exports = {
  default: loopObstructionCount,
};
