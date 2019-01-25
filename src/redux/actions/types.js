const INIT = 'INIT';

const QUEUE_GET = 'QUEUE_GET';
const QUEUE_ADD = 'QUEUE_ADD';
const QUEUE_LOAD_TEST = 'QUEUE_LOAD_TEST';
const QUEUE_REMOVE = 'QUEUE_REMOVE';
const QUEUE_CANCEL= 'QUEUE_CANCEL';
const QUEUE_REORDER = 'QUEUE_REORDER';
const QUEUE_SET = 'QUEUE_SET';
const QUEUE_SET_WORK_ITEM = 'QUEUE_SET_WORK_ITEM';

export const QueueTypes = {
    INIT,QUEUE_SET,QUEUE_GET,QUEUE_ADD,QUEUE_REMOVE,QUEUE_CANCEL,
    QUEUE_REORDER,QUEUE_SET_WORK_ITEM,QUEUE_LOAD_TEST
}

const ADD_TASK = 'ADD_TASK';
const START_CHANNEL = 'START_CHANNEL';
const STOP_CHANNEL = 'STOP_CHANNEL';
const CHANNEL_ON = 'CHANNEL_ON';
const CHANNEL_OFF = 'CHANNEL_OFF';
const SERVER_ON = 'SERVER_ON';
const SERVER_OFF = 'SERVER_OFF';

export const SocketTypes = {
    ADD_TASK,START_CHANNEL,STOP_CHANNEL,CHANNEL_ON,CHANNEL_OFF,SERVER_ON,SERVER_OFF
}

const WARNING = 'WARNING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const CLEAR_MESSSAGES = 'CLEAR_MESSSAGES';
const LOADING = 'LOADING';

export const UITypes = {
    WARNING, SUCCESS, ERROR, CLEAR_MESSSAGES, LOADING
};