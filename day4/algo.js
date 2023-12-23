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
            if (winningNumbers.includes(number)) {
                if (isFirstMatch) {
                    currentScore++;
                    isFirstMatch = false;
                } else {
                    currentScore = currentScore * 2;
                }
            }
        }
        score+= currentScore;
    }
    return score;
}

function calculateNumberOfTotalScratchcards() {
    const parsedData = parseInput(data);
    const myArray = new Array(parsedData.length).fill(1);
    
    for (let i = 0; i < parsedData.length; i++) {
        const winningNumbers = calculateTotalWinningNumbers(parsedData[i]);
        console.log(winningNumbers);
        let currentCardCopies = myArray[i];
        for (let j = i +1; j <= i + winningNumbers; j++) {
            myArray[j] += 1 * currentCardCopies;
        }
    }
    return sumTotalScratchcards(myArray);
}

function calculateTotalWinningNumbers(array) {
    const [winningNumbers, myNumbers] = array;
        let totalWinningNumbers = 0;
        for (let i = 0; i < myNumbers.length; i++) {
            if (winningNumbers.includes(myNumbers[i])) {
                totalWinningNumbers++;
            }
        }
    return totalWinningNumbers;
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

function sumTotalScratchcards(array) {
    return array.reduce((acc, count) => acc + count, 0)
}

// console.log(calculateNumberOfPoints());
console.log(calculateNumberOfTotalScratchcards())