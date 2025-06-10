import { getApiInstance, initialisedConfig } from '../../../config';
import { JsonObject } from '../../../types';

export interface DemographicsQueryParams {
  geography_type: string;
  geography_codes: string;
  format?: 'array' | 'object';
  topics?: string;
  census_period?: string;
  hierarchy_level?: number;
  include_metadata?: boolean;
}

export interface GetDemographicsResponse {
  result: JsonObject[] | JsonObject;
  success: boolean;
}

export async function queryDemographics(
  queryParams: DemographicsQueryParams
): Promise<GetDemographicsResponse> {
  const {
    geography_type,
    geography_codes,
    format = 'object',
    topics,
    census_period,
    hierarchy_level,
    include_metadata = false
  } = queryParams;

  const api = getApiInstance('rover');
  const endpoint = '/demographics/query';

  return await api.query(
    endpoint,
    {
      geography_type,
      geography_codes,
      format,
      topics,
      census_period,
      hierarchy_level,
      include_metadata
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}

export default queryDemographics;
