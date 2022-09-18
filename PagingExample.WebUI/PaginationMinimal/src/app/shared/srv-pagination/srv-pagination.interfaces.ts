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


export interface IPaginationVM extends ISrvPaginationResponse {
  recordStart: number;
  recordEnd: number;
}

export class PaginationTranslation {
   pageInputTooltip = "Enter value and hit Enter key.";
   pageSizeLabel ="Page size";

}
