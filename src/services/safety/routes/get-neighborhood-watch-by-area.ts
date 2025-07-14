import { getApiInstance, initialisedConfig } from '../../../config';
import { GetByAreaQueryParams, GetByAreaResponse } from '@vepler/safety-types';

export async function getNeighborhoodWatchByArea(
  params: GetByAreaQueryParams
): Promise<GetByAreaResponse> {
  const { areaId } = params;

  // Validate required parameters
  if (!areaId) {
    throw new Error('The "areaId" parameter must be provided');
  }

  const api = getApiInstance('safety');
  const endpoint = '/api/neighborhood-watch/area';

  return await api.query(
    endpoint,
    {
      areaId,
    },
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
