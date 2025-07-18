import { getApiInstance, initialisedConfig } from '../../../config';
import { createRequiredParameterError } from '../../../utils/errors';
import {
  SchoolAutocompleteQueryParams,
  SchoolAutocompleteResponse,
} from '@vepler/schools-types/api/endpoints/search';

export async function autocompleteSchools(
  params: SchoolAutocompleteQueryParams
): Promise<SchoolAutocompleteResponse> {
  const { prefix, limit = 10, status, type } = params;

  // Validate required parameters
  if (!prefix) {
    throw new Error(createRequiredParameterError('prefix'));
  }

  const api = getApiInstance('schools');
  const endpoint = '/search/schools/autocomplete';

  const queryParams: SchoolAutocompleteQueryParams = {
    prefix,
    limit,
  };

  if (status) queryParams.status = status;
  if (type) queryParams.type = type;

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}
