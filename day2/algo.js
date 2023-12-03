const fs = require('fs');
const { parse } = require('path');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const line = content.split('\r\n');
    return line;
}

const data = readFile('input.txt')
console.log(data);

const rules = new Map([
    ["red", 12],
    ["green", 13],
    ["blue", 14]
])

function sumIdsOfPossibleGames() {
    const parsedData = parseInput(data);
    let sum = 0;
    for (let i = 0; i < parsedData.length; i++) {
        if (isSetOfCubesValid(parsedData[i].setOfCubes)) {
            sum+= parsedData[i].gameId;
            console.log(parsedData[i].gameId)
        }
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
                    console.log(number, color)
                    if (parseInt(number) > rules.get(color)) {
                        console.log("rules.get(color)", rules.get(color))
                        return false;
                    }
                }
            }
        };
    }
    return true;
}

console.log(sumIdsOfPossibleGames());