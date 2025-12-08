import { parseInput, parseExample } from "../util";

interface Box {
  id: number;
  x: number;
  y: number;
  z: number;
}

interface Circuit {
  id: number;
  boxIds: number[];
}

interface Distance {
  boxId1: number;
  boxId2: number;
  distance: number;
}

const example = parseExample();
const input = parseInput();
let data = input;

let boxes: Box[] = [];
for (let i = 0; i < data.length; i++) {
  let row = data[i];
  const coords = row.split(",");
  boxes.push({ id: Number(i), x: coords[0], y: coords[1], z: coords[2] });
}

let distances: Distance[] = [];
for (let j = 0; j < boxes.length; j++) {
  for (let k = j + 1; k < boxes.length; k++) {
    let jBox = boxes[j];
    let kBox = boxes[k];
    distances.push({
      boxId1: j,
      boxId2: k,
      distance: Math.sqrt(Math.pow(jBox.x - kBox.x, 2) + Math.pow(jBox.y - kBox.y, 2) + Math.pow(jBox.z - kBox.z, 2))
    })
  }
}

distances = distances.sort((a, b) => a.distance < b.distance ? -1 : 1);
let circuitId = 0;
let circuits: Circuit[] = [];
let x = 0;
while (x == 0 || (circuits.length > 0 && circuits[0].boxIds.length !== boxes.length)) {
  const connection = distances[x];
  const existingCircuits = circuits.filter((circuit) => circuit.boxIds.includes(connection.boxId1) || circuit.boxIds.includes(connection.boxId2));
  if (existingCircuits.length == 1) {
    let existingCircuit = existingCircuits[0];
    existingCircuit.boxIds.push(connection.boxId1);
    existingCircuit.boxIds.push(connection.boxId2);
    existingCircuit.boxIds = [... new Set(existingCircuit.boxIds)];
  } else if (existingCircuits.length == 2) {
    // use earliest as new main circuit
    existingCircuits[0].boxIds.push(connection.boxId1, connection.boxId2, ...existingCircuits[1].boxIds);
    existingCircuits[0].boxIds = [... new Set(existingCircuits[0].boxIds)];
    // remove spare circuit
    circuits = circuits.filter((x) => x.id !== existingCircuits[1].id);
  } else {
    circuits.push({ id: circuitId, boxIds: [connection.boxId1, connection.boxId2]});
    circuitId += 1;
  }
  circuits = circuits.sort((a, b) => a.boxIds.length < b.boxIds.length ? 1 : -1);
  x += 1;
}

let connection = distances[x - 1];
let box1 = boxes.find((x) => x.id == connection.boxId1);
let box2 = boxes.find((x) => x.id == connection.boxId2);

// Solution
module.exports = {
  default: box1 && box2 ? box1.x * box2.x : 0,
};

