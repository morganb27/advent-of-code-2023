const fs = require('fs');

function readFile(input_path) {
    const content = fs.readFileSync(input_path, 'utf-8');
    const lines = content.split("\r\n")
    return lines;

}

const data = readFile('input.txt')

function calculateNumberOfPoints() {
    const parsedData = parseInput(data);
    let score = 0;

    for (let i=0; i < parsedData.length; i++) {
        const [winningNumbers, myNumbers] = parsedData[i];
        let currentScore = 0;
        let isFirstMatch = true;

        for (number of myNumbers) {
            console.log("myNubers", myNumbers);
            console.log("xinning num", winningNumbers)
            if (winningNumbers.includes(number)) {
                if (isFirstMatch) {
                    currentScore++;
                    isFirstMatch = false;
                } else {
                    currentScore = currentScore * 2;
                }
            }
        }
        console.log("currentscore", currentScore)
        score+= currentScore;
    }
    return score;
}

function parseInput(data) {
    const parsedLines = [];
    for (let i = 0; i < data.length; i++) {
        const [cardNumber, numbers] = data[i].split(":");
        let [winningNumbers, myNumbers] = numbers.split("|").map(part => part.trim());
        winningNumbers = winningNumbers.split(/\s+/).map(Number);
        myNumbers = myNumbers.split(/\s+/).map(Number);
        parsedLines.push([winningNumbers, myNumbers]);
    }
    return parsedLines;
}

console.log(calculateNumberOfPoints());