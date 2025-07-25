import { getApiInstance, initialisedConfig } from '../../../config';

export interface GetH3AggregationsParams {
  locations: any[];
  resolution?: number;
  components?: Array<'relationships' | 'coverage' | 'metrics'>;
  forceRefresh?: boolean;
  refreshCoverageTypes?: string[];
}

export async function getH3Aggregations(
  params: GetH3AggregationsParams
): Promise<any> {
  const {
    locations,
    resolution = 9,
    components = ['relationships', 'coverage', 'metrics'],
    forceRefresh = false,
    refreshCoverageTypes
  } = params;

  const api = getApiInstance('area-reference');
  const endpoint = '/aggregations';

  const requestBody: any = {
    locations,
    resolution,
    components,
    forceRefresh,
    refreshCoverageTypes
  };

  return await api.post(
    endpoint,
    requestBody,
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}