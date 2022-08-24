import { useContext } from 'react';
import { PaginationContext } from './pagination.provider';
import { PaginationState } from './pagination.api';

type PaginationHook = {
  state: PaginationState;
  setPagination(pagination: PaginationState): void;
};

export function usePagination(): PaginationHook {
  const { state, dispatch } = useContext(PaginationContext);

  return {
    state,
    setPagination(pagination: PaginationState) {
      dispatch({
        type: 'SET_PAGINATION',
        data: pagination
      });
    }
  };
}
