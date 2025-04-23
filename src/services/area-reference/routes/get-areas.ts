import { getApiInstance, initialisedConfig } from '../../../config';
import { GeographicEntityBase } from '../../../types';

export interface GetPropertyByPropertyIdParams {
  field: string;
  ids?: string[];
  groupBy?: string;
  includeRelationships?: boolean;
  includeHierarchy?: boolean;
  includeGeometry?: boolean;
  status?: string; // Parameter is defined but ignored by the API
}

export interface AreaEntity extends GeographicEntityBase {
  // Additional area-specific properties can be added here
  geometry?: object;
  hierarchy?: object;
}

export interface GetAreasResponse {
  result: AreaEntity[];
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
