import { getApiInstance, initialisedConfig } from '../../../config';
import { JsonObject } from '../../../types';

export interface GetPropertyByPropertyIdParams {
  propertyIds: string[];
  attributes?: string[];
  limit?: number;
  includeGeometry?: boolean;
}

export interface PropertyEntity {
  id: string;
  uprn?: string;
  address?: string;
  location?: {
    lat: number;
    long: number;
  };
  geometry?: object;
  status: string;
  metadata: JsonObject | null;
  // Additional property-specific fields
}

export interface PropertyResponse {
  result: PropertyEntity[];
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
