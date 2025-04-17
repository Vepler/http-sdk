import { getApiInstance, initialisedConfig } from '../../../config';

export interface GetPropertyByPropertyIdParams {
  propertyIds: string[];
  attributes?: string[];
  limit?: number;
  includeGeometry?: boolean;
}

export interface PropertyResponse {
  result: object[];
  success: boolean;
}

export async function getProperty(params: GetPropertyByPropertyIdParams): Promise<PropertyResponse> {
  const { propertyIds, attributes = [], limit } = params;

  const api = getApiInstance('property');
  const endpoint = `/propertyId/${propertyIds.join(',')}`;

  const queryParams: Record<string, string> = {};

  if (attributes.length > 0) {
    queryParams.attributes = attributes.join(',');
  }

  if (limit !== undefined) {
    queryParams.limit = limit.toString();
  }

  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
