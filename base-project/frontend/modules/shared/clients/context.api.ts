import { Dispatch } from 'react';

export type Action<A, P = {}> = {
  type: A;
  data: P;
};

export type ContextWithDispatcher<S, A> = {
  state: S;
  dispatch: Dispatch<A>;
};
