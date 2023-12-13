import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

// Part 1
let patterns = [];
let pattern = [];
for (let i in data) {
    const row = data[i];
    if (+i == data.length - 1) {
        pattern.push(row);
        patterns.push(pattern);
        pattern = [];
    } else if (row != "") {
        pattern.push(row);
    } else if (row == "") {
        patterns.push(pattern);
        pattern = [];
    }
}

export const checkHorizontal = (pattern: string[]): number => {
    for (let i=1; i <= pattern.length - 1; i++) {
        const min = Math.min(i, pattern.length - i);
        const above = pattern.slice(i - min, i);
        const below = pattern.slice(i, i + min);

        // forces a string comparison, not a reference comparison
        if (JSON.stringify(above.reverse()) == JSON.stringify(below)) {
            return i;
        }
    }
    return -1;
}

const buildArrays = (pattern: string[], start: number, end: number): string[] => {
    // console.log(start, end);
    let flipped = [];
    for (let i = start; i <= end - 1; i++) {
        let row = "";
        for (let val of pattern) {
            row+= val[+i];
        }
        flipped.push(row);
    }
    return flipped;
}

export const checkVertical = (pattern: string[]): number => {
    for (let i=1; i <= pattern[0].length - 1; i++) {
        const min = Math.min(i, pattern[0].length - i);
        const left = buildArrays(pattern, i - min, i);
        const right = buildArrays(pattern, i, i + min);
        // console.log(i, left.length, right.length);

        // forces a string comparison, not a reference comparison
        if (JSON.stringify(left.reverse()) == JSON.stringify(right)) {
            return i;
        }
    }
    return -1;
}

let sum = 0;
patterns.forEach((pattern, index) => {
    const v = checkVertical(pattern);
    const h = checkHorizontal(pattern);
    if (v >= 0) {
        sum += v;
    }
    if (h >= 0) {
        sum += (100 * h);
    }
})



// 29372 - too high - check all reflections
// 29165 - correct!
// 12672 - too low - v else h

// Solution
module.exports = {
    default: sum
}

type TShoot = {
    p: string[],
    v: number,
    h: number
}