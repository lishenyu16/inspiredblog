import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
//https://github.com/redux-saga/redux-saga/issues/996#issuecomment-302857705

const host = process.env.NODE_ENV === "production"?'':'http://localhost:5000';
export function* signupSaga(action) {
    const authData = {
        username: action.data.username,
        email: action.data.email,
        password: action.data.password
    }
    let history = action.data.history;
    try{
        const res = yield axios.post(host + '/api/auth/signUp', authData);
        if (res.data.success){
            yield history.push('/blogs/verification');
        }
        else {
            if (res.data.message=='Email already exists.'){
                yield put(
                    {
                        type: 'signup_fail', 
                        value: { 
                            wrongRegisterEmail: true,
                            registerEmailMessage: 'Email already in use'
                        } 
                    }
                );
            }
            else {
                alert('Something wrong happened to our server, please try again later.');
            }
        }
    } 
    catch ( error ) {
        console.log(error.response);
        alert('Something wrong happened to our server, please try again later.');
    }
}

export function* signinSaga(action){
    const authData = {
        email: action.data.email,
        password: action.data.password
    }
    try{
        const res = yield axios.post(host + '/api/auth/signIn', authData);
        if (res.data.success) {
            // yield localStorage.setItem('userId',res.data.userId);
            yield localStorage.setItem('username',res.data.username);
            yield localStorage.setItem('email',res.data.email);
            yield localStorage.setItem('token',res.data.token);
            yield localStorage.setItem('isAdmin',res.data.isAdmin);
            yield localStorage.setItem('userId',res.data.userId);
            yield localStorage.setItem('expirationTime', new Date(res.data.expirationTime));
            yield put({
                type: 'signin_success',
                payload: {
                    userId: res.data.userId,
                    email: res.data.email,
                    username: res.data.username,
                    isAdmin: res.data.isAdmin,
                }
            })
        }
        else {
            if (res.data.message=='Incorrect password.'){
                yield put(
                    {
                        type: 'signin_fail', 
                        value: { 
                            wrongPassword: true, 
                            wrongEmail: false, 
                            passwordMessage: 'Password does not match our records', 
                            emailMessage: null
                        } 
                    }
                );
            }
            else if (res.data.message=='Email not found.'){
                yield put(
                    {
                        type: 'signin_fail', 
                        value: { 
                            wrongEmail: true, 
                            wrongPassword: false,
                            passwordMessage: null, 
                            emailMessage: 'User not found'
                        } 
                    }
                );
            }
            else {
                alert('Something wrong happened to our server, please try again later.');
            }
        }
    }
    catch(error){
        console.log(error.response);
        alert(error.response.data.message);
    }
}

function* confirmEmailSaga(action){
    try {
        const res = yield axios.post(host + '/api/auth/confirmEmail', 
        {userId: action.value.userId,verificationCode: action.value.code});
        yield put({
            type: 'emailConfirmed',
        })
    }
    catch(err){
        console.log(err.response);
        alert(err.response.data.message);
    }
}
function* findPasswordSaga(action){
    try {
        let history = action.data.history;
        const res = yield axios.post(host + '/api/auth/forgotPassword', {email: action.data.email});
        if (res.data.success){
            yield history.push('/blogs/verification');
        }
        else {
            if (res.data.message=='Email not found.'){
                yield put(
                    {
                        type: 'find_password_invalid', 
                        value: { 
                            wrongFindEmail: true,
                            findEmailMessage: 'User is not found.'
                        } 
                    }
                );
            }
            else {
                alert('Something wrong happened to our server, please try again later.');
            }
        }
    }
    catch(err){
        console.log(err.response);
        alert(err.response.data.message);
    }
}
function* resetPasswordSaga(action){
    try {
        let history = action.data.history;
        let code = action.data.code;
        let userId = action.data.userId;
        let password = action.data.password;
        const res = yield axios.post(host + '/api/auth/resetPassword', {code, userId, password});
        if (res.data.success){
            yield history.push('/blogs/login');
        }
        else {
            if (res.data.message=='Email not found.'){
                yield put(
                    {
                        type: 'find_password_invalid', 
                        value: { 
                            wrongFindEmail: true,
                            findEmailMessage: 'User is not found.'
                        } 
                    }
                );
            }
            else {
                alert('Something wrong happened to our server, please try again later.');
            }
        }
    }
    catch(err){
        console.log(err.response);
        alert(err.response.data.message);
    }
}
function* trackUserSaga(action){
    try {
        const url = 'http://geolocation-db.com/json/';
        axios.get(url)
          .then(result => {
            const ip = result.data.IPv4;
            const city = result.data.city || null;
            const state = result.data.state || null;
            const postal = result.data.postal || null;
            const country = result.data.country_name || null;
            const latitude = result.data.latitude || null;
            const longitude = result.data.longitude || null;
            const time = new Date();
            // const region = result.data.region || null;
            // const loc = result.data.loc || null;
            // const timezone = result.data.timezone || null;
            const visitor = {ip,city,state,postal,country, latitude, longitude,time}
  
            axios.post(host + '/api/auth/visitors',visitor);
          })
          .catch(err=>{
            console.log(err)
          })
    }
    catch(err){
        console.log(err);
    }
}
export function* watchAuth(){
    yield takeLatest('SIGN_IN', signinSaga);
    yield takeLatest('SIGN_UP', signupSaga);
    yield takeLatest('CONFIRM_EMAIL', confirmEmailSaga);
    yield takeLatest('FIND_PASSWORD', findPasswordSaga);
    yield takeLatest('RESET_PASSWORD', resetPasswordSaga);
    yield takeLatest('TRACK_USER', trackUserSaga);
}