import { getApiInstance, initialisedConfig } from '../../../config';
import { GeographicEntityBase } from '../../../types';

export interface GetChildAreasParams {
  parentCode: string;
  childType?: string;
  includeHierarchy?: boolean;
  includeGeometry?: boolean;
  limit?: number;
  offset?: number;
  status?: string; // Parameter is defined but ignored by the API
}

export interface ChildAreaEntity extends GeographicEntityBase {
  lat: number;
  long: number;
  geometry?: object;
  hierarchy?: object[];
  sourceRelationships?: object[];
}

export interface GetChildAreasResponse {
  success: boolean;
  result: {
    parent: ChildAreaEntity;
    childType: string;
    children: ChildAreaEntity[];
    total: number;
    limit: number;
    offset: number;
    includeIntersections: boolean;
    includeCoverage: boolean;
  };
}

export async function getChildAreas(
  parentCode: string,
  childType?: string,
  options?: Omit<GetChildAreasParams, 'parentCode' | 'childType'>
): Promise<GetChildAreasResponse> {
  // Construct the endpoint path
  let endpoint = `/children/${parentCode}`;
  if (childType) {
    endpoint += `/${childType}`;
  }

  // Extract query parameters from options
  const {
    includeHierarchy = false,
    includeGeometry = false,
    limit = 100,
    offset = 0
  } = options || {};

  const queryParams = {
    includeHierarchy,
    includeGeometry,
    limit,
    offset
  };

  // Get API instance and make the request
  const api = getApiInstance('area-reference');

  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}
