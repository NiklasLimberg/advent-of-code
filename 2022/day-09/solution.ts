const inputData = Deno.readTextFileSync("./input-data.txt").split("\n");

const tailLocations = new Set<string>(["0:0"]);

const neighbors = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
] as const;

const directions = {
  R: [0, 1],
  L: [0, -1],
  D: [1, 0],
  U: [-1, 0],
} as const;

interface Point {
  x: number;
  y: number;
}

const rope: Point[] = Array.from({ length: 10 }, () => ({ y: 0, x: 0 }));

function areTouching(pointA: Point, pointB: Point): boolean {
  if (pointA.x === pointB.x && pointA.y === pointB.y) {
    return true;
  }

  return neighbors.some(
    (neighbor) =>
      pointB.y + neighbor[0] === pointA.y &&
      pointB.x + neighbor[1] === pointA.x,
  );
}

function movePointsToTouch(pointA: Point, pointB: Point): Point {
  const dx = pointA.x - pointB.x;
  const dy = pointA.y - pointB.y;

  const y = pointB.y + dy / (Math.abs(dy) || 1);
  const x = pointB.x + dx / (Math.abs(dx) || 1);

  return { y, x };
}

inputData.forEach((line) => {
  const direction = line.slice(0, 1);
  let distance = parseInt(line.slice(1), 10);

  while (distance--) {
    for (let i = 0; i < rope.length - 1; i++) {
      if (i === 0) {
        if (
          direction === "R" ||
          direction === "L" ||
          direction === "U" ||
          direction === "D"
        ) {
          rope[0].y += directions[direction][0];
          rope[0].x += directions[direction][1];
        } else {
          throw new Error("Invalid direction");
        }
      }

      if (!areTouching(rope[i], rope[i + 1])) {
        rope[i + 1] = movePointsToTouch(rope[i], rope[i + 1]);
      }
    }
    const tail = rope.at(-1);

    if (!tail) {
      throw new Error("Tail not found");
    }

    tailLocations.add(`${tail.y}:${tail.x}`);
  }
});

console.log(tailLocations.size);
