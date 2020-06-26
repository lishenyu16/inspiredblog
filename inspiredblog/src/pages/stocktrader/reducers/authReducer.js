const initialState = {
    username: null,
    userId: null,
}

const authReducer = (state=initialState,action) => {
    switch(action.type) {
        case ('signin_success'):
            return {
                ...state,
                userId: action.payload.userId,
                username: action.payload.username,
            }
        case ('signin_fail'):
            return {
                ...state,
            }
        case ('signup_success'):
            return {
                ...state,
                userId: action.payload.userId,
                username: action.payload.username,
            }
        case ('signup_fail'):
            return {
                ...state,
            }
        default: 
            return state
    }
}

export default authReducer;