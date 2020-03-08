import { all, fork } from 'redux-saga/effects';
import { watchIncreaseCounter} from './aboutSaga';

export function* rootSaga(){
    yield all([
        fork(watchIncreaseCounter),
    ])
}