import createSagaMiddleware from 'redux-saga';

import { applyMiddleware, configureStore  } from '@reduxjs/toolkit';
import { rootSaga } from './root-saga.config';
import { RootReducer } from './root-reducer.config';

const RootSaga = createSagaMiddleware();

const store = configureStore({
  reducer: RootReducer,
  middleware: [RootSaga],
});

RootSaga.run(rootSaga);

export default store;