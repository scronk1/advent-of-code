// @ts-nocheck
import { parseAny } from '../util';

const data = "input";

const rawSeeds = parseAny(`${data}/seeds`);
const seedToSoil = parseAny(`${data}/seed-to-soil`);
const soilToFert = parseAny(`${data}/soil-to-fert`);
const fertToWater = parseAny(`${data}/fert-to-water`);
const waterToLight = parseAny(`${data}/water-to-light`);
const lightToTemp = parseAny(`${data}/light-to-temp`);
const tempToHum = parseAny(`${data}/temp-to-hum`);
const humToLoc = parseAny(`${data}/hum-to-loc`);

// SECOND ATTEMPT - go in reverse, start at zero location and iterate up until you find a valid seed

const allSeeds = rawSeeds[0].split(" ");

const checkRangeHacky = (row: string, seed: number) => {
    const vals = row.split(" ");
    const sourceStart = +vals[0]
    const destStart = +vals[1];
    const range = +vals[2];
    if (seed >= sourceStart && +seed <= sourceStart + range - 1) {
        return seed - sourceStart + destStart;
    } else {
        return -1;
    }
}

const getNextMappingHacky = (data: string[], x: string, y: string, seed: SeedValues) => {
    for (let a of data) {
        const dest = checkRangeHacky(a, seed[x]);
        if (dest >= 0) {
            seed[y] = dest;
            break;
        }
    }
    if (seed[y] < 0) {
        seed[y] = seed[x];
    }
}

const checkRealSeed = (seed: number) => {
    for (let f=0; f <= (allSeeds.length / 2) - 1; f++) {
        const start = +allSeeds[2*f];
        const range = +allSeeds[2*f + 1];
        if (seed >= start && seed <= start + range - 1) {
            return seed;
        }
    }
    return -1;
}



let k = -1;
let seed = -1;
while (seed == -1) {
    k++;
    if (k % 1000000 === 0) {
        console.log(k);
    }
    let tempSeed = {
        seed: -1,
        soil: -1,
        fert: -1,
        water: -1,
        light: -1,
        temp: -1,
        hum: -1,
        loc: k,
    }
    getNextMappingHacky(humToLoc, "loc", "hum", tempSeed);
    getNextMappingHacky(tempToHum, "hum", "temp", tempSeed);
    getNextMappingHacky(lightToTemp, "temp", "light", tempSeed);
    getNextMappingHacky(waterToLight, "light", "water", tempSeed);
    getNextMappingHacky(fertToWater, "water", "fert", tempSeed);
    getNextMappingHacky(soilToFert, "fert", "soil", tempSeed);
    getNextMappingHacky(seedToSoil, "soil", "seed", tempSeed);
    const testSeed = checkRealSeed(tempSeed.seed);
    if (testSeed >= 0) {
        seed = testSeed;
    }
}

console.log(k);


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

