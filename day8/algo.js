const fs = require('fs');

function readFile(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const [instructions, network] = content.split('\r\n\r\n');
    return [instructions, network];
}

const [instructions, network] = readFile('input.txt');

const myMap = new Map();


function calculateNumbersOfStepsToReachZs() {
    const parsedInstructions = parseInstructions(instructions);
    const networkLines = network.split('\r\n');
    for (let line of networkLines) {
        parseNetwork(line);
    }
    console.log(myMap)
    const step = navigateNetwork(parsedInstructions);
    return step;

}

function navigateNetwork(parsedInstructions) {
    let node = 'AAA';
    let nextNode;
    let step = 0;
        for (let i = 0; ; i++) {
            if (instructions[i % parsedInstructions.length] === 'L') {
                nextNode = myMap.get(node)[0];
            } else {
                nextNode = myMap.get(node)[1];
            }
            step++;
            node = nextNode;

            if (nextNode === 'ZZZ') {
                break;
            }
    }
    return step;
}

function parseInstructions(string) {
    return string.split('')
}

function parseNetwork(string) {
    const [node, path] = string.split(' = ');
    const [leftPath, rightPath] = path.replace('(', '').replace(')', '').split(', ');
    myMap.set(node, [leftPath.trim(), rightPath.trim()]);
}

console.log(calculateNumbersOfStepsToReachZs())