String.prototype.reverseme = function () {
    return reverseString(this)
}
const pad = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
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
const testArrayStringReverse = () => {
    console.log('1234321', '==', reverseString('1234321'))
    console.log('hello', '==', reverseString('hello'))
    console.log('test', '==', 'test'.reverseme())
    // console.log('[test]', '==', 'test'.split('').reverseme())
}
const countOfObjects = () => {
    let objects = [{x: 1, y: 1}, {x: 3, y: 3}, {x: 5, y: 2}, {x: 1, y: 2}, {x: 3, y: 5}, {x: 4, y: 4}]
    let objCounter = {}
    for (let i in objects) {
        let curObj = objects[i]
        if (curObj.x === curObj.y) objCounter[i] = curObj.x + ', ' + curObj.y
    }
    console.log('objects equals x==y', objCounter, Object.keys(objCounter).length)
}
const quickDateTest = () => {
    var format = 'dd/mm/yyyy hh:mm:ss'
// var format = 'yyyy-mm-dd hh:mm:ss'
    var newFormatteDate = format;
    var date_test = new Date(Date.now());
    console.log(pad(date_test.getDate(), 2), pad(date_test.getMonth(), 2), pad(date_test.getFullYear(), 4));
    newFormatteDate = newFormatteDate
        .replace('dd', pad(date_test.getDate(), 2))
        .replace('mm', pad(date_test.getMonth(), 2))
        .replace('yyyy', pad(date_test.getFullYear(), 2))
        .replace('hh', pad(date_test.getHours(), 2))
        .replace('mm', pad(date_test.getMinutes(), 2))
        .replace('ss', pad(date_test.getSeconds(), 2))
    console.log("the formatted date of format is " + format + "->" + newFormatteDate)
}
const evenOddMultiplier = () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let res = arr.map(x => x % 2 === 0 ? x * 2 : x * 3)
    console.log(arr, res)
}
let brackets = []
const balancedBrackets = (l, r, s) => {
    if (l === 0 && r === 0)
        brackets.push(s)
    if (l > 0)
        balancedBrackets(l - 1, r + 1, s + '(')
    if (r > 0)
        balancedBrackets(l, r - 1, s + ')')
}
// balancedBrackets(2, 0, "")
// console.log('brackets', brackets.join(''))
const isBalancedString = () => {
    let exp = '[()]{}{[()()]()}'
    let openVals = '{[('
    let closeVals = '}])'
    let stack = []
    for (let i of exp) {
        if (openVals.indexOf(i) !== -1)
            stack.push(i)
        else if (closeVals.indexOf(i) !== -1)
            stack.pop()
    }
    console.log('string', exp, 'is', (stack.length === 0 ? 'balanced' : 'not balanced'))
}
const powerset = () => {
    let arr = [1, 2, 3, 4]
    let res = [[]]
    for (let i of arr) {
        let len = res.length
        for (let j = 0; j < len; j++) {
            res.push([...res[j], i])
        }
    }
    console.log('powerset of', arr, 'is', res)
}
const words = ['hello', 'world', 'this is fine']
const hocUsingReduce = (w1, w2) => {
    if (w1.length > w2.length)
        return w1
    else
        return w2
}
//console.log('longest word is', words.reduce(hocUsingReduce))
const left2RightCompose = () => {
    let funcArr = [
        x => x * 2,
        x => x + 1,
        x => x - 5,
        x => x - 10,
        x => x + 40
    ]
    let iVal = 100
    let res = iVal
    for (let fn of funcArr) {
        res = fn(res)
    }
    console.log('final result of function listing....', iVal, res)
}
const minmaxsum_setof4 = () => {
    let arr = [5, 4, 2, 3, 7]
    let min = Math.min(...arr)
    let max = Math.max(...arr)
    let sum = arr.reduce((p, c) => p + c, 0)
    console.log('min sum', sum - max, 'max sum', sum - min)
}
const incrementArrayBy1 = (ar) => {
    // let ar = [1, 2, 3]
    // console.log('ar',ar)
    let num = Number(ar.join('')) + 1
    let nar = []
    for (let i of num.toString()) {
        nar.push(i)
    }
    return [ar, nar.map(x => Number(x))]
}
const profilingClosure = (func) => {
    return function() {
        let start = new Date()
        let retval = func.apply(this,arguments)
        let end = new Date()
        return {msg: ` took ${end.getTime() - start.getTime()}s to execute`, result: retval}
    }
}
// console.log(profilingClosure(Math.max).call(undefined, [2, 3, 4]))
// console.log(profilingClosure(incrementArrayBy1).call(undefined, [9, 9]))
const singularity=(data)=>{
    // data = '15931593950382205972005873020585729295767920094768300288002957529'
    let res=data.split().reduce((p,c)=>p+Number(c),0)
    if(res.toString().split().length>1)
        return singularity(res.toString())
    else
        return res
}
// console.log(singularity('15931593950382205972005873020585729295767920094768300288002957529'))
