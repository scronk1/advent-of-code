import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

// Get coords of all gears
const gears: Gear[] = []
for (let i in data) {
    const row = data[i];
    const items = [...row];
    for (let j in items) {
        const item = items[j];
        if (item == "*") {
            gears.push({
                i: +i,
                j: +j,
                nearby: []
            });
        }
    }
}

// Get numbers near gears
for (let i in data) {
    const row = data[i];
    const items = [...row];
    let startIndex = -1;
    let nearby: Gear[] = [];
    for (let j in items) {
        const item = items[j];
        if (Number.isInteger(+item)) {
            if (startIndex < 0) {
                startIndex = +j;
            }
            const nearbyGears= gears.filter((x: Gear) => Math.abs(x.i - +i) <= 1 && Math.abs(x.j - +j) <= 1);
            if (nearbyGears.length > 0) {
                nearby = nearbyGears;
            }
            if (+j == items.length - 1 && startIndex >= 0 && nearby) {
                for (let gear of nearby) {
                    gear.nearby.push(row.substring(startIndex, +j + 1))
                }
            }
        } else {
            if (startIndex >= 0 && nearby.length > 0) {
                for (let gear of nearby) {
                    gear.nearby.push(row.substring(startIndex, +j))
                }
            }
            startIndex = -1;
            nearby = [];
        }
    }
}

// sum only the official gears
let sum = 0;

for (let gear of gears) {
    if (gear.nearby.length == 2) {
        const ratio = +gear.nearby[0] * +gear.nearby[1];
        sum += ratio;
    }
}


// Solution
module.exports = {
    default: sum
}


export type Gear = {
    i: number,
    j: number,
    nearby: number[]
}