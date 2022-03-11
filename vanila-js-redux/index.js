let _dispatch = undefined
let increment = document.getElementById('increment')
let decrement = document.getElementById('decrement')
let value = document.getElementById('value')


const hello = () => {
    return () => console.table({id: 1, name: 'devendra'})
}
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'PLUS':
            state = state + 1
            return state
        case 'MINUS':
            state = state - 1
            return state
        default:
            return state
    }
}


const handleActions = () => {
    increment.addEventListener('click', function (e) {
        _dispatch({type: 'PLUS'})
    })
    decrement.addEventListener('click', function (e) {
        _dispatch({type: 'MINUS'})
    })
}


//init app context
(function () {
    const {createStore, compose, combineReducers} = Redux
    let initStore = {}
    let rootReducer = combineReducers({
        hello: hello,
        counter: counter
    })
    let store = createStore(rootReducer)
    let {dispatch, getState, subscribe} = store
    _dispatch = dispatch

    const render = () => {
        let counterValue = getState().counter
        value.innerHTML = counterValue
    }
    subscribe(render)
    handleActions()
})()
