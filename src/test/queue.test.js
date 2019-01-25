import React from 'react';
import ReactDOM from 'react-dom';
import Queue from '../components/queue/queue';
import renderer from 'react-test-renderer';

const queue = {
  "pending": [
    {
      "name": "Test Job 2",
      "duration": 80,
      "id": "lp8Vl8RdbQKNdLnPoM8Slbo98iVHikTw",
      "index": 1,
      "isRunning": false,
      "status": "pending",
      "progress": 0
    },
    {
      "name": "Test Job 3",
      "duration": 120,
      "id": "EtRepufE94hEXlqsnLK9aLGMBqXPPFhl",
      "index": 2,
      "isRunning": false,
      "status": "pending",
      "progress": 0
    },
    {
      "name": "Test Job 4",
      "duration": 160,
      "id": "BTj8oR5vJot9p3rpJpAmaYQmILAqq3f3",
      "index": 3,
      "isRunning": false,
      "status": "pending",
      "progress": 0
    },
    {
      "name": "Test Job 5",
      "duration": 200,
      "id": "iYb7YBqkzTZ6qfZMKM9GgKQHX1SaLJq7",
      "index": 4,
      "isRunning": false,
      "status": "pending",
      "progress": 0
    }
  ],
  "completed": [

  ],
  "total": 5,
  "pending_size": 5,
  "completed_size": 0,
  "empty": false,
  "working_item": {
    "name": "Test Job 1",
    "duration": 40,
    "id": "3ZYvI2uPywly5X4GFUmFf8hBRH93qiQF",
    "index": 0,
    "isRunning": true,
    "status": "printing",
    "progress": 2
  },
  "status": "active:working"
};

// it('render queue succesfully', () => {
//   const div = document.createElement('root');
//   ReactDOM.render(<Queue queue={queue} />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

test('Test queue component', () => {
  const component = renderer.create(<div></div>);

  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

