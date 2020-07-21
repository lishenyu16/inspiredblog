import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';

const host = process.env.NODE_ENV === 'production'?'':'http://localhost:5000';

function* signinSaga(action) {
    const authData = {
        username: action.data.username,
        password: action.data.password,
    }
    try {   
        const res = yield axios.post(host + '/api/stocktrader/auth/signIn', authData);
        if (res.status == 200){
            if (res.data.success) {
                localStorage.setItem('stock_username',res.data.username);
                localStorage.setItem('stock_token',res.data.stock_token);
                localStorage.setItem('stock_userId',res.data.userId);
                localStorage.setItem('stock_expirationTime', new Date( new Date().getTime() + res.data.expirationHours*60 *60*1000));
                yield put({
                    type: 'signin_success',
                    payload: {
                        userId: res.data.userId,
                        username: res.data.username,
                    }
                })
            }
            else {
                yield put({
                    type: 'signin_fail',
                    payload: {
                        wrongUsername: res.data.message == 'Username not found.'?true:false,
                        wrongPassword: res.data.message == 'Incorrect password.'?true:false,
                        usernameMessage: res.data.message == 'Username not found.'?'Username not found.':null,
                        passwordMessage: res.data.message == 'Incorrect password.'?'Incorrect password.':null,
                    }
                })
            }
        }
        else {
            alert('Something wrong happened to the server, plz try again later.');
        }
    }
    catch(err){
        console.log('err here: ', err);
        alert(err);
    }
}

function* signupSaga(action) {
    const authData = {
        username: action.data.username,
        password: action.data.password,
    }
    let history = action.data.history;
    try {
        const res = yield axios.post(host+ '/api/stocktrader/auth/signUp', authData);
        if (res.data.success) {
            yield history.push('/stocktrader/')
        }
        else {
            if (res.data.message == 'Username already exists'){
                yield put({
                    type: 'signup_fail',
                    value : {
                        wrongUsername: true,
                        usernameMessage: 'Username already in use.'
                    }
                })
            }
            else {
                console.log('error should be caught here.')
                alert(err.response.data.message)
            }
        }
    }
    catch(err){
        console.log('here' , err)
        alert('something wrong here.')
    }
}

export function* watchAuth(){
    yield takeLatest('SIGN_IN', signinSaga);
    yield takeLatest('SIGN_UP', signupSaga);
}