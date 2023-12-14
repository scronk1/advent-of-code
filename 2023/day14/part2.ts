import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

// Build surface
let surface = [];
for (let row of data) {
    surface.push(row.split(""));
}

// Build list of rocks
let rocks = [];
for (let i in surface) {
    const row = surface[i];
    for (let j in row) {
        if (surface[+i][+j] == "O") {
            rocks.push({
                i: +i,
                j: +j
            });
        }
    }
}

// Part 2

const sortRocks = (rocks: Coords[], i: number, j: number): Coords[] => {
    // if rock1 < rock2 return +1
    // if rock1 > rock2 return -1
    rocks.sort((rock1: Coords, rock2: Coords) => {
        if (rock1.i > rock2.i) {
            return i * 1;
        } else if (rock1.i < rock2.i) {
            return i * -1;
        } else {
            return j * (rock1.j - rock2.j);
        }
    });
    return rocks;
}

const rollNorth = (data: string[][], i: number, j: number) => {
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

const rollSouth = (data: string[][], i: number, j: number) => {
    let blocked = false;
    let moved = 0;
    while (!blocked) {
        if (i == data.length - 1 || i + moved + 1 > data.length - 1) {
            break;
        }
        let next = data[i + moved + 1][j];
        if (next == ".") {
            moved++; 
        } else {
            blocked = true;
        }
    }
    return moved;
}

const rollWest = (data: string[][], i: number, j: number) => {
    let blocked = false;
    let moved = 0;
    while (!blocked) {
        if (j == 0 || j - moved - 1 < 0) {
            break;
        }
        let next = data[i][j - moved - 1];
        if (next == ".") {
            moved++; 
        } else {
            blocked = true;
        }
    }
    return moved;
}

const rollEast = (data: string[][], i: number, j: number) => {
    let blocked = false;
    let moved = 0;
    while (!blocked) {
        if (j == data.length - 1 || j + moved + 1 > data.length - 1) {
            break;
        }
        let next = data[i][j + moved + 1];
        if (next == ".") {
            moved++; 
        } else {
            blocked = true;
        }
    }
    return moved;
}

const performCycle = (rocks: Coords[], surface: string[][]): Surface => {
    let load = 0;
    rocks = sortRocks(rocks, 1, 1);
    for (let rock of rocks) {
        let i = rock.i;
        let j = rock.j;
    
        let a = i;
        let b = j;
    
        i = i - rollNorth(surface, i, j);
        surface[a][b] = ".";
        surface[i][j] = "O";
        
        rock.i = i;
        rock.j = j;
    }
    
    rocks = sortRocks(rocks, 1, 1);
    for (let rock of rocks) {
        let i = rock.i;
        let j = rock.j;
    
        let a = i;
        let b = j;
    
        j = j - rollWest(surface, i, j);
        surface[a][b] = ".";
        surface[i][j] = "O";
        
        rock.i = i;
        rock.j = j;
    }

    rocks = sortRocks(rocks, -1, -1);
    for (let rock of rocks) {
        let i = rock.i;
        let j = rock.j;
    
        let a = i;
        let b = j;
    
        i = i + rollSouth(surface, i, j);
        surface[a][b] = ".";
        surface[i][j] = "O";

        rock.i = i;
        rock.j = j;
    }
    
    rocks = sortRocks(rocks, -1, -1);
    for (let rock of rocks) {
        let i = rock.i;
        let j = rock.j;
    
        let a = i;
        let b = j;
    
        j = j + rollEast(surface, i, j);
        surface[a][b] = ".";
        surface[i][j] = "O";

        rock.i = i;
        rock.j = j;
    }

    for (let rock of rocks) {
        load += surface.length - rock.i;
    }
    return {
        load: load,
        rocks: rocks
    };
}

const copySurface = (surface: string[][]) => {
    let newSurface = [];
    for (let val of surface) {
        newSurface.push([...val])
    }
    return newSurface;
}

// Iterate through cycles, finding a pattern

const billion = 1000000000;

let prevSurfaces: string[] = [];
let matched = "";
let count = 1;
let load = 0;
let start = -1;
let stop = -1;
let cycle = -1;
while (count <= 10000) {
    prevSurfaces.push(JSON.stringify(copySurface(surface)));
    let r = performCycle(rocks, surface);
    rocks = r.rocks;
    load = r.load;
    if (count == stop) {
        break;
    }
    if (JSON.stringify(surface) == matched) {
        cycle = count - start;
        const noCycles = (billion - start) / cycle;
        const remainder = noCycles - Math.floor(noCycles);
        stop = start + cycle + Math.round(remainder * cycle);
    }
    if (prevSurfaces.includes(JSON.stringify(surface)) && matched == "") {
        matched = JSON.stringify(surface);
        start = count;
    }
    count++;
}

// Solution
module.exports = {
    default: load
}

type Coords = {
    i: number,
    j: number
}

type Surface = {
    load: number,
    rocks: Coords[]
}