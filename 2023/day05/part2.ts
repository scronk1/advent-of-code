// @ts-nocheck
import { parseAny } from '../util';

const data = "example";

const rawSeeds = parseAny(`${data}/seeds`);
const seedToSoil = parseAny(`${data}/seed-to-soil`);
const soilToFert = parseAny(`${data}/soil-to-fert`);
const fertToWater = parseAny(`${data}/fert-to-water`);
const waterToLight = parseAny(`${data}/water-to-light`);
const lightToTemp = parseAny(`${data}/light-to-temp`);
const tempToHum = parseAny(`${data}/temp-to-hum`);
const humToLoc = parseAny(`${data}/hum-to-loc`);

const getRanges = (data: number[], sourceRange: number[]) => {
    let newRanges = [];
    for (let row of data) {
        row = row.split(" ");
        const range = +row[2];

        const sourceStart = +row[1];
        const sourceEnd = sourceStart + range - 1;

        const destStart = +row[0];
        const destEnd = destStart + range - 1;

        const overlapStart = (sourceStart < sourceRange[0] ? sourceRange[0]: sourceStart);
        const overlapEnd = (sourceEnd > sourceRange[1] ? sourceRange[1]: sourceEnd);

        if (overlapEnd > overlapStart) {
            newRanges.push([
                overlapStart - sourceStart + destStart,
                overlapEnd - sourceEnd + destEnd
            ]);
        }
    }
    tempSourceRanges = tempSourceRanges.sort((n1,n2) => n1[1] - n2[0]);
    return newRanges;
}

let minLocation = -1;

let seedRanges = [];
const allSeeds = rawSeeds[0].split(" ");
for (let i=0; i <= (allSeeds.length / 2) - 1; i++) {
    const start = +allSeeds[2*i];
    const range = +allSeeds[2*i + 1];
    seedRanges.push([start, start + range - 1]);
}

let soilRanges = [];
for (let seedRange of seedRanges) {
    const soil = getRanges(seedToSoil, seedRange);
    soilRanges = soilRanges.concat(soil);
}

// let fertRanges = [];
// for (let soilRange of soilRanges) {
//     const fert = getRanges(soilToFert, soilRange);
//     fertRanges = fertRanges.concat(fert);
// }

// let waterRanges = [];
// for (let fertRange of fertRanges) {
//     const water = getRanges(fertToWater, fertRange);
//     waterRanges = waterRanges.concat(water);
// }

// let lightRanges = [];
// for (let waterRange of waterRanges) {
//     const light = getRanges(waterToLight, waterRange);
//     lightRanges = lightRanges.concat(light);
// }

// let tempRanges = [];
// for (let lightRange of lightRanges) {
//     const light = getRanges(lightToTemp, lightRange);
//     tempRanges = tempRanges.concat(light);
// }

// Solution
module.exports = {
    default: minLocation
}

// test value - 525,792,406 -- too high
