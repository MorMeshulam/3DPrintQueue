import queue from './queue';
import socket from './socket';
import ui from './ui';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  queue,
  socket,
  ui,
};