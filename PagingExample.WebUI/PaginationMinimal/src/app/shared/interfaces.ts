import { ISrvPagination } from "./srv-pagination/srv-pagination.component";

export interface GetResponse<T> {
  metadata: IMetadataGetResponseFields;
  items: T[];
}

export interface IMetadataGetResponseFields extends ISrvPagination {
}
