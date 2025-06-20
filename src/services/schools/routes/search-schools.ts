import { getApiInstance, initialisedConfig } from '../../../config';
import { createRequiredParameterError } from '../../../utils/errors';
import {
  SchoolSearchQueryParams,
  SchoolSearchResponse,
} from '@vepler/schools-types/api/endpoints/search';

export async function searchSchools(
  params: SchoolSearchQueryParams
): Promise<SchoolSearchResponse> {
  const { query, limit = 20, status = 'open', type, page, rating } = params;

  // Validate required parameters
  if (!query) {
    throw new Error(createRequiredParameterError('query'));
  }

  const api = getApiInstance('schools');
  const endpoint = '/search/schools';

  const queryParams: SchoolSearchQueryParams = {
    query,
    limit,
  };

  if (type) queryParams.type = type;
  if (status) queryParams.status = status;
  if (page) queryParams.page = page;
  if (rating) queryParams.rating = rating;

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}
