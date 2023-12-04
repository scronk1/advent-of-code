import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const getGameNo = (game: string) => {
    const a = game.split(" ")[1];
    return a.substring(0, a.length - 1)
}

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

// TODO: Complete Part 1
for (let game of input) {
    const gameNo = +getGameNo(game);
    const formGame = game.split(": ")[1].split("; ").join(", ").split(", ")
    
    const blue = formGame.filter((x: string) => x.includes("blue"));
    const blueMax = getMax(blue);
    
    const red = formGame.filter((x: string) => x.includes("red"));
    const redMax = getMax(red);
    
    const green = formGame.filter((x: string) => x.includes("green"));
    const greenMax = getMax(green);

    if (redMax <= 12 && blueMax <= 14 && greenMax <= 13) {

        sum += gameNo;
    }
}



// 12 red
// 13 green
// 14 blue




// Solution
module.exports = {
    default: sum
}
