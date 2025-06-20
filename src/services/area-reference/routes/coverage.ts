import { getApiInstance, initialisedConfig } from '../../../config';
import { Areas } from '@vepler/area-reference-types';
import {
  createRequiredParameterError,
  createMutuallyExclusiveError,
  createEitherOrParameterError,
  createConditionalParameterError,
} from '../../../utils/errors';

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
  if (!sourceCode) {
    throw new Error(createRequiredParameterError('sourceCode'));
  }
  if (!sourceType) {
    throw new Error(createRequiredParameterError('sourceType'));
  }

  // Validate mutually exclusive parameters
  const hasTargetParams = targetCode || targetType;
  const hasCoverageParams = coverageType || coverageValue;

  if (hasTargetParams && hasCoverageParams) {
    throw new Error(
      createMutuallyExclusiveError(
        'targetCode/targetType',
        'coverageType/coverageValue'
      )
    );
  }

  if (!hasTargetParams && !hasCoverageParams) {
    throw new Error(
      createEitherOrParameterError('targetCode/targetType', 'coverageType')
    );
  }

  // Validate targetType is provided when targetCode is provided
  if (targetCode && !targetType) {
    throw new Error(createConditionalParameterError('targetCode', 'targetType'));
  }

  // Validate coverageValue can only be used with coverageType
  if (coverageValue && !coverageType) {
    throw new Error(createConditionalParameterError('coverageValue', 'coverageType'));
  }

  const api = getApiInstance('area-reference');
  const endpoint = '/coverage';

  return await api.query(
    endpoint,
    {
      sourceCode,
      sourceType,
      targetCode,
      targetType,
      coverageType,
      coverageValue,
      aggregation,
    },
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}