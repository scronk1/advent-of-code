import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

let current = 50;
let count = 0;
for (let row of input) {
    const dir = row.substring(0,1);
    let num = Number(row.substring(1));
    let newVal = current;
    if (num > 100) {
        const a = num / 100;
        const b = Math.floor(a);
        num = Math.round((a - b) * 100);
        count += b;
    }
    if (dir == "L") {
        newVal -= num;
    }
    if (dir == "R") {
        newVal += num;
    }
    if (Math.abs(newVal) === 100) {
        newVal = 0;
    }
    if (newVal === 0) {
        count += 1;
    }
    if (newVal > 100) {
        newVal -= 100;
        if (current !== 0) {
            count += 1;
        }
    }
    if (newVal < 0) {
        newVal += 100;
        if (current !== 0) {
            count += 1;
        }
    }
    current = newVal;
}


// Solution
module.exports = {
    default: count
}
