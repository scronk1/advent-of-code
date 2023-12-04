import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const getMax = (colour: string[]) => {
    let max = 0;
    for (let value of colour) {
        const no = +value.split(" ")[0];
        if (no > max) {
            max = no;
        }
    }
    return max;
}

let sum = 0;

// TODO: Complete Part 2
for (let game of input) {
    const formGame = game.split(": ")[1].split("; ").join(", ").split(", ")
    
    const blue = formGame.filter((x: string) => x.includes("blue"));
    const blueMax = getMax(blue);
    
    const red = formGame.filter((x: string) => x.includes("red"));
    const redMax = getMax(red);
    
    const green = formGame.filter((x: string) => x.includes("green"));
    const greenMax = getMax(green);

    const power = redMax * blueMax * greenMax;
    console.log(power);

    sum += power;
}

// Solution
module.exports = {
    default: sum
}
