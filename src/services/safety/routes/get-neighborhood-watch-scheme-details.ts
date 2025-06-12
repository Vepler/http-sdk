import { getApiInstance, initialisedConfig } from '../../../config';
import {
  GetSchemeDetailsQueryParams,
  NeighborhoodWatchSchemeResponse,
} from '@vepler/safety-types';

export async function getNeighborhoodWatchSchemeDetails(
  provider: string,
  key: string,
  params: Omit<GetSchemeDetailsQueryParams, 'schemeId'> = {}
): Promise<NeighborhoodWatchSchemeResponse> {
  const { includeBoundary } = params;

  // Validate required parameters
  if (!provider) {
    throw new Error('The "provider" parameter must be provided');
  }
  if (!key) {
    throw new Error('The "key" parameter must be provided');
  }

  const api = getApiInstance('safety');
  const endpoint = `/neighborhood-watch/${provider}/${key}`;

  return await api.query(
    endpoint,
    {
      includeBoundary,
    },
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
