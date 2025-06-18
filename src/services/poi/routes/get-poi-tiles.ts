import { getApiInstance, initialisedConfig } from '../../../config';
import type {
  GetPOITilesQueryParams,
  GetPOITilesGeoJSONResponse,
} from '@vepler/area-reference-types/routes/poi';

export async function getPoiTiles(
  params: GetPOITilesQueryParams
): Promise<GetPOITilesGeoJSONResponse> {
  const { tiles, format, categories, limit, includeMetadata } = params;

  const api = getApiInstance('area-reference');
  const endpoint = '/poi/tiles';

  const queryParams: Record<string, string | number | boolean> = {
    tiles,
  };

  if (format !== undefined) queryParams.format = format;
  if (categories !== undefined) queryParams.categories = categories;
  if (limit !== undefined) queryParams.limit = limit;
  if (includeMetadata !== undefined) queryParams.includeMetadata = includeMetadata;

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}