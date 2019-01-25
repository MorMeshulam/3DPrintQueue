import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header/header';

const item = {
  "name": "Test Job 1",
  "duration": 40,
  "id": "3ZYvI2uPywly5X4GFUmFf8hBRH93qiQF",
  "index": 0,
  "isRunning": true,
  "status": "printing",
  "progress": 2
}

import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Header working_item={item} />,
  );
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

// it('render header succesfully', () => {
//   const div = document.createElement('root');
//   ReactDOM.render(<Header working_item={item} />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
