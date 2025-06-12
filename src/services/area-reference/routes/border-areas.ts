import { getApiInstance, initialisedConfig } from '../../../config';
import { Areas } from '@vepler/area-reference-types';

export interface BorderAreasParams extends Areas.BorderQueryParams {
  targetType: string;
  targetCode: string;
  sourceType: string;
}

export async function borderAreas(
  params: BorderAreasParams
): Promise<Areas.BorderResponse> {
  const {
    targetType,
    targetCode,
    sourceType,
    limit = 10,
    maxDistance = 5000,
    includeGeometry = false,
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
      apiKey: initialisedConfig.apiKey,
    }
  );
}
