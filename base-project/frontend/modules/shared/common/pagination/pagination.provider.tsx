import React from 'react';
import {
  initialPaginationState,
  paginationReducer
} from './pagination.reducer';
import { PaginationAction, PaginationState } from './pagination.api';
import { ContextWithDispatcher } from '../../clients/context.api';
import { noop } from '../../utils/noop';
import { ChildrenPropOnly } from '../../types/react.types';

type PaginationContextProps = ContextWithDispatcher<
  PaginationState,
  PaginationAction
>;

export const PaginationContext = React.createContext<PaginationContextProps>({
  state: initialPaginationState,
  dispatch: noop
});

export function PaginationProvider({
  children
}: ChildrenPropOnly): React.ReactElement {
  const [state, dispatch] = React.useReducer(
    paginationReducer,
    initialPaginationState
  );
  return (
    <PaginationContext.Provider value={{ state, dispatch }}>
      {children}
    </PaginationContext.Provider>
  );
}
