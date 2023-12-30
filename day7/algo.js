const fs = require('fs');

function read_file(file_path) {
    const content = fs.readFileSync(file_path, 'utf-8');
    const lines = content.split('\r\n');
    return lines;
}

const data = read_file('input.txt');

let myMap = new Map([
    ['A', 0],
    ['K', 0],
    ['Q', 0],
    ['J', 0],
    ['T', 0],
    ['9', 0],
    ['8', 0],
    ['7', 0],
    ['6', 0],
    ['5', 0],
    ['4', 0],
    ['3', 0],
    ['2', 0],
]);

const cardStrength = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, 
    '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
};


let handsSortedByRank = new Map();

function calculateTotalWinnings() {
    const sortedHands = [];
    const parsedData = parseInput(data);
    for(let lines of parsedData) {
        const [hand, bid] = lines;
        let rank = checkRankOfHand(hand);
        let handConverted = convertHandToStrength(hand);
        if (handsSortedByRank.has(rank)) {
            handsSortedByRank.get(rank).push({handConverted, bid});
        } else {
            handsSortedByRank.set(rank, [{handConverted, bid}]);
        }
    }
    return handsSortedByRank;
}

function sortHands(hands) {
    
}

function compareHands(a, b) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== a[b]) {
            return b[i] !== i[b]
        }
    }
    return 0;
}

function convertHandToStrength(hand) {
    return hand.split('').map(card => cardStrength[card]);
}

function parseInput(array) {
    const parsedLines = [];
    for (let i = 0; i < array.length; i++) {
        const [hand, bid] = array[i].split(" ");
        parsedLines.push([hand, bid]);
    }
    return parsedLines;
}

function checkRankOfHand(hand) {
    resetMapValues(myMap);
    for (let i = 0; i < hand.length; i++) {
        myMap.set(hand[i], myMap.get(hand[i]) + 1);
    }
        
        let counts = Array.from(myMap.values());
        counts.sort((a, b) => (b - a));

        if (counts[0] === 5) {
            return 7;
        } else if (counts[0] === 4) {
            return 6;
        } else if (counts[0] === 3 && counts[1] === 2) {
            return 5;
        } else if (counts[0] === 3) {
            return 4;
        } else if (counts[0] === 2 && counts[1] === 2) {
            return 3; 
        } else if (counts[0] === 2) {
            return 2;
        } 
        return 1;
    }


function resetMapValues(map) {
    for (let key of map.keys()) {
        map.set(key, 0)
    }
}
console.log(calculateTotalWinnings())