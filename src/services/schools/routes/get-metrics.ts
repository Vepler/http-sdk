import { getApiInstance, initialisedConfig } from '../../../config';
import { createRequiredParameterError, createEitherOrParameterError } from '../../../utils/errors';
import {
  MetricsResponse,
  MetricsQueryOptions,
} from '@vepler/schools-types/api/endpoints/metrics';

export async function getMetrics(
  params: MetricsQueryOptions
): Promise<MetricsResponse> {
  const {
    schoolIds,
    metricCodes,
    academicYears,
    profile,
    cohortType,
    period,
    periodNumber,
    includeMetadata,
    priorAttainment,
    pupilCharacteristic,
    limit,
    offset,
  } = params;

  // Validate required parameters
  if (!schoolIds) {
    throw new Error(createRequiredParameterError('schoolIds'));
  }

  if (!metricCodes && !profile) {
    throw new Error(createEitherOrParameterError('metricCodes', 'profile'));
  }

  const api = getApiInstance('schools');
  const endpoint = '/metrics';

  // Map the query options to API query params
  // Need to use a record type since we're adding properties that aren't in MetricsQueryParams
  const queryParams: Record<string, string | number | boolean> = {
    schoolIds: Array.isArray(schoolIds)
      ? schoolIds.join(',')
      : String(schoolIds),
  };

  if (metricCodes) {
    queryParams.metricCodes = Array.isArray(metricCodes)
      ? metricCodes.join(',')
      : metricCodes;
  }

  if (academicYears) {
    queryParams.academicYears = Array.isArray(academicYears)
      ? academicYears.join(',')
      : academicYears;
  }

  if (profile) {
    queryParams.profile = Array.isArray(profile) ? profile.join(',') : profile;
  }
  if (cohortType) queryParams.cohortType = cohortType;
  if (period) queryParams.period = period;
  if (periodNumber !== undefined && periodNumber !== null)
    queryParams.periodNumber = periodNumber;
  if (includeMetadata !== undefined)
    queryParams.includeMetadata = includeMetadata;
  if (priorAttainment) queryParams.priorAttainment = priorAttainment;
  if (pupilCharacteristic)
    queryParams.pupilCharacteristic = pupilCharacteristic;
  if (limit) queryParams.limit = limit;
  if (offset) queryParams.offset = offset;

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}
