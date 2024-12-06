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
  history: Point[] = [];
  constructor(x: number, y: number, direction: Direction) {
    super(x, y);
    this.direction = direction;
    this.history = [new Point(x, y)];
  }
  public move = (x: number, y: number) => {
    const alreadyCaptured = this.history.find(
      (point) => point.x == x && point.y == y
    );
    if (!alreadyCaptured) {
      this.history.push(new Point(x, y));
    }
    this.x = x;
    this.y = y;
  };
}

let obstacles = [];
let guard = new Guard(0, 0, "^");
for (let i = 0; i < matrix.length; i++) {
  let row = matrix[i];
  for (let j = 0; j < row.length; j++) {
    if (row[j] === "#") {
      obstacles.push(new Point(j, i));
    }
    if (row[j] === "^") {
      guard = new Guard(j, i, row[j] as Direction);
    }
  }
}

const canGuardMove = (
  obstacles: Point[],
  guard: Guard,
  xMod: number,
  yMod: number,
  newDirection: Direction
) => {
  let test = obstacles.find(
    (a) => a.x == guard.x + xMod && a.y == guard.y + yMod
  );
  if (test) {
    guard.direction = newDirection;
  } else {
    guard.move(guard.x + xMod, guard.y + yMod);
  }
};

while (
  guard.x < matrix[0].length - 1 &&
  guard.y < matrix.length - 1 &&
  guard.x > 0 &&
  guard.y > 0
) {
  if (guard.direction == "^") {
    canGuardMove(obstacles, guard, 0, -1, ">");
  } else if (guard.direction == "V") {
    canGuardMove(obstacles, guard, 0, 1, "<");
  } else if (guard.direction == ">") {
    canGuardMove(obstacles, guard, 1, 0, "V");
  } else if (guard.direction == "<") {
    canGuardMove(obstacles, guard, -1, 0, "^");
  }
}

// Solution
module.exports = {
  default: guard.history.length,
};
