import { getApiInstance, initialisedConfig } from '../../../config';
import { Areas } from '@vepler/area-reference-types';

export interface GetAreasParams extends Areas.GetAreasQueryParams {
  field: string;
  ids?: string[];
}

export async function getAreas(
  params: GetAreasParams
): Promise<Areas.GetAreasResponse> {
  const {
    field,
    ids = [],
    groupBy = undefined,
    includeRelationships = undefined,
    includeHierarchy = undefined,
    includeGeometry = undefined,
  } = params;

  const api = getApiInstance('area-reference');
  const endpoint = `/${field}/${ids.join(',')}`;

  return await api.query(
    endpoint,
    {
      groupBy,
      includeRelationships,
      includeHierarchy,
      includeGeometry,
    },
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
