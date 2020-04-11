import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

const host = process.env.NODE_ENV === "production"?'':'http://localhost:5000';

function* getProfile(action){
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    } 
    try {
        const result = yield axios.get(host + `/api/profile/getProfile/${action.value}`, header);
        yield put({
            type: 'get_profile_success',
            value: result.data,
        })
    }
    catch(err){
        console.log(err);
        console.log(err.response);
        alert(err.response.data.message);
    }
}
function* updateProfile(action){
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    } 
    const data = {
        username: action.value.username,
        publicInfo: action.value.publicInfo,
    }
    console.log('action.value:', action.value);
    try {
        const result = yield axios.post(host + `/api/profile/updateProfile`, data, header);
        yield put({
            type: 'update_profile_success',
            value: result.data,
        })
    }
    catch(err){
        console.log(err);
        if (err.response){
            if (err.response.data.message=='Token expired' || err.response.data.message=='Invalid token'){
                return alert('Authentication is required, please login before continue');
            }
        }
        alert('Something wrong hapened to the server, please try again.');
    }
}

export function* watchProfile(){
    yield takeLatest('GET_PROFILE', getProfile);
    yield takeLatest('UPDATE_PROFILE', updateProfile);
}