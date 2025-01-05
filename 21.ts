const input = `5 89749 6061 43 867 1965860 0 206250`;

const blinks = 25;
const stones = input.split(" ").map((item) => Number(item));

function change(stone: number): number[] {
  if (stone === 0) return [1];
  const stoneString = stone.toString();
  if (stoneString.length % 2 === 0) {
    const half = stoneString.length / 2;
    return [
      Number(stoneString.slice(0, half)),
      Number(stoneString.slice(half)),
    ];
  }

  return [stone * 2024];
}

let blink = 0;
let result = stones;
do {
  result = result.map((stone) => change(stone)).flat();
  blink++;
} while (blink < blinks);

console.log({ stonesCount: result.length });
