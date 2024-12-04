import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const matrix = [];
for (let item of input) {
    matrix.push(item.split(""));
}

const checkDirection = (matrix: string[][], i: number, j: number) => {
    try { 
        const forwardSlash = ["MS", "SM"].includes(matrix[i-1][j-1] + matrix[i+1][j+1]);
        const backSlash = ["MS", "SM"].includes(matrix[i-1][j+1] + matrix[i+1][j-1]);
        return (forwardSlash && backSlash);
    } catch {
        return false;
    }
}

let sum = 0;
for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
        if (row[j] == "A") {
            if (checkDirection(matrix, i, j)) {
                sum += 1;
            }
        }
    }
}


// Solution
module.exports = {
    default: sum
}
