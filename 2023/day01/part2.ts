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

const makeString = (array: string[]) => {
    let result = "";
    for (let i of array) {
        result += i;
    }
    return result;
}

const isWrittenDigit = (array: string[], index: number, digit: string): boolean => {
    const arrayCopy = [...array];
    const short = arrayCopy.slice(index, index + digit.length);
    return makeString(short) == digit;
}

// TODO: Complete Part 2
let vals = []; 
for (let row of input) {
    let first = "";
    let last = "";
    let digits = [...row];
    digits.forEach((value, index) => {
        for (let written of ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]) {
            if (isWrittenDigit(digits, index, written)) {
                if (first) {
                    last = map[written];
                } else {
                    first = map[written];
                }
            }
        }
        if (Number.isInteger(Number(value)) && value != "") {
            if (first) {
                last = value;
            } else {
                first = value;
            }
        }
    })
    if (!last) {
        last = first;
    }
    vals.push(Number(`${first}${last}`));
}



// Solution
module.exports = {
    default: vals.reduce((a, b) => a + b, 0)
}
