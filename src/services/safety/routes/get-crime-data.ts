import { getApiInstance, initialisedConfig } from '../../../config';
import { GetCrimeDataQueryParams, GetCrimeDataResponse } from '@vepler/safety-types';

export async function getCrimeData(params: GetCrimeDataQueryParams): Promise<GetCrimeDataResponse[]> {
  const { geographicCodes, periods, startDate, endDate, categories, countryCode } = params;

  // Validate that either periods OR (startDate AND endDate) is provided
  if (!periods && !(startDate && endDate)) {
    throw new Error('Either "periods" or both "startDate" and "endDate" must be provided');
  }

  const api = getApiInstance('safety');
  const endpoint = '/';
  
  return await api.query(
    endpoint,
    {
      geographicCodes,
      periods,
      startDate,
      endDate,
      categories,
      countryCode
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}