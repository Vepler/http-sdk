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
    targetCode,
    coverageType,
    intersectsWith,
  } = params;

  // Validate required parameters
  if (!sourceCode) {
    throw new Error(createRequiredParameterError('sourceCode'));
  }

  // Validate intersectsWith can only be used with coverageType (not with targetCode)
  if (intersectsWith && targetCode) {
    throw new Error(
      createMutuallyExclusiveError('intersectsWith', 'targetCode')
    );
  }

  if (intersectsWith && !coverageType) {
    throw new Error(createConditionalParameterError('intersectsWith', 'coverageType'));
  }

  // Validate mutually exclusive parameters: either targetCode OR coverageType must be specified
  if (targetCode && coverageType) {
    throw new Error(
      createMutuallyExclusiveError('targetCode', 'coverageType')
    );
  }

  if (!targetCode && !coverageType) {
    throw new Error(
      createEitherOrParameterError('targetCode', 'coverageType')
    );
  }

  const api = getApiInstance('area-reference');
  const endpoint = '/coverage';

  return await api.query(
    endpoint,
    {
      sourceCode,
      targetCode,
      coverageType,
      intersectsWith,
    },
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}