export type PaginationMetadata = {
  page: number;
  size: number;
  totalRecords: number;
  totalPages: number;
};

export type CreatePaginationMetadata = Omit<PaginationMetadata, 'totalPages'>;
