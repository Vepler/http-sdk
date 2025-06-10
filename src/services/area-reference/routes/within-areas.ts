import { getApiInstance, initialisedConfig } from '../../../config';
import { Areas } from '@vepler/area-reference-types';

export interface WithinAreasParams extends Omit<Areas.WithinQueryParams, 'type'> {
  /**
   * Type of area to query - can be:
   * - A single value (e.g. "lsoa21")
   * - A comma-separated list (e.g. "lsoa21,msoa21,county")
   * - An array of types (e.g. ["lsoa21", "msoa21", "county"])
   */
  type: string | string[];
}

export async function withinAreas(
  params: WithinAreasParams
): Promise<Areas.WithinResponse> {
  const { lat, lng, radius = 1, type, includeGeometry = false, status = 'active' } = params;

  // Validate type parameter is provided
  if (!type) {
    throw new Error('The "type" parameter must be provided');
  }

  // Convert array to comma-separated string if needed
  const typeParam = Array.isArray(type) ? type.join(',') : type;

  const api = getApiInstance('area-reference');
  const endpoint = '/within';

  // Use GET with query parameters instead of POST with body
  return await api.query(
    endpoint,
    {
      lat,
      lng,
      radius,
      type: typeParam,
      includeGeometry,
      status,
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}
