import { config } from 'dotenv';
import { dayExists, formatDay, setupDay } from './util';
config();

const day = Number(process.env.DAY);
const part = Number(process.env.PART);

if (dayExists(day)) {
    console.log(
        `Day ${day} | Part ${part} - Solution: ${
        require(`./day${formatDay(day)}/part${part}.js`).default
        }`
    );
} else {
    setupDay(day);
}