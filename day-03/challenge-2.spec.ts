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

function findMatchingCharacter(
  haystackString: string,
  [needleString1, needleString2]: [string, string],
): string {
  const haystack = haystackString.split("");
  const needles1 = needleString1.split("");
  const needles2 = needleString2.split("");

  const matches = haystack.filter((haystackCharacter) => {
    return needles1.includes(haystackCharacter);
  });

  if (!matches) {
    throw new Error("No matching character found in haystack and needles1");
  }

  const match = matches.find((match) => {
    return needles2.includes(match);
  });

  if (!match) {
    throw new Error("No matching character found in needles1 and needles2");
  }

  return match;
}

export function iterateOverInput(input: string[]): number {
  let accumulator = 0;

  for (let i = 0; i < input.length; i += 3) {
    const matchingCharacter = findMatchingCharacter(input[i], [
      input[i + 1],
      input[i + 2],
    ]);

    const matchPriority = characterPriorities[matchingCharacter];

    if (!matchPriority) {
      throw new Error("No priority found for matching character");
    }

    accumulator += matchPriority;
  }

  return accumulator;
}

Deno.test("it should match the first example", () => {
  assert(iterateOverInput(exampleInput.slice(0, 3)) === 18);
});

Deno.test("it should match the second example", () => {
  assert(iterateOverInput(exampleInput.slice(3)) === 52);
});

Deno.test("it should match the complete example", () => {
  assert(iterateOverInput(exampleInput) === 70);
});
