import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { userReducer } from '@modules/user/store/user.slice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer
});
function* rootSaga() {
  yield all([]);
}

function makeStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
  });
  sagaMiddleware.run(rootSaga);
  return store;
}

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
