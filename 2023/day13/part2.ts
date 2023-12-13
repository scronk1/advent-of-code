import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

// Part 2

// Build input
let patterns: string[][] = [];
let pattern: string[] = [];
for (let i in data) {
    const row = data[i];
    if (+i == data.length - 1) {
        pattern.push(row);
        patterns.push(pattern);
        pattern = [];
    } else if (row != "") {
        pattern.push(row);
    } else if (row == "") {
        patterns.push(pattern);
        pattern = [];
    }
}

const checkHorizontal = (pattern: string[]): number => {
    for (let i=1; i <= pattern.length - 1; i++) {
        const min = Math.min(i, pattern.length - i);
        const above = pattern.slice(i - min, i);
        const below = pattern.slice(i, i + min);

        // forces a string comparison, not a reference comparison
        if (JSON.stringify(above.reverse()) == JSON.stringify(below)) {
            return i;
        }
    }
    return -1;
}

const checkVertical = (pattern: string[]): number => {
    for (let i=1; i <= pattern[0].length - 1; i++) {
        const min = Math.min(i, pattern[0].length - i);
        const left = buildArrays(pattern, i - min, i);
        const right = buildArrays(pattern, i, i + min);

        // forces a string comparison, not a reference comparison
        if (JSON.stringify(left.reverse()) == JSON.stringify(right)) {
            return i;
        }
    }
    return -1;
}

const checkAllHorizontal = (pattern: string[]): number[] => {
    let h = [];
    for (let i=1; i <= pattern.length - 1; i++) {
        const min = Math.min(i, pattern.length - i);
        const above = pattern.slice(i - min, i);
        const below = pattern.slice(i, i + min);

        // forces a string comparison, not a reference comparison
        if (JSON.stringify(above.reverse()) == JSON.stringify(below)) {
            h.push(i);
        }
    }
    return h;
}

const buildArrays = (pattern: string[], start: number, end: number): string[] => {
    let flipped = [];
    for (let i = start; i <= end - 1; i++) {
        let row = "";
        for (let val of pattern) {
            row+= val[+i];
        }
        flipped.push(row);
    }
    return flipped;
}

const checkAllVertical = (pattern: string[]): number[] => {
    let v = [];
    for (let i=1; i <= pattern[0].length - 1; i++) {
        const min = Math.min(i, pattern[0].length - i);
        const left = buildArrays(pattern, i - min, i);
        const right = buildArrays(pattern, i, i + min);

        // forces a string comparison, not a reference comparison
        if (JSON.stringify(left.reverse()) == JSON.stringify(right)) {
            v.push(i);
        }
    }
    return v;
}

let reflections: Reflection[] = [];
patterns.forEach((pattern, index) => {
    const v = checkVertical(pattern);
    const h = checkHorizontal(pattern);
    if (v >= 0) {
        reflections.push({
            value: v,
            type: "V"
        });
    }
    if (h >= 0) {
        reflections.push({
            value: h,
            type: "H"
        });
    }
})

const swapVal = (row: string, j: number, newVal: string) => {
    const spl = row.split("");
    spl.splice(+j, 1, newVal);
    return spl.join("");
}

const checkForSmudges = (pattern: string[], index: number): Reflection | undefined => {
    for (let i in pattern) {
        let row = pattern[+i].split("");
        for (let j in row) {
            const oldVal = `${row[j]}`;
            pattern[+i] = swapVal(pattern[+i], +j, oldVal == "#" ? "." : "#");
            
            const allV = checkAllVertical(pattern);
            const allH = checkAllHorizontal(pattern);

            pattern[+i] = swapVal(pattern[+i], +j, oldVal);
            const newV = allV.filter((x) => {
                if (reflections[+index].value == x && reflections[+index].type == "V") {
                    return false;
                } else {
                    return true;
                }
            });
            const newH = allH.filter((x) => {
                if (reflections[+index].value == x && reflections[+index].type == "H") {
                    return false;
                } else {
                    return true;
                }
            });


            if (newV.length > 0) {
                return {
                    value: newV[0],
                    type: "V"
                }
            }
            
            if (newH.length > 0) {
                return {
                    value: newH[0],
                    type: "H"
                };
            }
        }
    }
}


let sum = 0;
patterns.forEach((pattern, index) => {
    
    const response = checkForSmudges(pattern, index);
    if (response) {
        if (response.type == "H") {
            sum += (100 * response.value);
        }
        if (response.type == "V") {
            sum += response.value;
        }
    }
})

// 14338 - too low
// 29580 - by logic will be too low
// 32091 - too low
// 32192 - CORRECT
// 42287 - too high

// Solution
module.exports = {
    default: sum
}

type Reflection = {
    value: number,
    type: string
}