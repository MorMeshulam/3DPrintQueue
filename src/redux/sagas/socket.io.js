import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork, race, cancelled } from 'redux-saga/effects';

import * as QueueActions from '../actions/queue';
import * as UIActions from '../actions/ui';

import { AUTH_TOKEN, SOCKET_SERVER_URL } from '../../config/secrets';
import { QUEUE_UPDATE, QUEUE_SET_WORKITEM } from '../../config/request';

let socket;

export const connect = () => {
    socket = io(SOCKET_SERVER_URL);
    return new Promise(resolve => {
        socket.on('connect', () => {
            socket.emit('auth', AUTH_TOKEN);
            resolve(socket);
        });
    });
}

export const disconnect = () => {
    socket = io(SOCKET_SERVER_URL);
    return new Promise((resolve) => {
        socket.on('disconnect', () => {
            resolve(socket);
        });
    });
};

export const reconnect = () => {
    socket = io(SOCKET_SERVER_URL);
    return new Promise((resolve) => {
        socket.on('reconnect', () => {
            resolve(socket);
        });
    });
};


export function* addListeners(socket) {
    const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);
        yield put(action);
    }
}

function* subscribe(socket) {
    return new eventChannel(emit => {

        const setLoading = queue => emit(UIActions.loading(undefined));

        //event listener for queue changes
        const update = queue => emit(QueueActions.setQueue(queue));
        socket.on(QUEUE_UPDATE, update);
        socket.on(QUEUE_UPDATE, setLoading);

        //event listener for current work item update
        const setWorkingItem = item => emit(QueueActions.setWorkItem(item));
        socket.on(QUEUE_SET_WORKITEM, setWorkingItem);

        return () => {
            // This is a handler to unsubscribe.
        }
    })
}