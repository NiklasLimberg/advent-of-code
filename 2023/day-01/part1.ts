const text = await Deno.readTextFile("./challenge-data.txt");

const total = text.split("\n").reduce((total, line) => {
    const chars = line.split("");

    const numbers = chars.map(char => parseInt(char, 10)).filter(num => !isNaN(num));

    if (numbers.length === 0) {
        return total;
    }

    return total + numbers[1] * 10 + numbers[0];
}, 0);

console.log(total);