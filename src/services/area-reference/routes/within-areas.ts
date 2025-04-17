import { getApiInstance, initialisedConfig } from '../../../config';

export interface WithinAreasParams {
  lat: number;
  lng: number;
  radius?: number;
  /**
   * Type of area to query - can be:
   * - A single value (e.g. "lsoa21")
   * - A comma-separated list (e.g. "lsoa21,msoa21,county")
   * - An array of types (e.g. ["lsoa21", "msoa21", "county"])
   */
  type: string | string[];
  includeGeometry?: boolean;
}

export interface AreaResult {
  id: string;
  code: string;
  name: string;
  type: string;
  distance: number;
  geometry?: any;
}

// Unified response format for all queries
export interface WithinAreasResponse {
  results: AreaResult[];
}

export async function withinAreas(
  params: WithinAreasParams
): Promise<WithinAreasResponse> {
  const { lat, lng, radius = 1, type, includeGeometry = false } = params;

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
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}
