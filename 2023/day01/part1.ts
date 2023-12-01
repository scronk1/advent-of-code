import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

// TODO: Complete Part 1

console.log(example)

let vals = []; 
for (let row of input) {
    let first;
    let second;
    for (let letter of [...row]) {
        if (Number.isInteger(Number(letter)) && letter != "") {
            if (first) {
                second = letter;
            } else {
                first = letter;
            }
        }
    }
    if (!second) {
        second = first;
    }
    vals.push(Number(`${first}${second}`));
}


// Solution
module.exports = {
    default: vals.reduce((a, b) => a + b, 0)
}
