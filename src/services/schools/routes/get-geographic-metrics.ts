import { getApiInstance, initialisedConfig } from '../../../config';
import { 
  MetricsGeographicRequestBody, 
  MetricsGeographicResponse 
} from '@vepler/schools-types/api/endpoints/metrics-geographic';

export async function getGeographicMetrics(
  body: MetricsGeographicRequestBody
): Promise<MetricsGeographicResponse> {
  // Validate required parameters
  if (!body.geography || !body.geography.codes || !body.geography.type) {
    throw new Error('The geography object with codes and type must be provided');
  }

  const api = getApiInstance('schools');
  const endpoint = '/metrics/geographic';

  return await api.post(
    endpoint,
    body,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}