import { getApiInstance, initialisedConfig } from '../../../config';
import { createRequiredParameterError, createEitherOrParameterError } from '../../../utils/errors';
import {
  MetricsGeographicRequestBody,
  MetricsGeographicResponse,
  GeographicMetricsQueryOptions,
} from '@vepler/schools-types/api/endpoints/metrics-geographic';

export async function getGeographicMetrics(
  params: GeographicMetricsQueryOptions
): Promise<MetricsGeographicResponse> {
  const {
    metricCodes,
    academicYearId,
    geography,
    profile,
    cohortType,
    hierarchicalResults,
    aggregationLevels,
    includeMetadata,
    limit,
    offset,
  } = params;

  // Validate required parameters
  if (!metricCodes && !profile) {
    throw new Error(createEitherOrParameterError('metricCodes', 'profile'));
  }

  if (!geography) {
    throw new Error(createRequiredParameterError('geography'));
  }

  const api = getApiInstance('schools');
  const endpoint = '/metrics/geographic';

  // Prepare the request body with the structure expected by the API
  const requestBody: MetricsGeographicRequestBody = {
    geography: geography,
  };

  if (metricCodes) {
    requestBody.metricCodes = Array.isArray(metricCodes)
      ? metricCodes
      : [metricCodes];
  }

  if (academicYearId) requestBody.academicYearId = academicYearId;

  if (profile) {
    // The type definition expects a string, but the interface allows an array
    requestBody.profile = Array.isArray(profile) ? profile[0] : profile;
  }

  if (cohortType) requestBody.cohortType = cohortType;
  if (hierarchicalResults !== undefined)
    requestBody.hierarchicalResults = hierarchicalResults;
  if (aggregationLevels) requestBody.aggregationLevels = aggregationLevels;
  if (includeMetadata !== undefined)
    requestBody.includeMetadata = includeMetadata;
  if (limit) requestBody.limit = limit;
  if (offset) requestBody.offset = offset;

  return await api.post(endpoint, requestBody, {
    apiKey: initialisedConfig.apiKey,
  });
}
