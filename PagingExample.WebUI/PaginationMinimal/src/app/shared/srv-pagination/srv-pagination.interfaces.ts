export interface IPaginationQuery {
  currentPage: number;
  pageSize: number;
}
export interface ISrvPaginationResponse extends IPaginationQuery {
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
