import { getApiInstance, initialisedConfig } from '../../../config';
import { createRequiredParameterError } from '../../../utils/errors';
import {
  CanonicalAutocompleteQueryParams,
  CanonicalSuccessResponse,
  CanonicalAutocompleteResult,
} from '@vepler/locations-types';

export async function autocompleteLocation(
  params: CanonicalAutocompleteQueryParams
): Promise<CanonicalSuccessResponse<CanonicalAutocompleteResult[]>> {
  const { q, limit, country, region, county, locationType, minImportance, latitude, longitude, radiusKm, includeEnrichment } = params;

  // Validate required parameters
  if (!q) {
    throw new Error(createRequiredParameterError('q'));
  }

  const api = getApiInstance('locator');
  const endpoint = '/locations/autocomplete';

  const queryParams: any = { q };

  // Add optional parameters if provided
  if (limit !== undefined) queryParams.limit = limit;
  if (country) queryParams.country = country;
  if (region) queryParams.region = region;
  if (county) queryParams.county = county;
  if (locationType && locationType.length > 0) queryParams.locationType = locationType;
  if (minImportance !== undefined) queryParams.minImportance = minImportance;
  if (latitude !== undefined) queryParams.latitude = latitude;
  if (longitude !== undefined) queryParams.longitude = longitude;
  if (radiusKm !== undefined) queryParams.radiusKm = radiusKm;
  if (includeEnrichment !== undefined) queryParams.includeEnrichment = includeEnrichment;

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}
