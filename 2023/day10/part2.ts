import { parseInput, parseAny } from '../util';

let version = 3;

let data = []
if (version <= 2) {
    data = parseAny(`example${version + 2}`);
} else {
    data = parseInput();
}

let grid: string[][] = []

const config = [
    {
        s: [1,1],
        replacement: "F",
        current: [1,2],
        direction: "right"
    },
    {
        s: [4,12],
        replacement: "F",
        current: [4,13],
        direction: "right"
    },
    {
        s: [0,4],
        replacement: "7",
        current: [1,4],
        direction: "down"
    },
    {
        s: [94, 98],
        replacement: "-",
        current: [94, 99],
        direction: "right"
    }
]
let S = config[version].s;

// Part 2
for (let row of data) {
    grid.push(row.split(""));
}
// replace the S
grid[S[0]][S[1]] = config[version].replacement;




// y, x
let end = false;

let direction = config[version].direction;

let current = config[version].current;

let loop: number[][] = [current];

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

    loop.push(current);

    if (current[0] == S[0] && current[1] == S[1]) {
        end = true;
    }
}

const checkBorder = (loop: number[][], i: number, j: number): boolean => {
    return loop.filter((a) => a[0] == i && a[1] == j).length > 0;
}

// VISUALISE THE LOOP
let visLoop = [];
for (let i in grid) {
    let row = [];
    for (let j in grid[i]) {
        if (checkBorder(loop, +i, +j)) {
            row.push("#");
        } else {
            row.push(".");
        }
    }
    visLoop.push(row.join(""));
}
// console.log(visLoop);



let counter = 0;

// FIND ALL POINTS
// x = j
// y = i
// y, x
// i, j
for (let i in grid) {
    let inside = false;
    let opener = "";
    for (let j in grid[i]) {
        const value = grid[i][j];
        // on a border
        if (checkBorder(loop, +i, +j)) {
            // always flips
            if (value == "|") {
                inside = !inside;
            }
            // starts border section
            if (value == "F" || value == "L") {
                opener = value;
            }
            // closes border section and flips
            if ((opener == "F" && value == "J") || (opener == "L" && value == "7")) {
                opener = "";
                inside = !inside;
            }
            // closes border section and DOESN'T flip
            if ((opener == "F" && value == "7") || (opener == "L" && value == "J")) {
                opener = "";
            }
        } else {
            // count inside sections
            if (inside) {
                counter++;
            }
        }
    }
}


// Solution
module.exports = {
    default: counter
}