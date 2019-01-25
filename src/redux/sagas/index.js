import { takeLatest, all } from 'redux-saga/effects';

//Action types
import { QueueTypes } from '../actions/types';

//Sagas
import { init, add, remove,cancel, reorder,test } from './queue';

//Services
import * as QueueService from '../services/queue';

export default function* rootSaga() {
    yield all([
        //Init all saga middlewares
        yield takeLatest(QueueTypes.INIT, init, QueueService),
        yield takeLatest(QueueTypes.QUEUE_ADD, add, QueueService),
        yield takeLatest(QueueTypes.QUEUE_LOAD_TEST, test, QueueService),
        yield takeLatest(QueueTypes.QUEUE_REMOVE, remove, QueueService),
        yield takeLatest(QueueTypes.QUEUE_CANCEL, cancel, QueueService),
        yield takeLatest(QueueTypes.QUEUE_REORDER, reorder, QueueService),
    ]);
};