const input = await Deno.readTextFile("05.input");

let result = 0;
let run: boolean | null = null;
for (const match of input.matchAll(
  /(do\(\))|(don\'t\(\))|mul\((\d{1,3}),(\d{1,3})\)/gm
)) {
  const [_, start, stop, left, right] = match;

  if (run === null) run = true;
  if (start != null) run = true;
  if (stop != null) run = false;

  if (run === false || start != null || stop != null) continue;

  result += Number(left) * Number(right);
}

console.log({ result });
