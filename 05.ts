const input = await Deno.readTextFile("05.input");

let result = 0;
for (const match of input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm)) {
  const [_, left, right] = match;

  result += Number(left) * Number(right);
}

console.log({ result });
