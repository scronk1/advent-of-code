import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

let data = input;

// Part 1
const instructions = data[0].split("");
data = data.splice(2,data.length - 2);

const elements = [];
for (let item of data) {
    const a = item.split(" = ");
    const b = a[1].split(", ");
    elements.push({
        node: a[0],
        L: b[0].split("(")[1],
        R: b[1].split(")")[0]
    })
}

let counter = 0;
let location = "AAA";
let instructionIndex = 0;

while (location != "ZZZ") {
    if (instructionIndex >= instructions.length) {
        instructionIndex = 0;
    }
    let instruction = instructions[instructionIndex];
    const element = elements.filter((x) => x.node == location);
    if (instruction == "R") {
        location = element[0].R;
    } else {
        location = element[0].L;
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