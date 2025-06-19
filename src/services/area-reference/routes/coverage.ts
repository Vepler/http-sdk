import { getApiInstance, initialisedConfig } from '../../../config';
import { Areas } from '@vepler/area-reference-types';

export async function coverage(
  params: Areas.CoverageQueryParams
): Promise<Areas.CoverageResponse> {
  const {
    sourceCode,
    sourceType,
    targetCode,
    targetType,
    coverageType,
    coverageValue,
    aggregation = 'total',
  } = params;

  // Validate required parameters
  if (!sourceCode || !sourceType) {
    throw new Error('sourceCode and sourceType are required parameters');
  }

  // Validate mutually exclusive parameters
  const hasTargetParams = targetCode || targetType;
  const hasCoverageParams = coverageType || coverageValue;

  if (hasTargetParams && hasCoverageParams) {
    throw new Error('targetCode/targetType and coverageType/coverageValue are mutually exclusive');
  }

  if (!hasTargetParams && !hasCoverageParams) {
    throw new Error('Either targetCode/targetType or coverageType must be provided');
  }

  // Validate targetType is provided when targetCode is provided
  if (targetCode && !targetType) {
    throw new Error('targetType is required when targetCode is provided');
  }

  // Validate coverageValue can only be used with coverageType
  if (coverageValue && !coverageType) {
    throw new Error('coverageValue can only be used with coverageType');
  }

  const api = getApiInstance('area-reference');
  
  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('sourceCode', sourceCode);
  queryParams.append('sourceType', sourceType);
  
  if (targetCode) queryParams.append('targetCode', targetCode);
  if (targetType) queryParams.append('targetType', targetType);
  if (coverageType) queryParams.append('coverageType', coverageType);
  if (coverageValue) queryParams.append('coverageValue', coverageValue);
  if (aggregation) queryParams.append('aggregation', aggregation);
  
  const endpoint = `/coverage?${queryParams.toString()}`;

  return await api.get(endpoint, '', {
    apiKey: initialisedConfig.apiKey,
  });
}