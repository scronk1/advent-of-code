import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

let jolts = 0;
for (let row of input) {
    let bank: number[] = row.split("").map((x: string) => Number(x));
    let highest = Math.max(...bank);
    let highestIndex = bank.indexOf(highest);
    if (highestIndex === bank.length -1) {
        highest = [...bank].sort().reverse()[1];
        highestIndex = bank.indexOf(highest);
    }
    let remaining = bank.slice(highestIndex + 1, bank.length);
    let secondHighest = Math.max(...remaining);
    let joltage = Number([highest, secondHighest].join(""));
    jolts += joltage;
}


// Solution
module.exports = {
    default: jolts
}
