import { getApiInstance, initialisedConfig } from '../../../config';
import type {
  GetNearestPOIQueryParams,
  GetNearestPOIResponse,
} from '@vepler/area-reference-types/routes/poi';

export async function getNearestPoi(
  params: GetNearestPOIQueryParams
): Promise<GetNearestPOIResponse> {
  const { lat, lng, types, limit, radius, routing } = params;

  const api = getApiInstance('area-reference');
  const endpoint = '/poi/nearest';

  const queryParams: Record<string, string | number | boolean> = {
    lat,
    lng,
  };

  if (types !== undefined) queryParams.types = types;
  if (limit !== undefined) queryParams.limit = limit;
  if (radius !== undefined) queryParams.radius = radius;
  if (routing !== undefined) queryParams.routing = routing;

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}
