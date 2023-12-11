import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

// Part 2

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
            collection[index + 1].unshift(collection[index + 1][0] - value[0]);
        }
    });
    
    const val = collection.reverse()[0][0];
    sum += val;
}




// Solution
module.exports = {
    default: sum
}
