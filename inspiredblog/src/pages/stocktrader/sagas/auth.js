import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';

const host = process.env.NODE_ENV === 'production'?'':'http://localhost:5000';

function* signinSaga(action) {
    const authData = {
        username: action.data.username,
        password: action.data.password,
    }
    let history = action.data.history;
    try {   
        const res = yield axios.post(host + '/api/stocktrader/auth/signIn', authData);
        if (res.data.success) {
            yield history.push('/stocktrader/')
        }
        else {

        }
    }
    catch(err){

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