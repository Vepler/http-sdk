import { getApiInstance, initialisedConfig } from '../../../config';
import { GeographicEntityBase } from '../../../types';

export interface QueryByTypeParams {
  type: string;
  limit?: number;
  offset?: number;
  includeRelationships?: boolean;
  includeHierarchy?: boolean;
  includeGeometry?: boolean;
  status?: string;
}

export interface GeographicEntity extends GeographicEntityBase {
  lat: number;
  long: number;
  geometry?: object;
  hierarchy?: object;
  breadcrumb?: object;
  // Relationships fields if included
}

export interface QueryByTypeResponse {
  result: GeographicEntity[];
  meta: {
    total: number;
    limit: number;
    offset: number;
    type: string;
  };
  success: boolean;
}

export async function queryByType(params: QueryByTypeParams): Promise<QueryByTypeResponse> {
  const { 
    type, 
    limit = 100, 
    offset = 0, 
    includeRelationships = false,
    includeHierarchy = false,
    includeGeometry = false,
    status = 'active'
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
      status
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}