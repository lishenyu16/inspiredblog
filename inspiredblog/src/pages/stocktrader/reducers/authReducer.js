const initialState = {
    username: null,
    userId: null,
    wrongUsername: false,
    wrongPassword: false,
    wrongConfirmPw: false,
    usernameMessage: null,
    passwordMessage: null,
    confirmPwMessage: null
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
                wrongUsername: action.payload.wrongUsername,
                wrongPassword: action.payload.wrongPassword,
                usernameMessage: action.payload.usernameMessage,
                passwordMessage: action.payload.passwordMessage,
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
                wrongUsername: action.value.wrongUsername || false,
                usernameMessage: action.value.usernameMessage || null,
                wrongPassword: action.value.wrongRegisterPw || false,
                passwordMessage:action.value.registerPwMessage || null,
                wrongConfirmPw: action.value.wrongConfirmPw || false,
                confirmPwMessage: action.value.confirmPwMessage || null,
            }
        case ('clear_errors'):
            return {
                ...state,
                wrongPassword: false,
                wrongUsername: false,
                wrongConfirmPw: false,
                usernameMessage: null,
                passwordMessage: null,
                confirmPwMessage: null,
            }
        case ('logout'):
            localStorage.removeItem('stock_username');
            localStorage.removeItem('stock_token');
            localStorage.removeItem('stock_expirationTime');
            let history = action.data;
            history.push('/stocktrader');
            return {
                ...state,
                userId: null,
                username: null,
            }
        default: 
            return state
    }
}

export default authReducer;