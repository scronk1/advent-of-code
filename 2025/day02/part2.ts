import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const getFactors = (x: number) => Array.from(Array(x + 1), (_, k) => k).filter(k => x % k === 0 && x !== k)

let data = input[0].split(",");
let count = 0;
for (let row of data) {
    const sp = row.split("-");
    for (let i = Number(sp[0]); i <= Number(sp[1]); i++) {
        const s = i.toString();
        let factors = getFactors(s.length);
        for (let f of factors) {
            const removeDupes = [...new Set(s.match(new RegExp(`.{1,${f}}`, "g")))];
            if (removeDupes.length == 1) {
                count += Number(i);
                break;
            }
        }
    }
}


// Solution
module.exports = {
    default: count
}

