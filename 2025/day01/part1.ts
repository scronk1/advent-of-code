import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

let start = 50;
let count = 0;
for (let row of input) {
    const dir = row.substring(0,1);
    let num = Number(row.substring(1));
    if (num > 100) {
        const a = num / 100;
        num = Math.round((a - Math.floor(a)) * 100);
    }
    if (dir == "L") {
        start -= num;
    }
    if (dir == "R") {
        start += num;
    }
    if (start >= 100) {
        start -= 100;
    }
    if (start < 0) {
        start += 100;
    }
    if (start === 0) {
        count += 1;
    }
}


// Solution
module.exports = {
    default: count
}
