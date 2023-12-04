import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

let sum = 0;

// TODO: Complete Part 1
for (let row of data) {
    const nos = row.split(": ")[1].split(" | ");
    const winning = nos[0].split(" ").filter((x: string) => x != "");
    const have = nos[1].split(" ").filter((x: string) => x != "");
    

    const match = have.filter((x: string) => winning.indexOf(x) >= 0);
    let points = 0;
    if (match.length > 0) {
        points = Math.pow(2, match.length - 1);
    }
    sum += points;
}


// Solution
module.exports = {
    default: sum
}
