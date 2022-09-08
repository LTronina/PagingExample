import { ISrvPaginationResponse } from "./srv-pagination/srv-pagination.interfaces";


export interface GetResponse<T> {
  metadata: IMetadataGetResponseFields;
  items: T[];
}

export interface IMetadataGetResponseFields extends ISrvPaginationResponse {
}
