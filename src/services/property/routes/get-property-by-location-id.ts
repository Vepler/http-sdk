import { getApiInstance, initialisedConfig } from '../../../config';

export interface GetPropertyParams {
  locationIds: string[];
  attributes?: string[];
  limit?: number;
}

export interface PropertyResponse {
  result: object[];
  success: boolean;
}

export async function getPropertyById(
  params: GetPropertyParams
): Promise<PropertyResponse> {
  const { locationIds, attributes = [], limit } = params;

  const api = getApiInstance('property');
  const endpoint = `/${locationIds.join(',')}`;

  const queryParams: Record<string, string> = {};

  if (attributes.length > 0) {
    queryParams.attributes = attributes.join(',');
  }

  if (limit !== undefined) {
    queryParams.limit = limit.toString();
  }

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}
