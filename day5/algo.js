const races = [[46, 208], [85, 1412], [75, 1257], [82, 1410]];

function multiplyNumberOfCanBeatRecord() {
    let sum = 1;
    for (let race of races) {
        const [time, distance] = race;
        sum = sum * calculateNumberOfWaysYouCouldWin(time, distance);
    }
    return sum;
}

function calculateNumberOfWaysYouCouldWin(time, record) {
    let sum = 0;
    for (let i = 0; i <= time; i++) {
        remainingSeconds =  time - i;
        holdingDownButton = i;
        distance = remainingSeconds * i;
        if (distance > record) {
            sum++;
        }
    }
    return sum;
}


console.log(multiplyNumberOfCanBeatRecord());
console.log(calculateNumberOfWaysYouCouldWin(46857582, 208141212571410))