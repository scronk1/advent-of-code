import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

let surface = [];
for (let row of data) {
    surface.push(row.split(""));
}

// Part 1

const rollRock = (data: string[], i: number, j: number) => {
    let blocked = false;
    let moved = 0;
    while (!blocked) {
        if (i == 0 || i - moved - 1 < 0) {
            break;
        }
        let next = data[i - moved - 1][j];
        if (next == ".") {
            moved++; 
        } else {
            blocked = true;
        }
    }
    return moved;
}

let load = 0;
for (let i in surface) {
    const row = surface[i];
    for (let j in row) {
        if (surface[+i][+j] == "O") {
            const m = rollRock(surface, +i, +j)
            surface[+i][+j] = ".";
            surface[+i - m][+j] = "O";
            load += surface.length - (+i - m);
        }
    }
}

// Visualise
// for (let row of surface) {
//     console.log(row.join(""));
// }


// Solution
module.exports = {
    default: load
}
