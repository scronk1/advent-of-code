import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();
let data = input;

const highestAppropriate = (bank: number[], digit: number, countRemoved: number) => {
    let highest = Math.max(...bank);
    let highestIndex = bank.indexOf(highest);
    // check is there room for the remaining digits to fit
    if (highestIndex > bank.length + countRemoved - 12 + digit - 1) {
        bank.splice(highestIndex, 1);
        return highestAppropriate(bank, digit, countRemoved + 1);
    }
    return highest;
}

let jolts = 0;
let digits = 12;
for (let row of data) {
    let bank: number[] = row.split("").map((x: string) => Number(x));
    let newBank = [...bank];
    let joltage = "";
    for (let j = 1; j <= digits; j++) {
        let nextHighest = highestAppropriate([...newBank], j, 0);
        let nextHighestIndex = newBank.indexOf(nextHighest);
        newBank = [...newBank].slice(nextHighestIndex + 1);
        joltage += nextHighest.toString();
    }
    jolts += Number(joltage);
}


// Solution
module.exports = {
    default: jolts
}
