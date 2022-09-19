import { ISrvPaginationResponse } from 'lta-component-library/public-api';


export interface GetResponse<T> {
  metadata: IMetadataGetResponseFields;
  items: T[];
}

export interface IMetadataGetResponseFields extends ISrvPaginationResponse {
}
