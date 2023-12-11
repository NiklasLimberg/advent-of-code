const instructions = Deno.readTextFileSync("input-data.txt").split("\n");

const registerXValues: number[] = [];

let programCounter = 0;
let registerX = 1;
let screenPixels = "";

function drawPixel() {
  registerXValues.push(registerX);

  const drawColumn = programCounter % 40;
  screenPixels += Math.abs(drawColumn - registerX) <= 1 ? "#" : " ";
}

function noop() {
  programCounter += 1;

  drawPixel();
}

function addx(value: number | undefined) {
  if (typeof value !== "number") {
    throw new Error("addx requires a value");
  }

  programCounter += 1;
  drawPixel();
  registerX += value;

  programCounter += 1;
  drawPixel();
}

drawPixel();
instructions.forEach((instruction) => {
  const [instructionName, value] = instruction.split(" ");

  switch (instructionName) {
    case "noop":
      noop();
      break;
    case "addx":
      addx(parseInt(value, 10));
      break;
    default:
      throw new Error(`Unknown instruction: ${instructionName}`);
  }
});

const interestingCycles = [19, 59, 99, 139, 179, 219];

const interestingCycleValues = interestingCycles.map((cycle) => {
  return registerXValues[cycle];
});

console.log({ interestingCycleValues });

const sum = interestingCycleValues.reduce((acc, value, index) => {
  const multiplier = interestingCycles[index] + 1;

  return acc + (value * multiplier);
}, 0);

console.log({ sum });

for (let i = 0; i < 6; ++i) {
  console.log(screenPixels.substring(i * 40, (i + 1) * 40));
}
