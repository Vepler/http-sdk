import { getApiInstance, initialisedConfig } from '../../../config';
import { SchoolAutocompleteQueryParams, SchoolAutocompleteResponse } from '@vepler/schools-types/api/endpoints/search';
import { QueryParams } from '../../../types';

export async function autocompleteSchools(
  params: SchoolAutocompleteQueryParams
): Promise<SchoolAutocompleteResponse> {
  const { prefix, limit = 10, type } = params;

  // Validate required parameters
  if (!prefix) {
    throw new Error('The "prefix" parameter must be provided');
  }

  const api = getApiInstance('schools');
  const endpoint = '/search/schools/autocomplete';

  const queryParams: QueryParams = {
    prefix,
    limit
  };

  if (type) queryParams.type = type;

  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}