const input = (await Deno.readTextFile("./challenge-data.txt"))
  .trim()
  .split("\n");

const stacks = [[
  "P",
  "V",
  "Z",
  "W",
  "D",
  "T",
], [
  "D",
  "J",
  "F",
  "V",
  "W",
  "S",
  "L",
], [
  "H",
  "B",
  "T",
  "V",
  "S",
  "L",
  "M",
  "Z",
], [
  "J",
  "S",
  "R",
], [
  "W",
  "L",
  "M",
  "F",
  "G",
  "B",
  "Z",
  "C",
], [
  "B",
  "G",
  "R",
  "Z",
  "H",
  "V",
  "W",
  "Q",
], [
  "N",
  "D",
  "B",
  "C",
  "P",
  "J",
  "V",
], [
  "Q",
  "B",
  "T",
  "P",
], [
  "C",
  "R",
  "Z",
  "G",
  "H",
]]; // Put your starting stacks here

for (const command of input) {
  const characterSequence = command.split(" ");
  const removeAmount = +characterSequence[1];

  // account for 0-indexing
  const removeFrom = +characterSequence[3] - 1;
  const addTo = +characterSequence[5] - 1;

  stacks[removeFrom]
    .splice(0, removeAmount)
    .reverse() //Remove this reverse() call to do part 1
    .map((i) => {
      stacks[addTo].unshift(i);
    });
}

let output = "";
for (const i of stacks) {
  output = output + i[0];
}

console.log(output);
