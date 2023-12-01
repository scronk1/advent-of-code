import { parseInput, parseData } from '../util';

const example = parseData("example2");
const input = parseInput();

const map: Record<string, string> = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9"
}

const isWrittenDigit = (array: string[], index: number, digit: string): boolean => {
    const arrayCopy = [...array];
    const short = arrayCopy.slice(index, index + digit.length);
    return short.join("") == digit;
}

// TODO: Complete Part 2
let vals = []; 
for (let row of input) {
    let letters = [...row];
    let digits: string[] = []
    letters.forEach((value, index) => {
        for (let written of ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]) {
            if (isWrittenDigit(letters, index, written)) {
                digits.push(map[written]);
            }
        }
        if (Number.isInteger(Number(value)) && value != "") {
            digits.push(value);
        }
    })
    const first = digits[0];
    const last = digits[digits.length - 1];
    vals.push(Number(`${first}${last}`));
}


// Solution
module.exports = {
    default: vals.reduce((a, b) => a + b, 0)
}
