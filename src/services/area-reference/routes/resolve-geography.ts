import { getApiInstance, initialisedConfig } from '../../../config';
import { Geographic } from '@vepler/area-reference-types';
import { filterDefinedParams } from '../../../utils';

export interface ResolveGeographyParams
  extends Geographic.ResolveGeographyQueryParams {
  spatialStrategy?: 'strict' | 'centroid' | 'intersection' | 'weighted';
  intersectionThreshold?: number;
  maxChildren?: number;
}

export async function resolveGeography(
  params: ResolveGeographyParams
): Promise<Geographic.ResolveGeographyResponse> {
  const {
    inputCode,
    supportedTiers,
    spatialStrategy,
    intersectionThreshold,
    maxChildren,
  } = params;

  // Validate required parameters
  if (!inputCode) {
    throw new Error('The "inputCode" parameter must be provided');
  }
  if (!supportedTiers) {
    throw new Error('The "supportedTiers" parameter must be provided');
  }

  // Validate spatialStrategy-specific parameters
  if (spatialStrategy === 'weighted' && intersectionThreshold === undefined) {
    throw new Error(
      'The "intersectionThreshold" parameter is required when spatialStrategy is "weighted"'
    );
  }
  if (
    intersectionThreshold !== undefined &&
    (intersectionThreshold < 0.1 || intersectionThreshold > 0.9)
  ) {
    throw new Error(
      'The "intersectionThreshold" parameter must be between 0.1 and 0.9'
    );
  }
  if (maxChildren !== undefined && (maxChildren < 1 || maxChildren > 500000)) {
    throw new Error(
      'The "maxChildren" parameter must be between 1 and 500,000'
    );
  }

  const api = getApiInstance('area-reference');
  const endpoint = '/geographic/resolve';

  return await api.query(
    endpoint,
    filterDefinedParams(params, [
      'inputCode',
      'supportedTiers',
      'spatialStrategy',
      'intersectionThreshold',
      'maxChildren',
    ]),
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}

export interface GetGeographyTypesParams {
  includeExamples?: boolean;
}

export async function getGeographyTypes(
  params?: GetGeographyTypesParams
): Promise<Geographic.GeographicTypesResponse> {
  const api = getApiInstance('area-reference');
  const endpoint = '/geographic/types';

  return await api.query(endpoint, filterDefinedParams(params || {}, []), {
    apiKey: initialisedConfig.apiKey,
  });
}

export type CheckResolutionCapabilityParams =
  Geographic.CheckResolutionCapabilityQueryParams;

export async function checkResolutionCapability(
  params: CheckResolutionCapabilityParams
): Promise<Geographic.CheckResolutionCapabilityResponse> {
  const { inputType, supportedTiers } = params;

  // Validate required parameters
  if (!inputType) {
    throw new Error('The "inputType" parameter must be provided');
  }
  if (!supportedTiers) {
    throw new Error('The "supportedTiers" parameter must be provided');
  }

  const api = getApiInstance('area-reference');
  const endpoint = '/geographic/capability';

  return await api.query(
    endpoint,
    filterDefinedParams(params, ['inputType', 'supportedTiers']),
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
