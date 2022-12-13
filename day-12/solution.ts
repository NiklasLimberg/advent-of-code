const neighborLocations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
] as const;

const nodeMap = new Map<string, Node>();

class Node {
  public location: string;

  constructor(
    public row: number,
    public column: number,
    public height: number,
  ) {
    this.location = `${row}:${column}`;
  }

  getNeighbors(): Node[] {
    const neighbors: Node[] = [];

    neighborLocations.forEach((neighborLocation) => {
      const location = `${this.row + neighborLocation[0]}:${
        this.column + neighborLocation[1]
      }`;

      const neighborNode = nodeMap.get(location);

      if (!neighborNode) {
        return;
      }

      const isValidNeighbor = neighborNode.height - this.height <= 1;

      if (isValidNeighbor) {
          if(this.height < neighborNode.height) {console.log(this.height, neighborNode.height);}
          
        neighbors.push(neighborNode);
      }
    });

    return neighbors;
  }
}

function breathFirstSearch(start: Node) {
  let shortestPath = Infinity;
  const queue = [{ node: start, steps: 1 }];
  const visited = new Set<string>();

  visited.add(start.location);

  while (queue.length) {
    const current = queue.shift()!;

    const neighbors = current.node.getNeighbors();

    neighbors
      .filter((neighbor) => !visited.has(neighbor.location))
      .forEach((neighbor) => {
        queue.push({ node: neighbor, steps: current.steps + 1 });
        visited.add(neighbor.location);

        if (neighbor.location === end) {
            console.log("found end", current.steps);
          shortestPath = Math.min(shortestPath, current.steps);
        }
      });
  }

  return shortestPath;
}

let start = "";
let end = "";

Deno.readTextFileSync("test.txt").split("\n").forEach((line, row) => {
  line.split("").forEach((char, column) => {
    const location = `${row}:${column}`;
    let height = -1;

    if (char == "S") {
      height = 0;
      console.log("start", location);
      start = location;
    }
    if (char == "E") {
      console.log("end", location);
      height = 27;
      end = location;
    }

    if (height === -1) {
      height = char.charCodeAt(0) - 96;
    }

    nodeMap.set(location, new Node(row, column, height));
  });
});

console.log();
console.log(breathFirstSearch(nodeMap.get(start)!));
