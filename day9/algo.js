const fs = require('fs');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const lines = content.split('\r\n').map(line => 
        line.split(' ').map(Number)
    );
    return lines;
}

const data = readFile('input.txt');

function sumOfExtrapolatedValues() {
    let sum = 0;
     for (let i = 0; i < data.length; i++) {
        const storeAllSequences = [data[i]];
        let isLastSequence = false;
        let currentSequence = data[i];
        while (!isLastSequence) {
            const nextSequence = createNextSequence(currentSequence);
            storeAllSequences.push(nextSequence);
            if (nextSequence.every(element => element === 0)) {
                isLastSequence = true;
                const lastSequence = nextSequence;
                lastSequence.push(0);
            } else {
                currentSequence = nextSequence;
            }
        }
        for (let i = storeAllSequences.length - 1; i > 0; i--) {
            storeAllSequences[i - 1].push(storeAllSequences[i][storeAllSequences[i].length - 1] + storeAllSequences[i - 1][storeAllSequences[i - 1].length - 1]);
        }
        let extrapolatedValue = storeAllSequences[0][storeAllSequences[0].length - 1]
        sum += extrapolatedValue;
     }
     return sum;
}

function createNextSequence(array) {
    let nextSequence = [];
    for (let i = 0; i < array.length - 1; i++) {
        nextSequence.push(array[i + 1] - array [i]);
    }
    return nextSequence;
}

console.log(sumOfExtrapolatedValues());