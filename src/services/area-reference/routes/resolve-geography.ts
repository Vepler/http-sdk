import { getApiInstance, initialisedConfig } from '../../../config';
import { Geographic } from '@vepler/area-reference-types';
import { filterDefinedParams } from '../../../utils';

export interface ResolveGeographyParams extends Geographic.ResolveGeographyQueryParams {}

export async function resolveGeography(
  params: ResolveGeographyParams
): Promise<Geographic.ResolveGeographyResponse> {
  const {
    inputCode,
    supportedTiers,
  } = params;

  // Validate required parameters
  if (!inputCode) {
    throw new Error('The "inputCode" parameter must be provided');
  }
  if (!supportedTiers) {
    throw new Error('The "supportedTiers" parameter must be provided');
  }

  const api = getApiInstance('area-reference');
  const endpoint = '/geographic/resolve';

  return await api.query(
    endpoint,
    filterDefinedParams(params, ['inputCode', 'supportedTiers']),
    {
      apiKey: initialisedConfig.apiKey
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

  return await api.query(
    endpoint,
    filterDefinedParams(params || {}, []),
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}

export interface CheckResolutionCapabilityParams extends Geographic.CheckResolutionCapabilityQueryParams {}

export async function checkResolutionCapability(
  params: CheckResolutionCapabilityParams
): Promise<Geographic.CheckResolutionCapabilityResponse> {
  const {
    inputType,
    supportedTiers,
  } = params;

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
      apiKey: initialisedConfig.apiKey
    }
  );
}
