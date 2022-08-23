import { Action } from '../../api/context.api';

export type PaginationState = {
  page: number;
  pageSize: number;
};

export type PaginationAction = Action<'SET_PAGINATION', PaginationState>;
