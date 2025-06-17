import { getApiInstance, initialisedConfig } from '../../../config';
import {
  AutocompleteQueryParams,
  AddressSearchResponse,
} from '@vepler/locations-types';

export async function autocompleteAddress(
  params: AutocompleteQueryParams
): Promise<AddressSearchResponse> {
  const { q, limit, offset, postcodePriority, streetPriority } = params;

  // Validate required parameters
  if (!q) {
    throw new Error('The "q" parameter must be provided');
  }

  const api = getApiInstance('locator');
  const endpoint = '/address/autocomplete';

  const queryParams: any = { q };

  // Add optional parameters if provided
  if (limit !== undefined) queryParams.limit = limit;
  if (offset !== undefined) queryParams.offset = offset;
  if (postcodePriority !== undefined) queryParams.postcodePriority = postcodePriority;
  if (streetPriority !== undefined) queryParams.streetPriority = streetPriority;

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}