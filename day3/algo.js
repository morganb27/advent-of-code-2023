const fs = require('fs');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const data = content.split("\r\n");
    return data;
}

const file_path = "input.txt";
const data = readFile(file_path);

function sumPartNumbersInEngineSchematic() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        let numbers = findNumbersInString(data[i]);
        let lastIndex = -1;
        for (let number of numbers) {
            index = findIndexOfNumber(data[i], number, lastIndex);
            if (isValidAdjacentChars(data[i], index, number.length)) {
                sum+= parseInt(number)
            } else if (i+1 < data.length && isValidAdjacentCharsInRange(data[i+1], index - 1, index + number.length)) {
                sum+= parseInt(number);
            } else if ( i - 1 > 0 && isValidAdjacentCharsInRange(data[i-1], index - 1, index + number.length)) {
                sum+= parseInt(number);
            }
            lastIndex = index + number.length;
            
        }
    }
    return sum;
}

function findNumbersInString(string) {
    let numbers = [];
    let foundNumbers = string.match(/\d+/g);
    if (foundNumbers) {
        numbers.push(...foundNumbers);
    }
    return numbers;
}

function findIndexOfNumber(string, number, index) {
    return string.indexOf(number, index + 1);
}

function isValidAdjacentChars(string, index, numLength) {
    charBefore = string[index - 1];
    charAfter = index + numLength < string.length ? string[index + numLength] : null;

    return (charBefore !== '.' && isNaN(parseInt(charBefore))) ||
        ((charAfter !== '.' && isNaN(parseInt(charAfter)))
    )
}

function isValidAdjacentCharsInRange(string, startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
        if (string[i] !== '.' && isNaN(parseInt(string[i]))) {
            return true;
        }
    }
    return false;
}

console.log(sumPartNumbersInEngineSchematic());