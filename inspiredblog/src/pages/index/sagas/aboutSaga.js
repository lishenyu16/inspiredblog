import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
//https://github.com/redux-saga/redux-saga/issues/996#issuecomment-302857705
//Watcher
export function* watchIncreaseCounter(){
    yield takeLatest('INCREASE_ASYNC', increaseCounterAsync);
    yield takeLatest('INCREASE_ASYNC2', increaseCounterAsyncBy2);
}
//Worker
function* increaseCounterAsync(action){
    try {
        console.log('here in async')
        yield delay('2000');
        yield put({
            type: 'INCREASE',
            payload: action.payload
        })
    }
    catch(err){
        console.log(err);
    }
}
//Worker
function* increaseCounterAsyncBy2(){
    try {
        console.log('here in async by 2')
        yield delay('2000');
        yield put({
            type: 'INCREASE2'
        })
    }
    catch(err){
        console.log(err);
    }
}
