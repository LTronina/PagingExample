import { ISrvPaginationResponse } from '../../../node_modules/lta-components-lib/public-api';


export interface GetResponse<T> {
  metadata: IMetadataGetResponseFields;
  items: T[];
}

export interface IMetadataGetResponseFields extends ISrvPaginationResponse {
}
