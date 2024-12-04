import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const matrix = [];
for (let item of input) {
    matrix.push(item.split(""));
}

const checkDirection = (matrix: string[][], i: number[], j: number[]) => {
    try { 
        return (matrix[i[0]][j[0]] + matrix[i[1]][j[1]] + matrix[i[2]][j[2]]) == "MAS";
    } catch {
        return false;
    }
}

let sum = 0;
for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
        if (row[j] == "X") {
            // East
            if (checkDirection(matrix, [i,i,i], [j+1,j+2,j+3])) {
                sum += 1;
            }
            // West
            if (checkDirection(matrix, [i,i,i], [j-1,j-2,j-3])) {
                sum += 1;
            }
            // North
            if (checkDirection(matrix, [i-1,i-2,i-3], [j,j,j])) {
                sum += 1;
            }
            // South
            if (checkDirection(matrix, [i+1,i+2,i+3], [j,j,j])) {
                sum += 1;
            }
            // NorthEast
            if (checkDirection(matrix, [i-1,i-2,i-3], [j+1,j+2,j+3])) {
                sum += 1;
            }
            // SouthEast
            if (checkDirection(matrix, [i+1,i+2,i+3], [j+1,j+2,j+3])) {
                sum += 1;
            }
            // SouthWest
            if (checkDirection(matrix, [i+1,i+2,i+3], [j-1,j-2,j-3])) {
                sum += 1;
            }
            // NorthWest
            if (checkDirection(matrix, [i-1,i-2,i-3], [j-1,j-2,j-3])) {
                sum += 1;
            }
        }
    }
}


// Solution
module.exports = {
    default: sum
}
