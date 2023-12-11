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
});

const isAllZ = (locations: string[]): boolean => {
    const i = locations.filter((x) => x.split("")[2] == "Z");
    return i.length == locations.length;
}

let locations = elements.filter((x) => x.node.split("")[2] == "A").map((x) => x.node);
let counters = [];

for (let startLocation of locations) {
    let instructionIndex = 0;
    let counter = 0;
    let location = startLocation;

    while (!isAllZ([location])) {
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
    console.log(counter);
    counters.push(counter);
}

// LCM of counters as they seem to loop
const lcm = (array: number[]) => {
    const gcd: any = (x: number, y: number) => (!y ? x : gcd(y, x % y));
    const _lcm = (x: number, y:number) => (x * y) / gcd(x, y);
    return array.reduce((a, b) => _lcm(a, b));
};


// Solution
module.exports = {
    default: lcm(counters)
}

type Element = {
    node: string,
    L: string,
    R: string
}