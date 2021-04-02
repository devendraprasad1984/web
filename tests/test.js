const sampleLoop=()=>{
    console.log('hello')
    let list=[1,2,3,4,5,6]
    let obj={1:'dev',2:'kittu',3:'akshat'}
    for(let i in list){
        console.log(i,list[i])
    }

    for(let i in obj){
        console.log(i,obj[i])
    }
}

const minMaxIndexes=()=>{
//find min max and sum at indexes
    let array=[[1001,50],[1001,68],[1002,69],[1002,68],[1004,9],[1004,13],[1005,56],[1005,96],[1005,30],[1006,46],[1006,6],[1006,48],[1007,59],[1007,30],[1007,9],[1009,79],[1010,42],[1012,37],[1013,64],[1017,55],[1018,29],[1020,60],[1020,29],[1021,44],[1022,62],[1024,2],[1025,6],[1028,5],[1029,6],[1029,82]];
// find min,max at index 0
// and 1 and sum up min-max at 0 with index 1
    let [min0,max0,min1,max1]=[array[0][0],array[0][1],array[1][0],array[1][1]]
    for(let i in array){
        let valArr=array[i]
        if(valArr[0]>max0) max0=valArr[0]
        if(valArr[1]>max1) max1=valArr[1]

        if(valArr[0]<min0) min0=valArr[0]
        if(valArr[1]<min1) min1=valArr[1]
    }
    console.log('min-max at 0',min0,max0)
    console.log('min-max at 1',min1,max1)
}

const findPairSum=()=>{
// find pair of sum
    let array= [1, 2, 3, 4, 5, 6, 8]
    let collectionResults={}
    let sum=9
    for(let i in array){
        let curVal=array[i]
        //for removing duplicates
        let resKeys=Object.keys(collectionResults).map(x=>parseInt(x))
        let resVals=Object.values(collectionResults)
        // console.log(resKeys, resVals)
        if(resKeys.indexOf(curVal)===-1 && resVals.indexOf(curVal)===-1)
            collectionResults[sum-curVal]=curVal
    }
    console.log('pair of numbers that equals givan sum',sum,'=',collectionResults)
}

minMaxIndexes()
