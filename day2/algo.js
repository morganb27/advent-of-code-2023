const fs = require('fs');
const { parse } = require('path');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const line = content.split('\r\n');
    return line;
}

const data = readFile('input.txt')

const rules = new Map([
    ["red", 12],
    ["green", 13],
    ["blue", 14]
])

const rulesPartTwo = new Map([
    ["red", 1],
    ["green", 1],
    ["blue", 1]
])

function sumIdsOfPossibleGames() {
    const parsedData = parseInput(data);
    let sum = 0;
    for (let i = 0; i < parsedData.length; i++) {
        if (isSetOfCubesValid(parsedData[i].setOfCubes)) {
            sum+= parsedData[i].gameId;
        }
    }
    return sum;
}

function MultiplyMinimumSetOfCubes() {
    const parsedData = parseInput(data);
    console.log("parsedData", parsedData);
    let sum = 0;

    for(let i = 0; i<parsedData.length; i++) {
        sum += calculatePowerOfSetOfCubes(parsedData[i].setOfCubes);
    }
    return sum;
    
}

function parseInput(array) {
    const parsedLines = [];
    array.forEach(line => {
        const [ gameInformation, gameCubes] = line.split(': ');
        const [game, gameId] = gameInformation.split(" ").map(Number);
        const setOfCubes = gameCubes.split("; ");
        parsedLines.push({gameId, setOfCubes})
    });
    return parsedLines;
}

function isSetOfCubesValid(array) {
    let partsOfSet = [];
    for (let setOfCubes of array) {
        const [part1, part2, part3] = setOfCubes.split(", ");
        partsOfSet.push([part1, part2, part3])
        for (const parts of partsOfSet) {
            for (const part of parts) {
                if (part) {
                    const [number, color] = part.split(" ");
                    if (parseInt(number) > rules.get(color)) {
                        return false;
                    }
                }
            }
        };
    }
    return true;
}

function calculatePowerOfSetOfCubes(array) {
    let minRed = 1;
    let minBlue = 1;
    let minGreen = 1;
    for (let line of array) {
        let partsOfLine = [];
        const [part1, part2, part3] = line.split(", ");
        partsOfLine.push([part1, part2, part3]);
        for (const parts of partsOfLine) {
            for (const part of parts) {
                if (part) {
                    const [number, color] = part.split(" ");
                    if (color === "red") {
                        minRed = Math.max(minRed, number);
                    } else if (color === "blue") {
                        minBlue = Math.max(minBlue, number);
                    } else if (color === "green") {
                        minGreen = Math.max(minGreen, number)
                    }
                }
            }
        }
    }
    console.log(minRed, minBlue, minGreen )
    return minRed * minBlue * minGreen;
}

// console.log(sumIdsOfPossibleGames());
console.log(MultiplyMinimumSetOfCubes())