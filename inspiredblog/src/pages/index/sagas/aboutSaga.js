import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
//https://github.com/redux-saga/redux-saga/issues/996#issuecomment-302857705
//Watcher
export function* watchIncreaseCounter(){
    yield takeLatest('INCREASE_ASYNC', increaseCounterAsync);
}
//Worker
function* increaseCounterAsync(){
    try {
        console.log('here in async')
        yield delay('2000');
        yield put({
            type: 'INCREASE'
        })
    }
    catch(err){
        console.log(err);
    }
}
