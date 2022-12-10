const input = await Deno.readTextFile("./input-data.txt");

const exampleInput = [
  "30373",
  "25512",
  "65332",
  "33549",
  "35390",
];

interface Tree {
  height: number;
  isVisible: boolean;
  scenicScore: number;
}

const treeMap = new Map<string, Tree>();

const testing = false;

let maxRow = 0;
let maxColumn = 0;

(testing ? exampleInput : input.split("\n")).forEach((line, row) => {
  const characters = line.split("");
  characters.forEach((character, column) => {
    treeMap.set(`row:${row}, column:${column}`, {
      height: parseInt(character, 10),
      isVisible: false,
      scenicScore: 0,
    });
    maxColumn = Math.max(maxColumn, column);
  });

  maxRow = row;
});

function getTree({ row, column }: { row: number; column: number }): Tree {
  const tree = treeMap.get(`row:${row}, column:${column}`);
  if (tree === undefined) {
    throw new Error("Tree not found");
  }
  return tree;
}

function markVisibleTreesInColumn(column: number) {
  let highestTree = -1;

  for (let row = maxRow; row >= 0; row--) {
    const currentTree = getTree({ row, column });

    if (currentTree.height > highestTree) {
      highestTree = currentTree.height;
      currentTree.isVisible = true;
    }
  }

  highestTree = -1;

  for (let row = 0; row <= maxRow; row++) {
    const currentTree = getTree({ row, column });

    if (currentTree.height > highestTree) {
      highestTree = currentTree.height;
      currentTree.isVisible = true;
    }
  }
}

function markVisibleTreesInRow(row: number) {
  let highestTree = -1;

  for (let column = maxColumn; column >= 0; column--) {
    const currentTree = getTree({ row, column });

    if (currentTree.height > highestTree) {
      highestTree = currentTree.height;
      currentTree.isVisible = true;
    }
  }

  highestTree = -1;

  for (let column = 0; column <= maxColumn; column++) {
    const currentTree = getTree({ row, column });

    if (currentTree.height > highestTree) {
      highestTree = currentTree.height;
      currentTree.isVisible = true;
    }
  }
}

function markAllTrees() {
  for (let row = 0; row <= maxRow; row++) {
    markVisibleTreesInRow(row);
  }
  for (let column = 0; column <= maxColumn; column++) {
    markVisibleTreesInColumn(column);
  }
}

markAllTrees();

let numberOfVisibleTrees = 0;
treeMap.forEach((tree) => {
  if (tree.isVisible) {
    numberOfVisibleTrees += 1;
  }
});

function calculateScenicScore(row: number, column: number) {
  const baseTree = getTree({ row, column });

  let leftScenicScore = 0;
  for (let leftColumn = column - 1; leftColumn >= 0; leftColumn--) {
    const leftTree = getTree({ row, column: leftColumn });
    leftScenicScore += 1;

    if (baseTree.height <= leftTree.height) {
      break;
    }
  }

  let rightScenicScore = 0;
  for (let rightColumn = column + 1; rightColumn <= maxColumn; rightColumn++) {
    const right = getTree({ row, column: rightColumn });
    rightScenicScore += 1;

    if (baseTree.height <= right.height) {
      break;
    }
  }

  let topScenicScore = 0;
  for (let topRow = row - 1; topRow >= 0; topRow--) {
    const topTree = getTree({ row: topRow, column });
    topScenicScore += 1;

    if (baseTree.height <= topTree.height) {
      break;
    }
  }

  let bottomScenicScore = 0;
  for (let bottomRow = row + 1; bottomRow <= maxRow; bottomRow++) {
    const bottomTree = getTree({ row: bottomRow, column });
    bottomScenicScore += 1;

    if (baseTree.height <= bottomTree.height) {
      break;
    }
  }

  baseTree.scenicScore = leftScenicScore * rightScenicScore * topScenicScore *
    bottomScenicScore;
}

for (let row = 0; row <= maxRow; row++) {
  for (let column = 0; column <= maxColumn; column++) {
    calculateScenicScore(row, column);
  }
}

const maxScenicScore = Math.max(
  ...Array.from(treeMap.values()).map((tree) => tree.scenicScore),
);

console.log({ numberOfVisibleTrees });
console.log({ maxScenicScore });
