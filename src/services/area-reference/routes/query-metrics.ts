import { getApiInstance, initialisedConfig } from '../../../config';
import { Metrics } from '@vepler/area-reference-types';

export async function queryMetrics(params: Metrics.GetMetricValuesQueryParams): Promise<Metrics.GetMetricValuesResponse> {
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
