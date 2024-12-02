import { parseInput, parseExample } from "../util";

const example = parseExample();
const input = parseInput();

function arraysEqual(a: number[], b: number[]) {
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const isIncOrDec = (report: number[]) => {
  const asc = [...report].sort((n1,n2) => n1 - n2);
  const desc = [...asc].reverse();
  return arraysEqual(asc, report) || arraysEqual(desc, report);
};

// TODO: Complete Part 1
let count = 0;
input.forEach((row) => {
  const report = row.split(" ").map((x: string) => Number(x));
  const isIncreasingOrDecreasing = isIncOrDec([...report]);
  let areLevelsVariantEnough = true;
  for (let i = 0; i < report.length; i++) {
    const x = report[i];
    if (i == report.length - 1) {
      break;
    }
    const diff = Math.abs(x - report[i + 1]);
    if (diff < 1 || diff > 3) {
      areLevelsVariantEnough = false;
      break;
    }
  }
  if (isIncreasingOrDecreasing && areLevelsVariantEnough) {
    count += 1;
  }
});

// Solution
module.exports = {
  default: count,
};
