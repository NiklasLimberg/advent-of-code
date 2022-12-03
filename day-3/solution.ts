import { iterateOverInput as solveFirstChallenge } from "./challenge-1.spec.ts";
import { iterateOverInput as solveSecondChallenge } from "./challenge-2.spec.ts";

const challengeInput = await Deno.readTextFile("./challenge-data.txt");

const inputStrings = challengeInput.split("\n");

console.log(solveFirstChallenge(inputStrings));
console.log(solveSecondChallenge(inputStrings));