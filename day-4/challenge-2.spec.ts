import { assert } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const exampleInput = [
  "2-4,6-8",
  "2-3,4-5",
  "5-7,7-9",
  "2-8,3-7",
  "6-6,4-6",
  "2-6,4-8",
];

function calculateRange(range: string): number[] {
  const [start, end] = range.split("-").map((number) => parseInt(number, 10));
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function sortArraysByLength(
  arrays: [number[], number[]],
): [number[], number[]] {
  return arrays.sort((a, b) => b.length - a.length);
}

function isRangeContained(ranges: [number[], number[]]): boolean {
  const numberSet = new Set<number>();

  ranges[0].forEach((number) => {
    if (!numberSet.has(number)) {
      numberSet.add(number);
    }
  });

  return ranges[1].some((number) => numberSet.has(number));
}

export function calculateRow(row: string): boolean {
  const elfs = row.split(",");

  if (elfs.length !== 2) {
    throw new Error("Invalid row");
  }

  const firstElfRange = calculateRange(elfs[0]);
  const secondElfRange = calculateRange(elfs[1]);

  const sortedRanges = sortArraysByLength([firstElfRange, secondElfRange]);
  return isRangeContained(sortedRanges);
}

Deno.test("it should match the first example", () => {
  assert(calculateRow(exampleInput[0]) === false);
});

Deno.test("it should match the second example", () => {
  assert(calculateRow(exampleInput[1]) === false);
});

Deno.test("it should match the third example", () => {
  assert(calculateRow(exampleInput[2]) === true);
});

Deno.test("it should match the fourth example", () => {
  assert(calculateRow(exampleInput[3]) === true);
});

Deno.test("it should match the fifth example", () => {
  assert(calculateRow(exampleInput[4]) === true);
});

Deno.test("it should match the sixth example", () => {
  assert(calculateRow(exampleInput[5]) === true);
});
