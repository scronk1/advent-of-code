import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

//
// Data parsing
//

export const parseInput = () => {
    return parseData("input");
}

export const parseExample = () => {
    return parseData("example");
}

export const parseAny = (fileName: string) => {
    return parseData(fileName);
}

export const parseData = (fileName: string): any[] => {
    const day = Number(process.env.DAY);
    const input = readFileSync(
        `${getDir(day)}/${fileName}.txt`,
        {
            encoding: 'utf-8',
        }
    );
    const unsani = input.split('\n');
    let sani = [];
    for (let row of unsani) {
        if (row.includes("\r")) {
            sani.push(row.substring(0, row.length - 1));
        } else {
            sani.push(row);
        }
    }
    return sani;
}

//
// Day Setup
//

export const dayExists = (day: number): boolean => existsSync(getDir(day) + "/part1.ts")

export const formatDay = (day: number | string) => day.toString().padStart(2, '0');

export const getTemplate = (part: 1 | 2) => `import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

// TODO: Complete Part ${part}


// Solution
module.exports = {
    default: 0
}
`;

export const setupDay = (day: number) => {
    const dir = getDir(day);
    console.log(`Setting up ${dir}`);
    mkdirSync(dir);
    writeFileSync(`${dir}/example.txt`, '');
    writeFileSync(`${dir}/input.txt`, '');
    writeFileSync(`${dir}/part1.ts`, getTemplate(1));
    writeFileSync(`${dir}/part2.ts`, getTemplate(2));
};

export const getDir = (day: number) => {
    return `./day${formatDay(day)}`;
}
