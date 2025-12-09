import { parseInput, parseExample } from "../util";

const example = parseExample();
const input = parseInput();
let data = example;

interface Tile {
  x: number;
  y: number;
}

let tiles: Tile[] = [];
for (let row of data) {
  const a = row.split(",").map((x: string) => Number(x));
  tiles.push({ x: a[0], y: a[1] });
}

let boundaryTiles: Tile[] = [];
for (let x = 0; x < tiles.length; x++) {
  try {
    let tile = tiles[x];
    let nextTile = tiles[x + 1];
    if (tile.x - nextTile.x == 0) {
      let start = tile.y > nextTile.y ? nextTile.y : tile.y;
      let end = tile.y > nextTile.y ? tile.y : nextTile.y;
      for (let k = start + 1; k < end; k++) {
        boundaryTiles.push({ x: tile.x, y: k });
      }
    } else if (tile.y - nextTile.y == 0) {
      let start = tile.x > nextTile.x ? nextTile.x : tile.x;
      let end = tile.x > nextTile.x ? tile.x : nextTile.x;
      for (let k = start + 1; k < end; k++) {
        boundaryTiles.push({ x: k, y: tile.y });
      }
    }
  } catch {
    break;
  }
}

let allEdgeTiles = [...tiles, ...boundaryTiles];

const betweenTwoPoints = (a: Tile, b: Tile, edge: Tile) => {
  return (a.x > edge.x && b.x < edge.x) || (a.x < edge.x && b.x > edge.x) || (a.y > edge.y && b.y < edge.y) || (a.y < edge.y && b.y > edge.y)
}

const checkIfCrossesBoundary = (a: Tile, b: Tile, i: Tile, j: Tile) => {
  for (let edge of allEdgeTiles) {
    if (betweenTwoPoints(a, i, edge) || betweenTwoPoints(i, b, edge) || betweenTwoPoints(b, j, edge) || betweenTwoPoints(j, a, edge)) {
      return true;
    }
  }
  return false;
}

let max = 0;
for (let i = 0; i < tiles.length; i++) {
  for (let j = i + 1; j < tiles.length; j++) {
    let iPoint = tiles[i];
    let jPoint = tiles[j];
    let area = Math.abs(
      (iPoint.x - jPoint.x + 1) * (iPoint.y - jPoint.y + 1)
    );
    if (area > max) {
      // get other corners
      let aPoint = { x: iPoint.x, y: jPoint.y };
      let bPoint = { x: jPoint.x, y: iPoint.y };
      // console.log(iPoint, jPoint, aPoint, bPoint);
      if (!checkIfCrossesBoundary(aPoint, bPoint, iPoint, jPoint)) {
        // console.log("fine");
        max = area;
      }
    }
  }
}

// Solution
module.exports = {
  default: max,
};
