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
): Promise<H3.GetH3AggregationsResponse> {
  const {
    locations,
    resolution = 9,
    components = ['relationships', 'coverage', 'metrics'],
    forceRefresh = false,
    refreshCoverageTypes
  } = params;

  const api = getApiInstance('area-reference');
  const endpoint = '/h3/aggregations';

  const requestBody: H3.GetH3AggregationsRequest = {
    locations,
    resolution,
    components,
    forceRefresh,
    refreshCoverageTypes
  };

  return await api.request(
    endpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    },
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}