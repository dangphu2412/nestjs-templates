import { CreatePaginationMetadata, PaginationMetadata } from '../types';

export function createPaginationMetadata({
  totalRecords,
  size,
  page,
}: CreatePaginationMetadata): PaginationMetadata {
  const totalPages = Math.ceil(totalRecords / size);

  return {
    size,
    page,
    totalRecords,
    totalPages,
  };
}
