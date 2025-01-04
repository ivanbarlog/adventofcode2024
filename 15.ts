const input = `......................D....B...h..................
..............................h...................
.............D...3.....X..................9.......
...........C........X....2.hB......v........b.....
....................................O.............
......u.....3.........p...........................
....u......................v....6.................
......................y..D.....Ov.2..............b
.....u..........X...........o........y............
.........................y...B.f...........s......
.7....................C.2.....Bsyp..........t...q.
.u.7...........X............................Oe..t.
...........V........3......6v.s........o....h....t
..E........L.................6..........o......9..
........E......m.2.P.......O...9...8....b.........
..m..........3.......p..........M8................
..1.....................K.p....................b.e
5...............L...........s.6..........S.M......
....5..1.......E.........k.f.........M............
.E..Y..V......l.......T...D.......9....Q..........
..............................M...................
.....5....P................m...x..q......F......e.
................f...c......................x..F...
..V.C...........7.......a....o....8.........F.....
.......4....L.a..g..P.....8......Q....7d..........
...1......4..a............k......t...d............
..........V..........L....m........K....Q........S
..................1....k.....T....................
..........l......a...............F................
...........P...4.......l......x...................
.............c....g........T......................
.....g............c...Q.......................S...
...............l..................A.d.T.U.........
..........................f...0.............d.....
..........G..................A............e.S...x.
.........Y.......q........g....K..................
.....................q.H4...0.................j...
....................HA..............J.............
..Y..........................0...J.......j........
.......................G.JA...................U...
.......5..........................................
...........c..............G.........K.............
...............................G..................
...........................0.j....................
............................H.......k..........U..
.........................H........................
...................................Y....J.........
..................................j...............
..................................................
..................................................`;

type Coordinate = { x: number; y: number };

const matrix = input.split("\n").map((row) => row.split(""));

const map = new Map<string, Coordinate[]>();
const filled = new Set<string>();
const antiNodes = new Set<string>();
const maxY = matrix.length - 1;
const maxX = matrix[0].length - 1;

function canAddAntiNode({ x, y }: Coordinate) {
  if (x < 0) return false;
  if (y < 0) return false;
  if (x > maxX) return false;
  if (y > maxY) return false;

  return true;
}

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    const cell = matrix[y][x];
    if (cell === ".") continue;

    const coordinates = map.get(cell) ?? [];
    map.set(cell, [...coordinates, { x, y }]);
    filled.add(`${x}:${y}`);
  }
}

function toPairs(coordinates: Coordinate[]) {
  const combinations = new Array<[x: Coordinate, y: Coordinate]>();
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      combinations.push([coordinates[i], coordinates[j]]);
    }
  }

  return combinations;
}

for (const coordinates of map.values()) {
  const pairs = toPairs(coordinates);

  for (const [left, right] of pairs) {
    const yDiff = left.y - right.y;
    const xDiff = left.x - right.x;

    const antinode1 = toAntiNodeCoordinate({
      node: left,
      xDiff,
      yDiff,
    });

    const antinode2 = toAntiNodeCoordinate({
      node: right,
      xDiff: xDiff * -1,
      yDiff: yDiff * -1,
    });

    if (canAddAntiNode(antinode1))
      antiNodes.add(`${antinode1.x}:${antinode1.y}`);
    if (canAddAntiNode(antinode2))
      antiNodes.add(`${antinode2.x}:${antinode2.y}`);
  }
}

function toAntiNodeCoordinate(props: {
  node: { x: number; y: number };
  xDiff: number;
  yDiff: number;
}) {
  return {
    x:
      props.xDiff > 0
        ? props.node.x + Math.abs(props.xDiff)
        : props.node.x - Math.abs(props.xDiff),
    y:
      props.yDiff > 0
        ? props.node.y + Math.abs(props.yDiff)
        : props.node.y - Math.abs(props.yDiff),
  };
}

console.log(antiNodes.size);
