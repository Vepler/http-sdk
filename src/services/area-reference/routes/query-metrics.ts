import { getApiInstance, initialisedConfig } from '../../../config';

// @todo this needs to be moved into the shared types
export interface GetPropertyByPropertyIdParams {
  metricIds?: string;
  geographicEntityIds?: string;
  geographicEntityTypes?: string;
  startYear?: number;
  endYear?: number;
  startMonth?: number;
  endMonth?: number;
  sourceServices?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  includeMetric?: boolean;
  includeGeographicEntity?: boolean;
  attributes?: string;
}

export interface GetAreasResponse {
  result: object[];
  success: boolean;
  count: number;
}

export async function queryMetrics(params: GetPropertyByPropertyIdParams): Promise<GetAreasResponse> {
  const {
    metricIds,
    geographicEntityIds,
    geographicEntityTypes,
    startYear,
    endYear,
    startMonth,
    endMonth,
    sourceServices,
    limit,
    offset,
    sortBy,
    sortOrder,
    includeMetric,
    includeGeographicEntity,
    attributes,
  } = params;

  const api = getApiInstance('area-reference');
  const endpoint = `/metric-values`;
  
  return await api.query(
    endpoint,
    {
      metricIds,
      geographicEntityIds,
      geographicEntityTypes,
      startYear,
      endYear,
      startMonth,
      endMonth,
      sourceServices,
      limit,
      offset,
      sortBy,
      sortOrder,
      includeMetric,
      includeGeographicEntity,
      attributes,
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}
