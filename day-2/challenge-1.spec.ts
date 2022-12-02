import { assert } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const moves = {
    ROCK: "ROCK",
    PAPER: "PAPER",
    SCISSORS: "SCISSORS",
} as const;

const opponentMoves  = {
    A: "ROCK",
    B: "PAPER",
    C: "SCISSORS",
} as const;

const playerMoves = {
    X: "ROCK",
    Y: "PAPER",
    Z: "SCISSORS",
} as const;

const gameResult = {
    WIN: "WIN",
    LOSE: "LOSE",
    DRAW: "DRAW",
} as const;

type Move = keyof typeof moves;
type OpponentMove = keyof typeof opponentMoves ;
type PlayerMove = keyof typeof playerMoves;
type gameResult = keyof typeof gameResult;

const exampleInput = ['A Y', 'B X', 'C Z', ''];

function calculateWin(opponentMove: Move, playerMove: Move): gameResult {
    if (playerMove === opponentMove) {
        return gameResult.DRAW;
    }
    switch (playerMove) {
        case moves.ROCK:
            return opponentMove === moves.SCISSORS ? gameResult.LOSE : gameResult.WIN;
        case moves.SCISSORS:
            return opponentMove === moves.PAPER ? gameResult.LOSE : gameResult.WIN;
        case moves.PAPER:
            return opponentMove === moves.ROCK ? gameResult.LOSE : gameResult.WIN;
    }
}

function calculateScore(opponent: OpponentMove, player: PlayerMove): number {
    const opponentMove = opponentMoves[opponent];
    const playerMove = playerMoves[player];

    let score = 0;
    const result = calculateWin(playerMove, opponentMove);

    switch (result) {
        case gameResult.LOSE:
            score = 0;
            break;
        case gameResult.DRAW:
            score = 3;
            break;
        case gameResult.WIN:
            score = 6;
            break;
    }

    switch (playerMove) {
        case moves.ROCK:
            score += 1;
            break;
        case moves.PAPER:
            score += 2;
            break;
        case moves.SCISSORS:
            score += 3;
            break;
    }

    console.log(`Player: ${playerMove} - Opponent: ${opponentMove} - Result: ${result} - Score: ${score}`);

    return score;
}

export function iterateOverInput(input: string[]): number {
    return input.reduce((acc, curr) => {
        if (curr === '') {
            return acc;
        }
        
        const [opponent, player] = curr.split(' ');
        return acc + calculateScore(opponent as OpponentMove, player as PlayerMove);
    }, 0);
}

Deno.test("it should match the first example round", () => {
    const [opponent, player]  = exampleInput[0].split(' ');

    assert(Object.keys(opponentMoves).some(key => key === opponent), "Opponent move is not valid");
    assert(Object.keys(playerMoves).some(key => key === player), "Player move is not valid");

    const result = calculateScore(opponent as OpponentMove, player as PlayerMove);
   
    assert(result === 8, "Result should be 8");
});

Deno.test("it should match the second example round", () => {
    const [opponent, player]  = exampleInput[1].split(' ');

    assert(Object.keys(opponentMoves).some(key => key === opponent), "Opponent move is not valid");
    assert(Object.keys(playerMoves).some(key => key === player), "Player move is not valid");

    const result = calculateScore(opponent as OpponentMove, player as PlayerMove);
   
    assert(result === 1, "Result should be 1");
});


Deno.test("it should match the third example round", () => {
    const [opponent, player]  = exampleInput[2].split(' ');

    assert(Object.keys(opponentMoves).some(key => key === opponent), "Opponent move is not valid");
    assert(Object.keys(playerMoves).some(key => key === player), "Player move is not valid");

    const result = calculateScore(opponent as OpponentMove, player as PlayerMove);
   
    assert(result === 6, "Result should be 6");
});


Deno.test("it should match the complete example", () => {
    const result = iterateOverInput(exampleInput);

    assert(result === 15, "The does not match the example output");
});
