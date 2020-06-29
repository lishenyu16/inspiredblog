import { all, fork } from 'redux-saga/effects';
import {watchAuth} from './auth';
export function* rootSaga(){
    yield all([
        watchAuth(),
    ])
    // yield all([
    //     helloSaga(),
    //     watchIncrementAsync()
    // ])
}