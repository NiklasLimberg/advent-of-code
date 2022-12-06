const inputString = await Deno.readTextFile("input-data.txt");


const recentChars: string[] = [];
const markerLength = 14;

const startOfMessage = inputString.trim().split('').findIndex((char) => {
    if (recentChars.length >= markerLength) {
        recentChars.shift();
    }
    
    recentChars.push(char);

    return new Set(recentChars).size === markerLength;
});

console.log(startOfMessage + 1);