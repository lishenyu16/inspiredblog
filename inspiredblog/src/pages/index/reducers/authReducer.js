const initialState = {
    userId: null,
    username: null,
    email: 'temp',
    token: null,
    expirationTime: null,
    isAdmin: false,
    isLoggedIn: false,
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case ('signin_success'):
            return {
                ...state,
                userId: action.payload.userId,
                email: action.payload.email,
                token: action.payload.token,
                username: action.payload.username,
                isLoggedIn: true,
                expirationTime: action.payload.expirationTime,
                isAdmin: action.payload.isAdmin,
            }
        case ('signin_fail'):
            return {
                ...state,
                isLoggedIn: false,
                expirationTime: null,
                isAdmin: false,
            }
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
                token: null,
                expirationTime: null,
                isAdmin: false,
                isLoggedIn: false,
            }
        case('checkAuthState'):
            const expirationTime = localStorage.getItem('expirationTime');
            const currentDate = new Date();
            if(localStorage.getItem('token')){
                if (currentDate >= expirationTime){
                    localStorage.removeItem('username')
                    localStorage.removeItem('email')
                    localStorage.removeItem('isAdmin')
                    localStorage.removeItem('token')
                    localStorage.removeItem('expirationTime')
                    return { //expired: 
                        ...state,
                        userId: null,
                        username: null,
                        email: null,
                        token: null,
                        expirationTime: null,
                        isAdmin: false,
                        isLoggedIn: false
                    }
                } else{
                    return {
                        ...state,
                        // userId: localStorage.getItem('userId'),
                        token: localStorage.getItem('token'),
                        username: localStorage.getItem('username'),
                        email: localStorage.getItem('email'),
                        expirationTime: localStorage.getItem('expirationTime'),
                        isAdmin: localStorage.getItem('isAdmin'),
                        isLoggedIn: true
                    }
                }
            }
            else{
                return state
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