import { getApiInstance, initialisedConfig } from '../../../config';

export interface GetPropertyByPropertyIdParams {
  field: string;
  ids?: string[];
  groupBy?: string;
  includeRelationships?: boolean;
  includeHierarchy?: boolean;
  includeGeometry?: boolean;
}

export interface GetAreasResponse {
  result: object[];
  success: boolean;
}

export async function getAreas(params: GetPropertyByPropertyIdParams): Promise<GetAreasResponse> {
  const { field, ids = [], groupBy = undefined, includeRelationships = undefined, includeHierarchy = undefined, includeGeometry = undefined } = params;

  const api = getApiInstance('area-reference');
  const endpoint = `/${field}/${ids.join(',')}`;
  
  return await api.query(
    endpoint,
    {
      groupBy,
      includeRelationships,
      includeHierarchy,
      includeGeometry
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}
