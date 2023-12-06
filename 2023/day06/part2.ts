import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

// Part 1
let raceTime = data[0].split(" ").filter((x: string) => x != "");
raceTime.splice(0, 1);
raceTime = raceTime.join("");
let distance = data[1].split(" ").filter((x: string) => x != "")
distance.splice(0, 1);
distance = distance.join("");

let product = 1;

let myDistances = [];
for (let j=0; j<= raceTime; j++) {
    myDistances.push(j * (raceTime - j));
}
myDistances = myDistances.filter((x) => x > distance);
product *= myDistances.length;

// Solution
module.exports = {
    default: product
}
