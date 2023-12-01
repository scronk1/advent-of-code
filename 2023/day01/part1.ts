import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

// TODO: Complete Part 1

let vals = []; 
for (let row of input) {
    const digits = [...row].filter((x) => Number.isInteger(Number(x)));
    let first = digits[0];
    let last = digits[digits.length - 1];
    vals.push(Number(`${first}${last}`));
}


// Solution
module.exports = {
    default: vals.reduce((a, b) => a + b, 0)
}
