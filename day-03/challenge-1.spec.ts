import { assert } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const exampleInput = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];

const characterPriorities: Record<string, number | undefined> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
} as const;

function splitStringToEqualLengths(string: string): [string, string] {
  if (string.length % 2 !== 0) {
    throw new Error("String length must be even");
  }

  const half = string.length / 2;
  return [string.slice(0, half), string.slice(half)];
}

function findMatchingCharacter(
  [haystackString, needleString]: [string, string],
): string {
  const haystack = haystackString.split("");
  const needles = needleString.split("");

  const match = haystack.find((haystackCharacter) => {
    return needles.includes(haystackCharacter);
  });

  if (!match) {
    throw new Error("No matching character found");
  }

  return match;
}

function iterate(input: string): number {
  const [haystack, needle] = splitStringToEqualLengths(input);
  const match = findMatchingCharacter([haystack, needle]);
  const matchPriority = characterPriorities[match];

  if (!matchPriority) {
    throw new Error("No priority found for match");
  }

  return matchPriority;
}

export function iterateOverInput(input: string[]): number {
  return input.reduce((accumulator, inputString) => {
    return accumulator + iterate(inputString);
  }, 0);
}

Deno.test("it should match the first example", () => {
  assert(iterate(exampleInput[0]) === 16);
});

Deno.test("it should match the second example", () => {
  assert(iterate(exampleInput[1]) === 38);
});

Deno.test("it should match the third example", () => {
  assert(iterate(exampleInput[2]) === 42);
});

Deno.test("it should match the fourth example", () => {
  assert(iterate(exampleInput[3]) === 22);
});

Deno.test("it should match the fifth example", () => {
  assert(iterate(exampleInput[4]) === 20);
});

Deno.test("it should match the sixth example", () => {
  assert(iterate(exampleInput[5]) === 19);
});

Deno.test("it should match the complete example", () => {
  assert(iterateOverInput(exampleInput) === 157);
});
