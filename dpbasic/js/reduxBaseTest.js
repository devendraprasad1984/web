//import the redux library
console.clear();
console.log("hello this is redux test")
//people dropping off a form (action creator)
const createPolicy=(name, amount)=>{
    return {
//     form in our insurance anlogy
        type:'CREATE_POLICY',
        payload:{
            name:name,
            amount:amount
        }
    }
};

//people dropping off a form (action creator)
const deletePolicy=(name)=>{
    return {
//     form in our insurance anlogy
        type:'DELETE_POLICY',
        payload:{
            name:name
        }
    }
};

//people dropping off a form (action creator)
const createClaim=(name,claim_amount)=>{
    return {
//     form in our insurance anlogy
        type:'CREATE_CLAIM',
        payload:{
            name:name,
            claim_amount:claim_amount
        }
    }
};

// console.log(createClaim())

// dispatch is part of redux lib, hence we dont need to implement it

// we will write reducers(like departments)
const claimHistory=(oldListOfClaims=[],action)=>{
    if (action.type==='CREATE_CLAIM'){
        return [...oldListOfClaims, action.payload] //ES2015 syntax , all elem from array and get a new array by adding new array
//     join 2 arrays together , new array will be created
        // we could also do
        // oldListOfClaims.push(action.paylog) //old array will be used
    }
    return oldListOfClaims
}
//for the first time, arg willbe undefined, hence initiaite it like above

const accounting=(bagOfMoney=1000,action)=>{
    if(action.type==='CREATE_CLAIM'){
        return bagOfMoney - action.payload.claim_amount
    }else if(action.type==='CREATE_POLICY'){
        return bagOfMoney + action.payload.amount
    }
    return bagOfMoney
}

const policies=(listOfPolicies=[],action)=>{
    if(action.type==='CREATE_POLICY'){
        return [...listOfPolicies, action.payload.name]
    }else if(action.type==='DELETE_POLICY'){
        return listOfPolicies.filter(name=>name!==action.payload.name)
    }
    return listOfPolicies
}


// console.log("redux store",Redux)
// get these 2 funcions from redux liv
const {createStore, combineReducers}=Redux
const ourDepartments=combineReducers({
    accounting: accounting
    ,claimHistory: claimHistory
    ,policies: policies
})

const store=createStore(ourDepartments)
store.dispatch(createPolicy('dp',200))
store.dispatch(createPolicy('dp1',400))
store.dispatch(createPolicy('dp2',500))
store.dispatch(createClaim('dp',10))
store.dispatch(createClaim('dp2',20))
console.log(store.getState(),store.getState().claimHistory)


