import { parseInput, parseExample } from "../util";

const example = parseExample();
const input = parseInput();
const data = input;

interface FreshnessRange {
  start: number;
  end: number;
}

const checkForOverlap = (ranges: FreshnessRange[], range: FreshnessRange) => {
  let interaction = false;
  for (let r of ranges) {
    if (range.start <= r.start && range.end >= r.end) {
      // new contains existing - rewrite existing
      r.start = range.start;
      r.end = range.end;
      interaction = true;
    } else if (
      range.start >= r.start &&
      range.start <= r.end &&
      range.end >= r.end
    ) {
      // extend end of range
      r.end = range.end;
      interaction = true;
    } else if (
      range.start <= r.start &&
      range.end >= r.start &&
      range.end <= r.end
    ) {
      // extend start of range
      r.start == range.start;
      interaction = true;
    } else if (range.start >= r.start && range.end <= r.end) {
      // existing contains new - skip
      interaction = true;
      continue;
    }
  }
  if (interaction) {
    return null;
  }
  return range;
};

const run = (ranges: FreshnessRange[]) => {
  let freshRanges: FreshnessRange[] = [];
  for (let row of ranges) {
    const response = checkForOverlap(freshRanges, row);
    if (response) {
      freshRanges.push(response);
    }
  }
  return freshRanges;
};

let ranges: FreshnessRange[] = [];
for (let row of data) {
  if (row == "") {
    break;
  }
  const a = row.split("-");
  ranges.push({ start: Number(a[0]), end: Number(a[1]) });
}

ranges.sort((a, b) => (a.start < b.start ? -1 : 1));
ranges = run(ranges);

let count = 0;
for (let r of ranges) {
  count += r.end - r.start + 1;
}

// Solution
module.exports = {
  default: count,
};
