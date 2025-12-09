import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();
let data = input;

let max = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = i; j < data.length; j++) {
    let iPoint = data[i].split(",").map((x: string) => Number(x));
    let jPoint = data[j].split(",").map((x: string) => Number(x));
    let area = Math.abs((iPoint[0] - jPoint[0] + 1) * (iPoint[1] - jPoint[1] + 1));
    if (area > max) {
      max = area;
    }
  }
}


// Solution
module.exports = {
  default: max
}
