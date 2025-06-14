import { getApiInstance, initialisedConfig } from '../../../config';
import {
  AutocompleteQueryParams,
  SuccessResponse,
  AutocompleteResult,
} from '@vepler/locations-types';

// Extended interface for street autocomplete with additional parameters
interface StreetAutocompleteQueryParams extends AutocompleteQueryParams {
  town?: string;
  locality?: string;
}

export async function autocompleteStreet(
  params: StreetAutocompleteQueryParams
): Promise<SuccessResponse<AutocompleteResult[]>> {
  const {
    q,
    limit = 10,
    offset = 0,
    postcodePriority,
    streetPriority = true,
    town,
    locality,
  } = params;

  // Validate required parameters
  if (!q) {
    throw new Error('The "q" parameter must be provided');
  }

  const api = getApiInstance('locator');
  const endpoint = '/streets/autocomplete';

  const queryParams: StreetAutocompleteQueryParams = {
    q,
    limit,
    offset,
  };

  // Add optional parameters if provided
  if (postcodePriority !== undefined) {
    queryParams.postcodePriority = postcodePriority;
  }
  if (streetPriority !== undefined) {
    queryParams.streetPriority = streetPriority;
  }
  if (town) {
    queryParams.town = town;
  }
  if (locality) {
    queryParams.locality = locality;
  }

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}
