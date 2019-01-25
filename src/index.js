import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './redux/store';

import Root from './containers/root/root';
import Loading from './components/loading/loading';

import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlusCircle, faMinusCircle,faTrash, faCheckCircle,faTachometerAlt,
  faClock, faPrint, faSyncAlt, faArchive, faChevronUp, faChevronDown
} from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle, faMinusCircle,faTrash, faCheckCircle, faClock, faPrint,
  faSyncAlt, faArchive, faChevronUp, faChevronDown,faTachometerAlt)

const { persistor, store } = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading size={100} block />} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
