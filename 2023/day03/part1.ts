import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;


// Get coords of all symbols
const symbols: Coords[] = []
for (let i in data) {
    const row = data[i];
    const items = [...row];
    for (let j in items) {
        const item = items[j];
        if (item != "." && !Number.isInteger(+item)) {
            symbols.push({
                i: +i,
                j: +j
            });
        }
    }
}

// Get numbers near symbols
const nos = [];
let sum = 0;
for (let i in data) {
    const row = data[i];
    const items = [...row];
    let startIndex = -1;
    let nearby = false;
    for (let j in items) {
        const item = items[j];
        if (Number.isInteger(+item)) {
            if (startIndex < 0) {
                startIndex = +j;
            }
            const nearbySymbols = symbols.filter((x: Coords) => Math.abs(x.i - +i) <= 1 && Math.abs(x.j - +j) <= 1);
            if (nearbySymbols.length > 0) {
                nearby = true;
            }
        } else {
            if (startIndex >= 0 && nearby) {
                const val = row.substring(startIndex, +j);
                nos.push(+val);
                sum += +val;
            }
            startIndex = -1;
            nearby = false;
        }
    }
}

console.log(nos.filter((x) => x == 297));


// Solution
module.exports = {
    default: sum
}

// incorrect - 537,066 - too low

type Coords = {
    i: number,
    j: number
}