import Types from "./types";

const types = Types()

export const getSetUser = (data) => {
    return (dispatch) => {
        // console.log('actions', data)
        dispatch(types.setUserToStore(data))
    }
}
