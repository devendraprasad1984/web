import {setAgentToStore, setCartToStore} from "./Types";


export const getSetAgent=(data)=>{
    return (dispatch)=>{
        dispatch(setAgentToStore(data))
    }
}
