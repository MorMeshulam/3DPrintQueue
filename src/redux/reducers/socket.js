import { SocketTypes } from '../actions/types';

const initialState = {
    channelStatus: 'off',
    serverStatus: 'unknown',
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SocketTypes.CHANNEL_ON:
            return { ...state, channelStatus: 'on' };
        case SocketTypes.CHANNEL_OFF:
            return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
        case SocketTypes.SERVER_OFF:
            return { ...state, serverStatus: 'off' };
        case SocketTypes.SERVER_ON:
            return { ...state, serverStatus: 'on' };
        default:
            return state;
    }
};