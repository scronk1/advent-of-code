import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

// Part 1
const times = data[0].split(" ").filter((x: string) => x != "");
times.splice(0, 1);
const distances = data[1].split(" ").filter((x: string) => x != "")
distances.splice(0, 1);

let product = 1;

for (let i in times) {
    const time = +times[i];
    const recordDistance = +distances[i];
    let myDistances = [];
    for (let j=0; j<= time; j++) {
        myDistances.push(j * (time - j));
    }
    myDistances = myDistances.filter((x) => x > recordDistance);
    product *= myDistances.length;
}


// Solution
module.exports = {
    default: product
}
