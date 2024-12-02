import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

// TODO: Complete Part 2
const left: number[] = [];
const right: number[] = [];
input.map((row) => {
    const vals = row.split("   ");
    left.push(Number(vals[0]));
    right.push(Number(vals[1]));
});
let score = 0;
left.map((x) => {
    score += right.filter((y) => y == x).length * x;
});

// Solution
module.exports = {
    default: score
}
