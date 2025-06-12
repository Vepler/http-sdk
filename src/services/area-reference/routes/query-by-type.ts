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

  return await api.query(
    endpoint,
    {
      limit,
      offset,
      includeRelationships,
      includeHierarchy,
      includeGeometry,
      status,
    },
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
