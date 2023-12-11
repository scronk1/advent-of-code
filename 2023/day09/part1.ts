import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

// Part 1

let sum = 0;

for (let row of data) {
    const og = row.split(" ").map((x: string) => +x);
    let collection = [og];
    let current = og;
    while (Math.max(...current) != Math.min(...current)) {
        current = current.map((x: number, i: number) => {
            if (i != current.length - 1) {
                return current[i + 1] - x;
            }
        }).filter((x: number) => x != undefined);
        collection.push(current);
    }
    collection = collection.reverse();

    collection.forEach((value, index) => {
        if (index != collection.length - 1) {
            const rev = value.reverse();
            const v = collection[index + 1].length - 1;
            collection[index + 1].push(rev[0] + collection[index + 1][v]);
        }
    });
    
    const val = collection.reverse()[0].reverse()[0];
    sum += val;
}




// Solution
module.exports = {
    default: sum
}
