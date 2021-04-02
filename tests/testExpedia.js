const sampleLoop = () => {
    console.log('hello')
    let list = [1, 2, 3, 4, 5, 6]
    let obj = {1: 'dev', 2: 'kittu', 3: 'akshat'}
    for (let i in list) {
        console.log(i, list[i])
    }

    for (let i in obj) {
        console.log(i, obj[i])
    }
}
const minMaxIndexes = () => {
//find min max and sum at indexes
    let array = [[1001, 50], [1001, 68], [1002, 69], [1002, 68], [1004, 9], [1004, 13], [1005, 56], [1005, 96], [1005, 30], [1006, 46], [1006, 6], [1006, 48], [1007, 59], [1007, 30], [1007, 9], [1009, 79], [1010, 42], [1012, 37], [1013, 64], [1017, 55], [1018, 29], [1020, 60], [1020, 29], [1021, 44], [1022, 62], [1024, 2], [1025, 6], [1028, 5], [1029, 6], [1029, 82]];
// find min,max at index 0
// and 1 and sum up min-max at 0 with index 1
    let [min0, max0, min1, max1] = [array[0][0], array[0][1], array[1][0], array[1][1]]
    for (let i in array) {
        let valArr = array[i]
        if (valArr[0] > max0) max0 = valArr[0]
        if (valArr[1] > max1) max1 = valArr[1]

        if (valArr[0] < min0) min0 = valArr[0]
        if (valArr[1] < min1) min1 = valArr[1]
    }
    console.log('min-max at 0', min0, max0)
    console.log('min-max at 1', min1, max1)
}
const findPairSum = () => {
// find pair of sum
    let array = [1, 2, 3, 4, 5, 6, 8]
    let collectionResults = {}
    let sum = 9
    for (let i in array) {
        let curVal = array[i]
        //for removing duplicates
        let resKeys = Object.keys(collectionResults).map(x => parseInt(x))
        let resVals = Object.values(collectionResults)
        // console.log(resKeys, resVals)
        if (resKeys.indexOf(curVal) === -1 && resVals.indexOf(curVal) === -1)
            collectionResults[sum - curVal] = curVal
    }
    console.log('pair of numbers that equals givan sum', sum, '=', collectionResults)
}
const makeUnique = (ar) => {
    let obj = {}
    for (let i of ar) {
        if (obj[i] === undefined) obj[i] = 0
        obj[i] += 1
    }
    return Object.keys(obj).map(x => Number(x))
}
const countForTallestCandle = () => {
    let candles = [1, 2, 3, 5, 5, 3, 3, 3]
    // let sortedCandles=candles.sort((a,b)=>a-b)
    let uniqElem = makeUnique(candles)
    //let tallestCandle=Math.max(...candles)
    let lengthOfUniqElem = uniqElem.length - 1
    let tallestCandle = uniqElem[lengthOfUniqElem]
    let secondTallestCandle = uniqElem[lengthOfUniqElem - 1]
    let tallestCounter = 0
    let secondTallestCounter = 0
    for (let i of candles) {
        if (i === tallestCandle) tallestCounter++
        if (i === secondTallestCandle) secondTallestCounter++
    }
    console.log('candles', candles, 'unique', uniqElem, 'tallest candle', tallestCandle, '2nd tallest candle'
        , secondTallestCandle, 'tallest counter', tallestCounter, '2nd tallest counter', secondTallestCounter)
}
const reduceTest = () => {
    let sum = [1, 2, 3, 4, 5, 6].reduce((prev, cur, index) => {
        return prev + cur
    }, 0)
    console.log(sum)
}
const functionComposer = (listOfFunctions, initVal) => {
    let res = initVal
    for (let fn of listOfFunctions) {
        res = fn(res)
    }
    return res
}
const foo = initVal => {
    let listofFn = [x => x * 2, x => x + 1, x => x - 5]
    let fn = functionComposer(listofFn, initVal)
    return fn
}
const reverseString = (string1) => {
    let string2 = ''
    for (let i = string1.length - 1; i >= 0; i--) {
        string2 += string1[i]
    }
    return string2
}
Array.prototype.reverseme = String.prototype.reverseme = function () {
    return reverseString(this)
}
const testArrayStringReverse=()=>{
    console.log('1234321', '==', reverseString('1234321'))
    console.log('hello', '==', reverseString('hello'))
    console.log('test', '==', 'test'.reverseme())
    console.log('[test]', '==', 'test'.split('').reverseme())
}

