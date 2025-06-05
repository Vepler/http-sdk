import { getApiInstance, initialisedConfig } from '../../../config';
import {
  GetPropertyRequest,
  GetPropertyResponse
} from '@vepler/council-register-types';

/**
 * Retrieve property and tax band data by location ID(s)
 *
 * @param params - Request parameters containing location IDs
 * @returns Promise with property and tax band data
 */
export async function getProperty(params: GetPropertyRequest): Promise<GetPropertyResponse> {
  const { locationId, attemptLookup } = params;

  // Validate if locationId is provided
  if (!locationId) {
    throw new Error('locationId is required');
  }

  // Handle locationId as a string or array
  const locationIdParam = Array.isArray(locationId)
    ? locationId.join(',')
    : locationId;

  // Validate maximum of 10 location IDs∂ß
  const locationIds = locationIdParam.split(',');
  if (locationIds.length > 10) {
    throw new Error('Maximum of 10 location IDs allowed');
  }

  const api = getApiInstance('council-register');
  const endpoint = '/property';

  const queryParams: Record<string, string | boolean | undefined> = {
    locationId: locationIdParam,
    attemptLookup
  };

  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
