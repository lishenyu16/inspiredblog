import { all, fork } from 'redux-saga/effects';
import { watchIncreaseCounter} from './aboutSaga';
import {watchAuth} from './auth';
import {watchBlogs} from './blog';
export function* rootSaga(){
    yield all([
        // fork(watchIncreaseCounter),
        watchIncreaseCounter(),
        watchAuth(),
        watchBlogs(),
    ])
    // yield all([
    //     helloSaga(),
    //     watchIncrementAsync()
    // ])
}