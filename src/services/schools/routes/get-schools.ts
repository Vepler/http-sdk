import { getApiInstance, initialisedConfig } from '../../../config';
import { SchoolsQueryParams, SchoolsResponse } from '@vepler/schools-types/api/endpoints/schools';
import { QueryParams } from '../../../types';

export async function getSchools(
  params: SchoolsQueryParams
): Promise<SchoolsResponse> {
  const {
    name,
    urn,
    slug,
    coordinates,
    radius,
    bbox,
    filter,
    page = 1,
    limit = 20,
    sort,
    fields,
    overlay
  } = params;

  // Validate coordinates and radius are provided together
  if (coordinates && !radius) {
    throw new Error('The "radius" parameter must be provided when using coordinates');
  }

  const api = getApiInstance('schools');
  const endpoint = '/';

  const queryParams: QueryParams = {
    page,
    limit
  };

  if (name) queryParams.name = name;
  if (urn) queryParams.urn = urn;
  if (slug) queryParams.slug = slug;
  if (coordinates) queryParams.coordinates = coordinates;
  if (radius) queryParams.radius = radius;
  if (bbox) queryParams.bbox = bbox;
  if (filter) queryParams.filter = filter;
  if (sort) queryParams.sort = sort;
  if (fields) queryParams.fields = fields;
  if (overlay) queryParams.overlay = overlay;

  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}
