import { SocketTypes } from './types';

export const startChannel = () => ({ type: SocketTypes.START_CHANNEL });
export const stopChannel = () => ({ type: SocketTypes.STOP_CHANNEL });