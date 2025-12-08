import { parseInput, parseExample } from "../util";

interface Beam {
  index: number;
  count: number;
}

const example = parseExample();
const input = parseInput();

let data = input;

const condenseCounts = (beams: Beam[]) => {
  let newBeams = [];
  const allIndexes = [... new Set(beams.map((beam) => beam.index))];
  for (let index of allIndexes) {
    let count = beams.filter((beam: Beam) => beam.index == index).reduce((sum, current) => sum + current.count, 0);
    newBeams.push({
      index,
      count,
    })
  }
  return newBeams;
}

let sIndex = data[0].split("").indexOf("S");
let beams: Beam[] = [{ index: sIndex, count: 1 }];
for (let i = 2; i <= data.length - 1; i++) {
  let newBeams: Beam[] = [];
  let row = data[i];
  for (let beam of beams) {
    if (row[beam.index] == "^") {
      newBeams.push({ index: beam.index + 1, count: beam.count });
      newBeams.push({ index: beam.index - 1, count: beam.count });
    } else {
      newBeams.push(beam);
    }
  }
  beams = condenseCounts(newBeams);
}

// Solution
module.exports = {
  default: beams.reduce((sum, current) => sum + current.count, 0),
};
