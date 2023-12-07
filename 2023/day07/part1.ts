import { parseInput, parseExample } from '../util';

const example = parseExample();
const input = parseInput();

const data = input;

const order = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

enum Hands {
    FIVE = "FIVE",
    FOUR = "FOUR",
    FULL = "FULL",
    THREE = "THREE",
    TWO = "TWO",
    ONE = "ONE",
    HIGH = "HIGH"
}

const handOrder = [
    Hands.FIVE,
    Hands.FOUR,
    Hands.FULL,
    Hands.THREE,
    Hands.TWO,
    Hands.ONE,
    Hands.HIGH
];

const getHandType = (cards: string[]): Hands => {
    const uniqueCards = cards.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });
    if (uniqueCards.length == 1) {
        return Hands.FIVE;
    } else if (uniqueCards.length == 2) {
        const a = cards.filter((x) => x == uniqueCards[0]);
        const b = cards.filter((x) => x == uniqueCards[1]);
        if (a.length == 4 || b.length == 4) {
            return Hands.FOUR
        } else {
            return Hands.FULL;
        }
    } else if (uniqueCards.length == 3) {
        const i = cards.filter((x) => x == uniqueCards[0]);
        const j = cards.filter((x) => x == uniqueCards[1]);
        const k = cards.filter((x) => x == uniqueCards[2]);
        if (i.length == 3 || j.length == 3 || k.length == 3) {
            return Hands.THREE;
        } else {
            return Hands.TWO;
        }
    } else if (uniqueCards.length == 4) {
        return Hands.ONE;
    } else {
        return Hands.HIGH;
    }
}

// Part 1
let hands: Hand[] = [];

for (let rawHand of data) {
    const a = rawHand.split(" ");
    const hand = {
        cards: a[0].split(""),
        bid: +a[1],
        handType: getHandType(a[0].split(""))
    };
    hands.push(hand);
}

// 0 if same
// if n1 > n2 return -1
// if n1 < n2 return +1
hands.sort((hand1: Hand, hand2: Hand) => {
    const index1 = handOrder.indexOf(hand1.handType);
    const index2 = handOrder.indexOf(hand2.handType);

    if (index1 > index2) {
        return -1;
    } else if (index1 < index2) {
        return +1;
    } else {
        for (let i in hand1.cards) {
            const card1 = hand1.cards[i];
            const cardI1 = order.indexOf(card1);

            const card2 = hand2.cards[i];
            const cardI2 = order.indexOf(card2);
            
            if (cardI1 > cardI2) {
                return -1;
            } else if (cardI1 < cardI2) {
                return +1;
            }
        }
    }
    return 0;
});

let sum = 0;

for (let i in hands) {
    sum += (+i + 1) * hands[i].bid;
}

// too low - 250,024,667
//           250,024,667
// correct - 250232501


// Solution
module.exports = {
    default: sum
}

type Hand = {
    cards: string[];
    bid: number;
    handType: Hands;
}

