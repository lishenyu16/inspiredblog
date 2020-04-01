import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
//https://github.com/redux-saga/redux-saga/issues/996#issuecomment-302857705

export function* signupSaga(action) {
    const authData = {
        username: action.data.username,
        email: action.data.email,
        password: action.data.password
    }
    let history = action.data.history;
    try{
        console.log('getting inside sign up')
        const res = yield axios.post('http://localhost:5000/api/auth/signUp', authData);
        if (res.data.success){
            yield history.push('/login');
        }
        else {
            yield put({type: 'signup_fail'});
        }
    } 
    catch ( error ) {
        console.log(err.response);
        yield put({type: 'signup_fail'});
    }
}

export function* signinSaga(action){
    const authData = {
        email: action.data.email,
        password: action.data.password
    }
    try{
        const res = yield axios.post('http://localhost:5000/api/auth/signIn', authData);
        if (res.data.success) {
            // yield localStorage.setItem('userId',res.data.userId);
            yield localStorage.setItem('username',res.data.username);
            yield localStorage.setItem('email',res.data.email);
            yield localStorage.setItem('token',res.data.token);
            yield localStorage.setItem('isAdmin',res.data.isAdmin);
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
            yield put({type: 'signin_fail'});
        }
    }
    catch(error){
        console.log(err.response);
        alert('Something wrong happened to the server, please try again later.')
    }
}

function* updateProfileSaga(action){
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    } 
    try {
        const res = yield axios.post('http://localhost:5000/api/auth/updateProfile', {username: action.payload}, header);
        yield localStorage.setItem('username',res.data.username);
        yield put({
            type: 'updateProfile',
            payload: {
                username: res.data.username,
            }
        })
    }
    catch(err){
        console.log(err.response);
        alert('Something wrong happenend!')
    }
}
export function* watchAuth(){
    yield takeLatest('SIGN_IN', signinSaga);
    yield takeLatest('SIGN_UP', signupSaga);
    yield takeLatest('UPDATE_PROFILE', updateProfileSaga);
}