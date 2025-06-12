import { getApiInstance, initialisedConfig } from '../../../config';
import {
  GetAreaStatsQueryParams,
  GetAreaStatsResponse,
} from '@vepler/safety-types';

export async function getAreaStats(
  params: GetAreaStatsQueryParams
): Promise<GetAreaStatsResponse> {
  const { areaId, periods, startDate, endDate, categories, countryCode } =
    params;

  // Validate that either periods OR (startDate AND endDate) is provided
  if (!periods && !(startDate && endDate)) {
    throw new Error(
      'Either "periods" or both "startDate" and "endDate" must be provided'
    );
  }

  const api = getApiInstance('safety');
  const endpoint = '/area/stats';

  return await api.query(
    endpoint,
    {
      areaId,
      periods,
      startDate,
      endDate,
      categories,
      countryCode,
    },
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
