const initialState = {
    // login:
    userId: null,
    username: null,
    email: null,
    isAdmin: false,
    redirectPath: null,
    emailConfirmed: false,
    wrongPassword: false,
    passwordMessage: null,
    wrongEmail: false,
    emailMessage: null,
    // register;
    wrongUsername: false,
    usernameMessage: null,
    wrongRegisterEmail: false,
    registerEmailMessage: null,
    wrongRegisterPw: false,
    registerPwMessage: null,
    wrongConfirmPw: false,
    confirmPwMessage: null,
    // forgot password:
    wrongFindEmail: false,
    findEmailMessage: null,
    // reset password:
    wrongResetPassword: false,
    resetPasswordMessage: null,
    wrongResetConfirmPassword: false,
    resetConfirmPasswordMessage: null,
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
            return {
                ...state,
                wrongEmail: action.value.wrongEmail,
                wrongPassword: action.value.wrongPassword,
                emailMessage: action.value.emailMessage,
                passwordMessage: action.value.passwordMessage,
            }
        case ('signup_fail'):
            return {
                ...state,
                wrongUsername: action.value.wrongUsername || false,
                usernameMessage: action.value.usernameMessage || null,
                wrongRegisterEmail: action.value.wrongRegisterEmail || false,
                registerEmailMessage: action.value.registerEmailMessage || null,
                wrongRegisterPw: action.value.wrongRegisterPw || false,
                registerPwMessage:action.value.registerPwMessage || null,
                wrongConfirmPw: action.value.wrongConfirmPw || false,
                confirmPwMessage: action.value.confirmPwMessage || null,
            };
        case ('find_password_invalid'):
            return {
                ...state,
                wrongFindEmail: action.value.wrongFindEmail || false,
                findEmailMessage: action.value.findEmailMessage || null,
            };
        case ('reset_password_invalid'):
            return {
                ...state,
                wrongResetPassword: action.value.wrongResetPassword || false,
                resetPasswordMessage: action.value.resetPasswordMessage || null,
                wrongResetConfirmPassword: action.value.wrongResetConfirmPassword || false,
                resetConfirmPasswordMessage: action.value.resetConfirmPasswordMessage || null,
            };
        case ('clear_errors'):
            return {
                ...state,
                wrongEmail: false,
                wrongPassword: false,
                wrongRegisterEmail: false,
                wrongUsername: false,
                wrongRegisterPw: false,
                wrongConfirmPw: false,
                wrongFindEmail: false,
                wrongResetPassword: false,
                wrongResetConfirmPassword: false,
            }
        case ('emailConfirmed'):
            return {
                ...state,
                emailConfirmed: true
            };
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