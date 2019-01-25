import { UITypes } from './types';

export const loading = data => ({
  type: UITypes.LOADING,
  data
});

export const error = (message, forceAlert = false) => ({
  type: UITypes.ERROR,
  data: { message, forceAlert }
});

export const success = (message, forceAlert = false) => ({
  type: UITypes.SUCCESS,
  data: { message, forceAlert }
});

export const warning = (message, forceAlert = false) => ({
  type: UITypes.WARNING,
  data: { message, forceAlert }
});

