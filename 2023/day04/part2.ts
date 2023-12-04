import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

let data = input;

let cards: Card[] = [];

// Sort into types
for (let row of data) {
    const a = row.split(": ")[0].split(" ");
    const cardNo = +a[a.length - 1];

    const nos = row.split(": ")[1].split(" | ");
    const winning = nos[0].split(" ").filter((x: string) => x != "");
    const have = nos[1].split(" ").filter((x: string) => x != "");
    const matches = have.filter((x: string) => winning.indexOf(x) >= 0);

    cards.push({
        cardNo: cardNo,
        matches: matches.length,
        copies: 1
    });
}

// Add multiple cards
for (let card of cards) {
    for (let j=1; j <= card.copies; j++) {
        for (let i=card.cardNo + 1; i <= card.cardNo + card.matches; i++) {
            const matchedCard = cards.filter((x) => x.cardNo == i)[0];
            matchedCard.copies += 1;
        }
    }
}

let sum = 0;
for (let card of cards) {
    sum += card.copies;
}

// Solution
module.exports = {
    default: sum
}

type Card = {
    cardNo: number;
    matches: number;
    copies: number;
}