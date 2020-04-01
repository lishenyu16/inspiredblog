const initialState = {
    userId: null,
    username: null,
    email: null,
    isAdmin: false,
    redirectPath: null,
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case ('signin_success'):
            return {
                ...state,
                userId: action.payload.userId,
                email: action.payload.email,
                username: action.payload.username,
                isAdmin: action.payload.isAdmin,
            }
        case ('signin_fail'):
            return state;
        case ('signup_fail'):
            return state;
        case ('logout'):
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('expirationTime');
            let history = action.data;
            history.push('/');
            return {
                ...state,
                userId: null,
                username: null,
                email: null,
                isAdmin: false,
            }
        case ('redirect'):
            return {
                ...state,
                redirectPath: action.url
            }
        case ('updateProfile'):
            return {
                ...state,
                username: action.payload.username,
            }
        default:
            return state
    }
}

export default authReducer;