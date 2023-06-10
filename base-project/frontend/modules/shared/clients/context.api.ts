import { Dispatch } from 'react';

export type Action<A, P = void> = {
  type: A;
  data: P;
};

export type ContextWithDispatcher<S, A> = {
  state: S;
  dispatch: Dispatch<A>;
};
