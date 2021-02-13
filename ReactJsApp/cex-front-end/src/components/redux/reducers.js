import {GET_AGENT, SET_AGENT} from './Types';

const initAgentState = {
    agent: {id:-1}
}
export const agentReducer=(state = initAgentState, action)=> {
    switch (action.type) {
        case GET_AGENT:
            return state
        case SET_AGENT:
            return {
                ...state,
                agent: action.data,
            }
        default:
            return state;
    }
}

