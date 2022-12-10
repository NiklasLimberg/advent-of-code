import { iterateOverInput as solveFirstChallenge } from "./challenge-1.spec.ts";
import { iterateOverInput as solveSecondChallenge } from "./challenge-2.spec.ts";

const input = await Deno.readTextFile("./challenge-data.txt");

const splitInput = input.split("\n");

console.log(solveFirstChallenge(splitInput));
console.log(solveSecondChallenge(splitInput));
