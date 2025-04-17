import { getApiInstance, initialisedConfig } from '../../../config';
import { SchoolsQueryParams, SchoolsResponse } from '@vepler/schools-types/api/endpoints/schools';
import { QueryParams } from '../../../types';

export interface GetSchoolsParams extends Omit<SchoolsQueryParams, 'coordinates' | 'bbox'> {
  coordinates?: number[];
  bbox?: number[];
  type?: string;
  rating?: string;
  status?: string;
}

export async function getSchools(
  params: GetSchoolsParams
): Promise<SchoolsResponse> {
  const {
    name,
    urn,
    coordinates,
    radius,
    bbox,
    filter,
    page = 1,
    limit = 20,
    sort,
    fields,
    type,
    rating,
    status = 'open'
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
  if (coordinates) queryParams.coordinates = coordinates.join(',');
  if (radius) queryParams.radius = radius;
  if (bbox) queryParams.bbox = bbox.join(',');
  if (filter) queryParams.filter = filter;
  if (sort) queryParams.sort = sort;
  if (fields && Array.isArray(fields)) queryParams.fields = fields.join(',');
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
