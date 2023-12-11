import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

let grid = []

// let S = [2, 0]
let S = [94, 98]

// Part 1
for (let row of data) {
    grid.push(row.split(""));
}

// y, x
let end = false;
// let direction = "up";
let direction = "right";
// let current = [2, 1]
let current = [94, 99];
let counter = 1;
while (!end) {
    let x = current[1];
    let y = current[0];
    
    if (grid[y][x] == "F") {
        if (direction == "up") {
            current = [y, x + 1];
            direction = "right";
        } else {
            current = [y + 1, x];
            direction = "down";
        }
    } else if (grid[y][x] == "7") {
        if (direction == "up") {
            current = [y, x - 1];
            direction = "left";
        } else {
            current = [y + 1, x];
            direction = "down";
        }
    } else if (grid[y][x] == "J") {
        if (direction == "down") {
            current = [y, x - 1];
            direction = "left";
        } else {
            current = [y - 1, x];
            direction = "up";
        }
    } else if (grid[y][x] == "L") {
        if (direction == "down") {
            current = [y, x + 1];
            direction = "right";
        } else {
            current = [y - 1, x];
            direction = "up";
        }
    } else if (grid[y][x] == "-") {
        if (direction == "left") {
            current = [y, x - 1];
        } else {
            current = [y, x + 1];
        }
    } else if (grid[y][x] == "|") {
        if (direction == "up") {
            current = [y - 1, x];
        } else {
            current = [y + 1, x];
        }
    }

    counter++;
    // console.log(current);
    if (current[0] == S[0] && current[1] == S[1]) {
        end = true;
    }
}


// Solution
module.exports = {
    default: counter / 2
}


    // // left
    // if (x > 0 && ["-", "F", "L"].includes(grid[y][x - 1]) && direction !== "right") {
    //     console.log("L")
    //     current = [y, x - 1];
    //     direction = "left";
    // }
    // // right
    // else if (x < grid[y].length - 1 && ["-", "7", "J"].includes(grid[y][x + 1]) && direction !== "left") {
    //     console.log("R")
    //     current = [y, x + 1];
    //     direction = "right";
    // }
    // // up
    // else if (y > 0 && ["|", "7", "F"].includes(grid[y - 1][x]) && direction !== "down") {
    //     console.log("U")
    //     current = [y - 1, x];
    //     direction = "up";
    // }
    // // down
    // else if (y < grid.length - 1 && ["|", "J", "L"].includes(grid[y + 1][x]) && direction !== "up") {
    //     console.log("D")
    //     current = [y + 1, x];
    //     direction = "down";
    // }
