const fs = require('fs');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const lines = content.split('\r\n')
    return lines;
}


const file_path = 'input.txt';
const data = readFile(file_path);

const numberWordsMap = new Map([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9]
]);



function sumCalibrationValues() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        let myMap = new Map();
        let key = 1;
        for (let j = 0; j < data[i].length; j++) {
            if (isNumber(data[i][j])) {
                myMap.set(key, data[i][j]);
                key++;
            }
        }
        const calibrationValue = getCalibrationValues(myMap.get(1), myMap.get(myMap.size));
        sum+= calibrationValue;
    }
    return sum;
}

function sumCalibrationValuesPartTwo() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        const numbersFromLine = extractNumbersFromLine(data[i]);
        const calibrationValue = numbersFromLine[0].toString() + numbersFromLine[numbersFromLine.length - 1].toString();
        sum += parseInt(calibrationValue);
    }
    return sum;
}

function extractNumbersFromLine(str) {
    let numbers = [];
    let currentWord = "";

    for (let i = 0; i < str.length; i++) {
        if (isNumber(str[i])) {
            numbers.push(str[i]);
            currentWord = "";
        } else {
            currentWord = str[i];
            for (let j = i+1; j <= str.length; j++) {
                if (numberWordsMap.has(currentWord)) {
                    numbers.push(numberWordsMap.get(currentWord));
                    currentWord = "";
                    break;
                } else if (j < str.length && !isNumber(str[j])) {
                    currentWord+= str[j];
                } else {
                    currentWord = "";
                    break;
                }
            }
        }
    }
    return numbers;
}


function getCalibrationValues(str1, str2) {
    const calibrationValue = str1 + str2;
    return parseInt(calibrationValue);
}

function isNumber(str) {
    return !isNaN(parseInt(str));
}


console.log(sumCalibrationValuesPartTwo());