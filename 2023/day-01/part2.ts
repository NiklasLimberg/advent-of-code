const text = await Deno.readTextFile("./challenge-data.txt");

const numberRegexs = [
  { regex: new RegExp("one", "g"), value: 1 },
  { regex: new RegExp("two", "g"), value: 2 },
  { regex: new RegExp("three", "g"), value: 3 },
  { regex: new RegExp("four", "g"), value: 4 },
  { regex: new RegExp("five", "g"), value: 5 },
  { regex: new RegExp("six", "g"), value: 6 },
  { regex: new RegExp("seven", "g"), value: 7 },
  { regex: new RegExp("eight", "g"), value: 8 },
  { regex: new RegExp("nine", "g"), value: 9 },
];

const total = text.split("\n").reduce((total, line) => {
  const numbers: { position: number; value: number }[] = [];

  numberRegexs.forEach(({regex, value}) => {
    const matches = line.matchAll(regex);

    for (const match of matches) {
      if (match.index === undefined) {
        throw new Error("Match index is undefined");
      }
      numbers.push({ position: match.index, value: value });
    }
  });

  line.split("").forEach((char, index) => {
    const parsed = parseInt(char, 10);

    if (!isNaN(parsed)) {
      numbers.push({ position: index, value: parsed });
    }
  });

  if (numbers.length === 0) {
    return total;
  }

  numbers.sort((a, b) => a.position - b.position);

  return total + numbers[0].value * 10 + numbers.at(-1)?.value;
}, 0);

console.log(total);
