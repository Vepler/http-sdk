import { getApiInstance, initialisedConfig } from '../../../config';
import {
  GetCatalogQueryParams,
  GetCatalogResponse,
} from '@vepler/safety-types';

export async function getCatalog(
  params: GetCatalogQueryParams = {}
): Promise<GetCatalogResponse[]> {
  const { onlyAvailable } = params;

  const api = getApiInstance('safety');
  const endpoint = '/catalog';

  return await api.query(
    endpoint,
    {
      country,
      onlyAvailable,
    },
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
