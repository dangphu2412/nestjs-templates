import { Pagination } from '../../clients/list.api';

export function toPagination(page: number, size: number): Pagination {
  return {
    page,
    size
  };
}
