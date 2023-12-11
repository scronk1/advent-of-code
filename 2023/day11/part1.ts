import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

// Part 1

// Duplicate necessary rows
let almostSpace = [];
for (let i in data) {
    if (data[i].split("").indexOf("#") < 0) {
        almostSpace.push(data[i].split(""));
    }
    almostSpace.push(data[i].split(""));
}

let space: string[][] = [];

for (let j=0; j < almostSpace.length; j++) {
    space.push([]);
}

// Duplicate necessary columns
for (let i=0; i < almostSpace[0].length; i++) {
    let relevant: string[] = [];
    for (let row of almostSpace) {
        relevant.push(row[i]);
    }
    const galaxies = relevant.filter((x) => x == "#");
    if (galaxies.length == 0) {
        for (let j in almostSpace) {
            space[j].push(relevant[j]);
            space[j].push(relevant[j]);
        }
    } else {
        for (let j in almostSpace) {
            space[j].push(relevant[j]);
        }
    }
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


// VISUALISE GALAXY

let visSpace = [];
for (let row of space) {
    visSpace.push(row.join(""));
}
// console.log(visSpace)


// Get the distances
let sum = 0;
for (let coords of galaxies) {
    const value = +space[coords[0]][coords[1]];
    for (let i = 1; i <= galaxies.length - value; i++) {
        let comparedCoords = galaxies[value + i - 1];
        const diff = Math.abs(coords[0] - comparedCoords[0]) + Math.abs(coords[1] - comparedCoords[1]);
        sum += diff;
    }
}

// Solution
module.exports = {
    default: sum
}
