import { getApiInstance, initialisedConfig } from '../../../config';
import {
  SchoolsQueryParams,
  SchoolsResponse,
} from '@vepler/schools-types/api/endpoints/schools';

export async function getSchools(
  params: SchoolsQueryParams
): Promise<SchoolsResponse> {
  const {
    page = 1,
    limit = 20,
    sort,
    fields,
    name,
    urn,
    slug,
    area,
    filter,
  } = params;

  const api = getApiInstance('schools');
  const endpoint = '/';

  // Prepare the request body - reusing SchoolsQueryParams type
  const requestBody: SchoolsQueryParams = {
    page,
    limit,
  };

  if (name) requestBody.name = name;
  if (urn) requestBody.urn = urn;
  if (slug) requestBody.slug = slug;
  if (area) requestBody.area = area;
  if (filter) requestBody.filter = filter;
  if (sort) requestBody.sort = sort;
  if (fields) requestBody.fields = fields;

  return await api.post(endpoint, requestBody, {
    apiKey: initialisedConfig.apiKey,
  });
}
