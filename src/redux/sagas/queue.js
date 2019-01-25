import { call, put, take, fork } from 'redux-saga/effects';
import * as UIActions from '../actions/ui';

import { connect, addListeners } from './socket.io';

export function* init(service, action) {
    yield put(UIActions.loading(true));

    console.log('Init 3D Queue App...');
    const socket = yield call(connect)
    yield fork(addListeners, socket);
}

export function* add(service, action) {
    yield put(UIActions.loading(true));

    const { name, duration } = action.data;
    const res = yield call(service.call, 'add', { name, duration });

    if (res.ok) {
        // yield put(QueueActions.set({ data: arr, size }));
    } else {

    }
}

export function* test(service, action) {
    yield put(UIActions.loading(true));

    const { amount, fuzzyJumpInterval } = action.data;
    const res = yield call(service.call, 'test', { amount, fuzzyJumpInterval });

    if (res.ok) {
        // yield put(QueueActions.set({ data: arr, size }));
    } else {

    }
}

export function* remove(service, action) {
    yield put(UIActions.loading(true));

    // const approve = yield call(confirmAsync, 'are you sure you wanty to remove this item from queue ?');
    // if (!approve) return;

    const { index } = action;

    const res = yield call(service.call, 'remove', { index });
    console.log(res)
    if (res.ok) {
        // yield put(QueueActions.set({ data: arr, size }));

    } else {

    }
}

export function* cancel(service, action) {
    yield put(UIActions.loading(true));

    // const approve = yield call(confirmAsync, 'are you sure you wanty to remove this item from queue ?');
    // if (!approve) return;

    const { index } = action;

    const res = yield call(service.call, 'cancel', { index });
    console.log(res)
    if (res.ok) {
        // yield put(QueueActions.set({ data: arr, size }));

    } else {
    }
}

export function* reorder(service, action) {

    const { data } = action;

    try {
        const res = yield call(service.call, 'reorder', { data });
        console.log(res)
        if (res.ok) {
            // yield put(QueueActions.set({ data: arr, size }));

        } else {

        }
    } catch (error) {
        console.log('error reorder queue', error);
    }
}
