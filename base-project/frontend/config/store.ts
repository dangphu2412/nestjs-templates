import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../modules/user/store/user.slice';

const rootReducer = combineReducers({
  user: userReducer
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer
  });
}

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
