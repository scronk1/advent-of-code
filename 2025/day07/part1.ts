import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

let data = input;

let sIndex = data[0].split("").indexOf("S");
let beams = [sIndex];
let splitCount = 0;
for (let i = 2; i<= data.length - 1; i++) {
  let newBeams = [];
  let row = data[i];
  for (let beam of beams) {
    if (row[beam] == "^") {
      newBeams.push(beam + 1);
      newBeams.push(beam - 1);
      splitCount += 1;
    } else {
      newBeams.push(beam);
    }
  }
  // remove duplicates
  beams = [... new Set(newBeams)];
}

// Solution
module.exports = {
  default: splitCount
}
