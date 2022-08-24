import { PaginationAction, PaginationState } from './pagination.api';

export const initialPaginationState: PaginationState = {
  page: 1,
  pageSize: 10
};

export const paginationReducer = (
  state: PaginationState,
  action: PaginationAction
): PaginationState => {
  if (action.type === 'SET_PAGINATION') {
    return {
      ...state,
      ...action.data
    };
  }
  return state;
};
