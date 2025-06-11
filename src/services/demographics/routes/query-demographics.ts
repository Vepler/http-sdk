import { getApiInstance, initialisedConfig } from '../../../config';
import { JsonObject } from '../../../types';

export interface DemographicsQueryParams {
  geographyCodes: string;
  format?: 'array' | 'object';
  topics?: string;
  censusPeriod?: string;
  hierarchyLevel?: number;
  includeMetadata?: boolean;
}

export interface GetDemographicsResponse {
  result: JsonObject[] | JsonObject;
  success: boolean;
}

export async function queryDemographics(
  queryParams: DemographicsQueryParams
): Promise<GetDemographicsResponse> {
  const {
    geographyCodes,
    format = 'object',
    topics,
    censusPeriod,
    hierarchyLevel,
    includeMetadata = false
  } = queryParams;

  const api = getApiInstance('rover');
  const endpoint = '/demographics/query';

  return await api.query(
    endpoint,
    {
      geographyCodes,
      format,
      topics,
      censusPeriod,
      hierarchyLevel,
      includeMetadata
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}

export default queryDemographics;
