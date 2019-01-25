import React from 'react';
import ReactDOM from 'react-dom';
import QueueItem from '../components/queue_item/queue_item';

const item = {
  "name": "Test Job 1",
  "duration": 40,
  "id": "3ZYvI2uPywly5X4GFUmFf8hBRH93qiQF",
  "index": 0,
  "isRunning": true,
  "status": "printing",
  "progress": 2
}

it('render queue succesfully', () => {
  const div = document.createElement('root');
  ReactDOM.render(<QueueItem item={item} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
