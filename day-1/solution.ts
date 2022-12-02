const text = await Deno.readTextFile('./challenge-data.txt');

let runningTotal = 0;
const totalCalories: number[] = [];

text.split('\n').forEach((line) => {
    if(line === '') {
        totalCalories.push(runningTotal);
        runningTotal = 0;

        return;
    }
    
    runningTotal += parseInt(line, 10);
});

totalCalories.sort((a, b) => b - a);

console.log(totalCalories.slice(0, 3).reduce((a, b) => a + b, 0));

export { };