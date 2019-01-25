import { UITypes } from '../actions/types';

const INITIAL_STATE = {
  warning: '',
  success: '',
  error: '',
  loading: false,
  forceAlert: false
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case UITypes.LOADING:
      if (action.data) {
        console.log(action.data);
        return { ...state, loading: true };
      }
      else {
        // console.log('request end.');
        return { ...state, loading: false };
      }

    case UITypes.WARNING:
      {
        const { message, forceAlert } = action.data;
        return { ...state, warning: message, forceAlert };
      }
    case UITypes.SUCCESS:
      {
        const { message, forceAlert } = action.data;
        return { ...state, success: message, forceAlert };
      }
    case UITypes.ERROR:
      {
        const { message, forceAlert } = action.data;
        return { ...state, error: message, forceAlert };
      }
    case UITypes.CLEAR_MESSSAGES:
      return {
        ...state,
        warning: '',
        success: '',
        error: '',
        forceAlert: false
      };
    default:
      return state;
  }
};

