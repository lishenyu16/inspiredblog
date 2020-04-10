import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

const host = process.env.NODE_ENV === "production"?'':'http://localhost:5000';

function* getProfile(action){
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    } 
    console.log('get profile saga');
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

export function* watchProfile(){
    yield takeLatest('GET_PROFILE', getProfile);
}