import { all, fork } from 'redux-saga/effects';
import { watchIncreaseCounter} from './aboutSaga';
import {watchAuth} from './auth';
export function* rootSaga(){
    yield all([
        // fork(watchIncreaseCounter),
        watchIncreaseCounter(),
        watchAuth(),
    ])
    // yield all([
    //     helloSaga(),
    //     watchIncrementAsync()
    // ])
}