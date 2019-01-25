/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import reducers from '../reducers';
import rootSaga from '../sagas';

// Redux Persist config
const config = {
    key: 'root',
    storage,
    blacklist: ['ui','queue']
};

const reducer = persistCombineReducers(config, reducers);
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
    const store = createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        compose(applyMiddleware(sagaMiddleware)),
    );

    const persistor = persistStore(
        store, null,
        () => { store.getState(); },
    );

    sagaMiddleware.run(rootSaga);
    return { persistor, store };
};

export default configureStore;
