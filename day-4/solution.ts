import { calculateRow as solveFirstChallenge } from "./challenge-1.spec.ts";

const input = Deno.readTextFileSync("./challenge-data.txt");

const rows = input.split("\n");

console.log(rows.reduce((accumulator, row) => {
  return solveFirstChallenge(row) ? accumulator + 1 : accumulator;
}, 0));
