import { getApiInstance, initialisedConfig } from '../../../config';
import {
  GetByLocationQueryParams,
  GetByLocationResponse,
} from '@vepler/safety-types';

export async function getNeighborhoodWatchByLocation(
  params: GetByLocationQueryParams
): Promise<GetByLocationResponse> {
  const { lng, lat, radius } = params;

  // Validate required parameters
  if (typeof lng !== 'number' || typeof lat !== 'number') {
    throw new Error(
      'Both "lng" and "lat" parameters must be provided as numbers'
    );
  }

  if (radius > 5000) {
    throw new Error('Radius cannot exceed 5000 meters');
  }

  const api = getApiInstance('safety');
  const endpoint = '/api/neighborhood-watch/location';

  return await api.query(
    endpoint,
    {
      lng,
      lat,
      radius,
    },
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
