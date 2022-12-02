import { assert } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const moves = {
    ROCK: "ROCK",
    PAPER: "PAPER",
    SCISSORS: "SCISSORS",
} as const;

const opponentMoves  = {
    A: moves.ROCK,
    B: moves.PAPER,
    C: moves.SCISSORS,
} as const;

const playerMoves = {
    X: moves.ROCK,
    Y: moves.PAPER,
    Z: moves.SCISSORS,
} as const;

type Move = keyof typeof moves;
type OpponentMove = keyof typeof opponentMoves;

const gameResults = {
    WIN: "WIN",
    LOSE: "LOSE",
    DRAW: "DRAW",
} as const;

const GameOutcomes = {
    X: gameResults.LOSE,
    Y: gameResults.DRAW,
    Z: gameResults.WIN,
} as const;

type GameOutcomes = keyof typeof GameOutcomes;
type GameResult = keyof typeof gameResults;

const exampleInput = ['A Y', 'B X', 'C Z', ''];

function calculateMove(opponentMove: Move, gameResult: GameResult): Move {
    if(gameResult === gameResults.DRAW) {
        return opponentMove;
    }

    switch (opponentMove) {
        case moves.ROCK:
            return gameResult === gameResults.WIN ? moves.PAPER : moves.SCISSORS;
        case moves.SCISSORS:
            return gameResult === gameResults.WIN ? moves.ROCK : moves.PAPER;
        case moves.PAPER:
            return gameResult === gameResults.WIN ? moves.SCISSORS : moves.ROCK;
    }
}

function calculateScore(opponent: OpponentMove, result: GameOutcomes): number {
    const opponentMove = opponentMoves[opponent];
    const gameResult = GameOutcomes[result];
    

    let score = 0;
    const playerMove = calculateMove(opponentMove, gameResult);

    switch (gameResult) {
        case gameResults.LOSE:
            score = 0;
            break;
        case gameResults.DRAW:
            score = 3;
            break;
        case gameResults.WIN:
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

    console.log(`Player: ${playerMove} - Opponent: ${opponentMove}`);

    return score;
}

export function iterateOverInput(input: string[]): number {
    return input.reduce((acc, curr) => {
        if (curr === '') {
            return acc;
        }
        
        const [opponent, player] = curr.split(' ');
        return acc + calculateScore(opponent as OpponentMove, player as GameOutcomes);
    }, 0);
}

Deno.test("it should match the first example round", () => {
    const [opponent, outcome]  = exampleInput[0].split(' ');

    assert(Object.keys(opponentMoves).some(key => key === opponent), "Opponent move is not valid");
    assert(Object.keys(playerMoves).some(key => key === outcome), "Player move is not valid");

    const result = calculateScore(opponent as OpponentMove, outcome as GameOutcomes);
   
    assert(result === 4, "Result should be 4");
});


Deno.test("it should match the second example round", () => {
    const [opponent, outcome]  = exampleInput[1].split(' ');

    assert(Object.keys(opponentMoves).some(key => key === opponent), "Opponent move is not valid");
    assert(Object.keys(playerMoves).some(key => key === outcome), "Player move is not valid");

    const result = calculateScore(opponent as OpponentMove, outcome as GameOutcomes);
   
    assert(result === 1, "Result should be 1");
});


Deno.test("it should match the third example round", () => {
    const [opponent, outcome]  = exampleInput[2].split(' ');

    assert(Object.keys(opponentMoves).some(key => key === opponent), "Opponent move is not valid");
    assert(Object.keys(GameOutcomes).some(key => key === outcome), "Player move is not valid");

    const result = calculateScore(opponent as OpponentMove, outcome as GameOutcomes);
   
    assert(result === 7, "Result should be 7");
});


Deno.test("it should match the complete example", () => {
    const result = iterateOverInput(exampleInput);

    assert(result === 12, "The does not match the example output");
});
