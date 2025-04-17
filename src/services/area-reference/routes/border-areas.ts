import { getApiInstance, initialisedConfig } from '../../../config';

// Define a simplified GeoJSON interface
interface GeoJSONGeometry {
  type: string;
  coordinates: unknown[];
}

// Interface for the spatial relationship information
interface SpatialRelationship {
  touches_boundary: boolean;
  distance: number;
  distance_meters: number;
  overlap_percentage: number;
  description: string;
}

// Interface for the transformed area with spatial relationship info
interface AreaWithRelationship {
  id: string;
  code: string;
  name: string;
  type: string;
  relationship: SpatialRelationship;
  touches_boundary?: boolean | string;
  distance?: number | string;
  overlap_percentage?: number | string;
  geometry?: GeoJSONGeometry | string;
  lat?: number | string;
  long?: number | string;
}

// Interface for the API response structure
interface BorderResponseResult {
  target: {
    code: string;
    name: string;
    type: string;
  };
  sourceType: string;
  areas: AreaWithRelationship[];
  count: number;
}

export interface BorderAreasParams {
  targetType: string;
  targetCode: string;
  sourceType: string;
  limit?: number;
  maxDistance?: number;
  includeGeometry?: boolean;
}

export interface BorderAreasResponse {
  success: boolean;
  result: BorderResponseResult;
}

export async function borderAreas(
  params: BorderAreasParams
): Promise<BorderAreasResponse> {
  const {
    targetType,
    targetCode,
    sourceType,
    limit = 10,
    maxDistance = 5000,
    includeGeometry = false
  } = params;

  // Validate required parameters
  if (!targetType) {
    throw new Error('The "targetType" parameter must be provided');
  }
  if (!targetCode) {
    throw new Error('The "targetCode" parameter must be provided');
  }
  if (!sourceType) {
    throw new Error('The "sourceType" parameter must be provided');
  }

  const api = getApiInstance('area-reference');
  const endpoint = `/border/${targetType}/${targetCode}/${sourceType}`;

  return await api.query(
    endpoint,
    {
      limit,
      maxDistance,
      includeGeometry,
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}
