import { parseInput, parseAny } from '../util';

const example = parseAny("example2");
const input = parseInput();

let data = input;

// Part 2
const instructions = data[0].split("");
data = data.splice(2,data.length - 2);

const elements = data.map((item) => {
    const a = item.split(" = ");
    const b = a[1].split(", ");
    return {
        node: a[0],
        L: b[0].split("(")[1],
        R: b[1].split(")")[0]
    };
})

const isAllZ = (locations: string[]): boolean => {
    const i = locations.filter((x) => x.split("")[2] == "Z");
    return i.length == locations.length;
}

let locations = elements.filter((x) => x.node.split("")[2] == "A").map((x) => x.node);

let instructionIndex = 0;
let counter = 0;

while (!isAllZ(locations)) {
    if (instructionIndex >= instructions.length) {
        instructionIndex = 0;
    }
    let instruction = instructions[instructionIndex];
    for (let i in locations) {
        let location = locations[i]
        const element = elements.filter((x) => x.node == location);
        if (instruction == "R") {
            locations[+i] = element[0].R;
        } else {
            locations[+i] = element[0].L;
        }
    }
    
    instructionIndex++;
    counter++;
}


// Solution
module.exports = {
    default: counter
}

type Element = {
    node: string,
    L: string,
    R: string
}