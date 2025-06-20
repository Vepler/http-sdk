import { getApiInstance, initialisedConfig } from '../../../config';
import { Areas } from '@vepler/area-reference-types';

export interface QueryByTypeParams extends Areas.QueryAreasQueryParams {
  type: string;
}

export async function queryByType(
  params: QueryByTypeParams
): Promise<Areas.QueryAreasResponse> {
  const {
    type,
    limit = 100,
    offset = 0,
    includeRelationships = false,
    includeHierarchy = false,
    includeGeometry = false,
    status = 'active',
  } = params;

  const api = getApiInstance('area-reference');
  const endpoint = `/query/${type}`;

  // Explicitly exclude 'type' from query parameters to prevent HTTP client bug
  const queryParameters = {
    limit,
    offset,
    includeRelationships,
    includeHierarchy,
    includeGeometry,
    status,
  };

  return await api.query(
    endpoint,
    queryParameters,
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
