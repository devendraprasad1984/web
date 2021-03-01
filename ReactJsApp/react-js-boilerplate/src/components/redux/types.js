const keys = {
    SET_USER: 'SET_USER',
}

export default function Types() {
    return {
        keys,
        setUserToStore: (data) => {
            return {
                type: keys.SET_USER
                , data: data
            }
        }
    }
}
