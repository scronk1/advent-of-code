import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

// TODO: Complete Part 1
const left: number[] = [];
const right: number[] = [];
input.map((row) => {
    const vals = row.split("   ");
    left.push(Number(vals[0]));
    right.push(Number(vals[1]));
});
left.sort();
right.sort();

let sum = 0;
left.map((x, i) => {
    sum += Math.abs(x - right[i]);
})

// Solution
module.exports = {
    default: sum
}
