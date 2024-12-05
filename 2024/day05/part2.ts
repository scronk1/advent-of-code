import { parseInput, parseExample, arraysEqual } from "../util";

const example = parseExample();
const input = parseInput();

let rules = input;

const gapIndex = rules.indexOf("");
let updates = rules.splice(gapIndex + 1);
updates = updates.map((x) => x.split(",").map((y: string) => Number(y)));
rules.splice(-1);

let sum = 0;
for (let j = 0; j < updates.length; j++) {
  let newOrder = [...updates[j]];
  newOrder.sort((n1, n2) => {
    for (let i = 0; i < rules.length; i++) {
      const a = rules[i].split("|");
      const before = Number(a[0]);
      const after = Number(a[1]);
      if (before == n1 && after == n2) {
        return -1;
      }
      if (before == n2 && after == n1) {
        return 1;
      }
    }
    return 0;
  });
  if (!arraysEqual(newOrder, updates[j])) {
    console.log(newOrder);
    const val = newOrder[(newOrder.length - 1)/ 2];
    sum += val;
  }
}
// Solution
module.exports = {
  default: sum,
};
