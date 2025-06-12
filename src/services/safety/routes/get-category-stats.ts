import { getApiInstance, initialisedConfig } from '../../../config';
import {
  GetCategoryStatsQueryParams,
  GetCategoryStatsResponse,
} from '@vepler/safety-types';

export async function getCategoryStats(
  params: GetCategoryStatsQueryParams
): Promise<GetCategoryStatsResponse> {
  const {
    geographicCodes,
    periods,
    startDate,
    endDate,
    categories,
    countryCode,
  } = params;

  // Validate that either periods OR (startDate AND endDate) is provided
  if (!periods && !(startDate && endDate)) {
    throw new Error(
      'Either "periods" or both "startDate" and "endDate" must be provided'
    );
  }

  const api = getApiInstance('safety');
  const endpoint = '/area/category-stats';

  return await api.query(
    endpoint,
    {
      geographicCodes,
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
