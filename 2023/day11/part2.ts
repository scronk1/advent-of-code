import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

// Part 2

// Find duplicate rows
let dupRows = [];
for (let i in data) {
    if (data[i].split("").indexOf("#") < 0) {
        dupRows.push(+i);
    }
}

// Find duplicate columns
let dupColns = [];
for (let i=0; i < data[0].length; i++) {
    let relevant: string[] = [];
    for (let row of data) {
        relevant.push(row[i]);
    }
    const galaxies = relevant.filter((x) => x == "#");
    if (galaxies.length == 0) {
        dupColns.push(i);
    }
}

// Build space
let space = [];
for (let row of data) {
    space.push(row.split(""));
}

// Convert to numbers and get galaxies
let galaxies = []
let counter = 1;
for (let i in space) {
    for (let j in space[i]) {
        if (space[i][j] == "#") {
            space[i][j] = counter.toString();
            galaxies.push([+i, +j]);
            counter++;
        }
    }
}

// Get the distances
let sum = 0;
for (let coords of galaxies) {
    const value = +space[coords[0]][coords[1]];
    for (let i = 1; i <= galaxies.length - value; i++) {
        let comparedCoords = galaxies[value + i - 1];
        let diff = Math.abs(coords[0] - comparedCoords[0]) + Math.abs(coords[1] - comparedCoords[1]);
        for (let r of dupRows) {
            if ((coords[0] > r && comparedCoords[0] < r) || coords[0] < r && comparedCoords[0] > r) {
                diff += 999999;
            }
        }
        for (let c of dupColns) {
            if ((coords[1] > c && comparedCoords[1] < c) || coords[1] < c && comparedCoords[1] > c) {
                diff += 999999;
            }
        }
        sum += diff;
    }
}

// Solution
module.exports = {
    default: sum
}

// 82,000,210 too low
// 82,000,210
