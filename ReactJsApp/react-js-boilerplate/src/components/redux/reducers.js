import Types from "./types";

const types = Types()

const initUserState = {
    user: {name: ''}
}
export const userReducer = (state = initUserState, action) => {
    switch (action.type) {
        case types.keys.SET_USER:
            return {
                ...state,
                user: action.data,
            }
        default:
            return state;
    }
}

