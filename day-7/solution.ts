const input = (await Deno.readTextFile("./input-data.txt")).split("\n");

interface Node {
  getSize(): number;
  name: string;
  depth: number;
}

class Directory implements Node {
  descendants: (Directory | File)[] = [];

  constructor(public name: string, public depth: number) {}

  getSize(): number {
    return this.descendants.reduce(
      (sum, descendant) => sum + descendant.getSize(),
      0,
    );
  }
}

class File implements Node {
  constructor(public name: string, public depth: number, public size: number) {}

  getSize(): number {
    return this.size;
  }
}

const testInput = [
  "$ ls",
  "dir a",
  "14848514 b.txt",
  "8504156 c.dat",
  "dir d",
  "$ cd a",
  "$ ls",
  "dir e",
  "29116 f",
  "2557 g",
  "62596 h.lst",
  "$ cd e",
  "$ ls",
  "584 i",
  "$ cd ..",
  "$ cd ..",
  "$ cd d",
  "$ ls",
  "4060174 j",
  "8033020 d.log",
  "5626152 d.ext",
  "7214296 k",
];

const treeBase = new Directory("root", 0);
const path: string[] = ["/"];

function processCommand(command: string) {
  const [_, commandName, ...args] = command.split(" ");
  switch (commandName) {
    case "ls":
      return;
    case "cd": {
      if (args[0] === "..") {
        path.pop();
        return;
      }

      path.push(args[0]);

      return;
    }
    default:
      throw new Error(`Unknown command ${commandName}`);
  }
}

function findCurrentDirectory(path: string[]): Directory {
  let currentDirectory = treeBase;

  for (let i = 1; i < path.length; i++) {
    const name = path[i];
    const descendant = currentDirectory.descendants.find(
      (descendant) => descendant.name === name,
    );

    if (!descendant) {
      throw new Error(`Cannot find directory ${name}`);
    }

    if (!(descendant instanceof Directory)) {
      throw new Error(`Cannot cd into a file`);
    }

    currentDirectory = descendant;
  }

  return currentDirectory;
}

input.forEach((line) => {
  if (line.startsWith("$")) {
    processCommand(line);
    return;
  }

  if (line.startsWith("dir")) {
    const cursor = findCurrentDirectory(path);

    const alreadyExists = cursor.descendants.some((descendant) =>
      descendant.name === line.split(" ")[1]
    );

    if (alreadyExists) {
      return;
    }

    cursor.descendants.push(
      new Directory(line.split(" ")[1], cursor.depth + 1),
    );
  }

  if (line.match(/\d+ \w+/)) {
    const cursor = findCurrentDirectory(path);

    if (!(cursor instanceof Directory)) {
      throw new Error("Cannot create a file in a file");
    }

    const [size, name] = line.split(" ");
    cursor.descendants.push(new File(name, cursor.depth + 1, Number(size)));
  }
});

function printTree(node: Node) {
  const indent = " ".repeat(node.depth * 2);
  const isDirectory = node instanceof Directory;
  console.log(
    `${indent}${isDirectory ? "/" : ""}${node.name} (${node.getSize()})`,
  );
  if (isDirectory) {
    node.descendants.forEach(printTree);
  }
}

printTree(treeBase);

const directorySizes: number[] = [];

function calculateDirectorySize(node: Node) {
  const isDirectory = node instanceof Directory;
  if (!isDirectory) {
    return;
  }
  const size = node.getSize();
  directorySizes.push(size);
  node.descendants.forEach((node) => calculateDirectorySize(node));
}

calculateDirectorySize(treeBase);

const smallDirectorySize = directorySizes
  .filter((size) => size <= 100000)
  .reduce((sum, size) => sum + size, 0);

console.log("Total size of small directories", smallDirectorySize);

const totalSize = 70000000;
const usedSpace = treeBase.getSize();
const freeSpaceNeeded = 30000000;
const spaceNeededToClear = Math.abs((totalSize - usedSpace) - freeSpaceNeeded);

console.log("Disk space", totalSize);
console.log("Total size of all directories", usedSpace);
console.log("Free space needed", freeSpaceNeeded);
console.log("Space needed to clear", spaceNeededToClear);

directorySizes.sort((a, b) => a - b);

const smallestDirectoryToDelete = directorySizes.find((size) =>
  size >= spaceNeededToClear
);

console.log("Smallest directory to delete", smallestDirectoryToDelete);
