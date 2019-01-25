import { QueueTypes } from '../actions/types';
import _ from 'lodash';

const initialState = {
    data: {
        pending: [],
        completed: [],
        empty: false,
        size: 0,
        working_item: null
    },
    working_item: null
}

export default function queueReducer(state = initialState, action) {
    switch (action.type) {

        case QueueTypes.QUEUE_SET: {

            return {
                ...state,
                data: action.data
            };
        }
        case QueueTypes.QUEUE_SET_WORK_ITEM: {

            return {
                ...state,
                working_item: action.data
            };
        }
        default: {
            return { ...state }
        }
    }
}