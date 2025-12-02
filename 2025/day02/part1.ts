import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

let data = input[0].split(",");
let count = 0;
for (let row of data) {
    const sp = row.split("-");
    for (let i = Number(sp[0]); i <= Number(sp[1]); i++) {
        const s = i.toString();
        const halfIndex = s.length / 2;
        if (s.length % 2 > 0) {
            continue;
        }
        if (s.substring(0, halfIndex) == s.substring(halfIndex, s.length)) {
            count += Number(i);
        }
    }
}


// Solution
module.exports = {
    default: count
}

