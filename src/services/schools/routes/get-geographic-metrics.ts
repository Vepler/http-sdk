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

  // Convert the typed body to a Record<string, unknown> to satisfy TypeScript
  return await api.post(
    endpoint,
    body as unknown as Record<string, unknown>,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}