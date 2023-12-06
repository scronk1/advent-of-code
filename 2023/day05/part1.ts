// @ts-nocheck
import { parseAny } from '../util';

// const data = "input"
const data = "input";

const rawSeeds = parseAny(`${data}/seeds`);
const seedToSoil = parseAny(`${data}/seed-to-soil`);
const soilToFert = parseAny(`${data}/soil-to-fert`);
const fertToWater = parseAny(`${data}/fert-to-water`);
const waterToLight = parseAny(`${data}/water-to-light`);
const lightToTemp = parseAny(`${data}/light-to-temp`);
const tempToHum = parseAny(`${data}/temp-to-hum`);
const humToLoc = parseAny(`${data}/hum-to-loc`);


const checkRange = (row: string, seed: number) => {
    const vals = row.split(" ");
    const sourceStart = +vals[1]
    const destStart = +vals[0];
    const range = +vals[2];
    if (seed >= sourceStart && +seed <= sourceStart + range - 1) {
        return seed - sourceStart + destStart;
    } else {
        return -1;
    }
}

const getNextMapping = (data: string[], x: string, y: string, seed: SeedValues) => {
    for (let a of data) {
        const dest = checkRange(a, seed[x]);
        if (dest >= 0) {
            seed[y] = dest;
            break;
        }
    }
    if (seed[y] < 0) {
        seed[y] = seed[x];
    }
}


let seeds: SeedValues[] = [];
for (let seed of rawSeeds[0].split(" ")) {
    seeds.push({
        seed: +seed,
        soil: -1,
        fert: -1,
        water: -1,
        light: -1,
        temp: -1,
        hum: -1,
        loc: -1,
    })
}

for (let seed of seeds) {
    getNextMapping(seedToSoil, "seed", "soil", seed);
    getNextMapping(soilToFert, "soil", "fert", seed);
    getNextMapping(fertToWater, "fert", "water", seed);
    getNextMapping(waterToLight, "water", "light", seed);
    getNextMapping(lightToTemp, "light", "temp", seed);
    getNextMapping(tempToHum, "temp", "hum", seed);
    getNextMapping(humToLoc, "hum", "loc", seed);
}

let locs = [];
for (let seed of seeds) {
    locs.push(seed.loc);
}
locs.sort((n1,n2) => n1 - n2);

// Solution
module.exports = {
    default: locs[0]
}

console.log(locs);
// too high - 1,123,424,013
// correct - 525,792,406

type SeedValues = {
    seed: number;
    soil: number;
    fert: number;
    water: number;
    light: number;
    temp: number;
    hum: number;
    loc: number;
}