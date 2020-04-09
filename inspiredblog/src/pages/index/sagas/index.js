import { all, fork } from 'redux-saga/effects';
import { watchIncreaseCounter} from './aboutSaga';
import {watchAuth} from './auth';
import {watchBlogs} from './blog';
import {watchProfile} from './profile';
export function* rootSaga(){
    yield all([
        // fork(watchIncreaseCounter),
        watchIncreaseCounter(),
        watchAuth(),
        watchBlogs(),
        watchProfile(),
    ])
    // yield all([
    //     helloSaga(),
    //     watchIncrementAsync()
    // ])
}