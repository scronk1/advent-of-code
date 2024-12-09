import { parseInput, parseExample } from "../util";

const example = parseExample();
const input = parseInput();

const puzzle = input;

class AntennaType {
  a: Antenna[];
  value: string;
  constructor(a: Antenna[], value: string) {
    this.a = a;
    this.value = value;
  }

  public add = (newA: Antenna) => {
    this.a.push(newA);
  };
}

class Antenna {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const height = puzzle.length;
const width = puzzle[0].length;

let antennaTypes: AntennaType[] = [];
for (let i = 0; i < puzzle.length; i++) {
  const row = puzzle[i];
  for (let j = 0; j < row.length; j++) {
    if (row[j] !== ".") {
      const match = antennaTypes.find((x) => x.value == row[j]);
      if (match) {
        match.add(new Antenna(j, i));
      } else {
        antennaTypes.push(new AntennaType([new Antenna(j, i)], row[j]));
      }
    }
  }
}

const checkBounds = (point: Antenna) => {
  return point.x >= 0 && point.y >= 0 && point.x < width && point.y < height;
};

let antiNodes: { x: number; y: number }[] = [];
for (let antennaType of antennaTypes) {
  if (antennaType.a.length > 1) {
    for (let first of antennaType.a) {
      for (let second of antennaType.a) {
        if (first.x !== second.x && first.y !== second.y) {
          const diffX = first.x - second.x;
          const diffY = first.y - second.y;

          let firstDirection = { x: first.x, y: first.y };
          while (checkBounds(firstDirection)) {
            if (
              !antiNodes.find((k) => k.x == firstDirection.x && k.y == firstDirection.y)
            ) {
              antiNodes.push(firstDirection);
            }
            firstDirection = {
              x: firstDirection.x + diffX,
              y: firstDirection.y + diffY,
            };
          }

          let secondDirection = { x: second.x, y: second.y};
          while (checkBounds(secondDirection)) {
            if (
              !antiNodes.find((k) => k.x == secondDirection.x && k.y == secondDirection.y)
            ) {
              antiNodes.push(secondDirection);
            }
            secondDirection = {
              x: secondDirection.x - diffX,
              y: secondDirection.y - diffY,
            };
          }
        }
      }
    }
  }
}

// Solution
module.exports = {
  default: antiNodes.length,
};
