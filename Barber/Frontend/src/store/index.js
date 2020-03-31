import createSagaMiddleware from 'redux-saga';

import { persistStore } from 'redux-persist';
import createStore from './createStore';

import persistReducers from './persistReducers';

import rootReducer from './modules/rootReducer';

import rootSaga from './modules/rootSaga';

/* Reacotron */
const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;
/* ---- */

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

/* Redundancia */
const middlewares = [sagaMiddleware];

middlewares.push(sagaMiddleware);

/* --- */
const store = createStore(persistReducers(rootReducer), middlewares);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
