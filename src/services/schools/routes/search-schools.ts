import { getApiInstance, initialisedConfig } from '../../../config';
import { SchoolSearchQueryParams, SchoolSearchResponse } from '@vepler/schools-types/api/endpoints/search';
import { QueryParams } from '../../../types';

export async function searchSchools(
  params: SchoolSearchQueryParams
): Promise<SchoolSearchResponse> {
  const { query, limit = 20, page = 1, type, rating, status = 'open' } = params;

  // Validate required parameters
  if (!query) {
    throw new Error('The "query" parameter must be provided');
  }

  const api = getApiInstance('schools');
  const endpoint = '/search/schools';

  const queryParams: QueryParams = {
    query,
    limit,
    page
  };

  if (type) queryParams.type = type;
  if (rating) queryParams.rating = rating;
  if (status) queryParams.status = status;

  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}
