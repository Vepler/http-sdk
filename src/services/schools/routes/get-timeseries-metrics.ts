import { getApiInstance, initialisedConfig } from '../../../config';
import { createRequiredParameterError, createEitherOrParameterError } from '../../../utils/errors';
import {
  MetricsTimeSeriesQueryOptions,
  MetricsTimeSeriesResponse,
} from '@vepler/schools-types/api/endpoints/metrics-timeseries';

export async function getTimeSeriesMetrics(
  params: MetricsTimeSeriesQueryOptions
): Promise<MetricsTimeSeriesResponse> {
  const {
    metricCodes,
    academicYears,
    profile,
    cohortType,
    contextualFactors,
    granularity,
  } = params;

  const api = getApiInstance('schools');
  const endpoint = '/metrics/timeseries';

  // We need to construct query params from the options
  // Since there's no direct API query params type, we'll construct a compatible object
  const queryParams: Record<string, any> = {};

  // Convert metricCodes to comma-separated string if it's an array
  if (metricCodes) {
    queryParams.metricCodes = Array.isArray(metricCodes)
      ? metricCodes.join(',')
      : metricCodes;
  }

  // Convert academicYears to comma-separated string if it's an array
  if (academicYears) {
    queryParams.academicYears = Array.isArray(academicYears)
      ? academicYears.join(',')
      : academicYears;
  }

  if (profile) {
    queryParams.profile = Array.isArray(profile) ? profile.join(',') : profile;
  }
  if (cohortType) queryParams.cohortType = cohortType;
  if (granularity) queryParams.granularity = granularity;

  // Add contextual factors if provided
  if (contextualFactors) {
    if (contextualFactors.priorAttainment) {
      queryParams.priorAttainment = contextualFactors.priorAttainment;
    }
    if (contextualFactors.pupilCharacteristic) {
      queryParams.pupilCharacteristic = contextualFactors.pupilCharacteristic;
    }
  }

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}
