const input = `5 89749 6061 43 867 1965860 0 206250`;

const blinks = 75;
const stones = input.split(" ").map((item) => BigInt(item));

function change(stone: bigint): [bigint, bigint] | [bigint] {
  if (stone === 0n) return [1n];

  const stoneString = stone.toString();
  if (stoneString.length % 2 === 0) {
    const half = stoneString.length / 2;

    return [
      BigInt(stoneString.slice(0, half)),
      BigInt(stoneString.slice(half)),
    ];
  }

  return [stone * 2024n];
}

const cache = new Map<number, Map<bigint, bigint>>();

function process(props: { stone: bigint; blink: number }): bigint {
  const stones = change(props.stone);
  const blink = props.blink + 1;

  if (blink === blinks) return BigInt(stones.length);

  const blinkCache = cache.get(blink) ?? new Map<bigint, bigint>();

  const cached = blinkCache.get(props.stone);
  if (cached != null) return cached;

  const result = stones
    .filter((stone) => stone != null)
    .map((stone) => process({ stone, blink }))
    .reduce((result, current) => result + current, 0n);

  blinkCache.set(props.stone, result);
  cache.set(blink, blinkCache);

  return result;
}

let stonesCount = 0n;
for (const stone of stones) {
  stonesCount += process({ stone, blink: 0 });
}

console.log({
  stonesCount,
});
