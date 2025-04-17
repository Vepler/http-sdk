import { getApiInstance, initialisedConfig } from '../../../config';
import { MetricsQueryParams, MetricsResponse } from '@vepler/schools-types/api/endpoints/metrics';

export async function getMetrics(
  params: MetricsQueryParams
): Promise<MetricsResponse> {
  const {
    schoolIds,
    academicYears,
    metricCodes,
    profile,
    cohortType,
    period,
    periodNumber,
    includeMetadata = false,
    priorAttainment,
    pupilCharacteristic
  } = params;

  // Validate required parameters
  if (!schoolIds) {
    throw new Error('The "schoolIds" parameter must be provided');
  }

  const api = getApiInstance('schools');
  const endpoint = '/metrics';

  const queryParams: Record<string, any> = {
    schoolIds: Array.isArray(schoolIds) ? schoolIds.join(',') : schoolIds
  };

  if (academicYears) {
    queryParams.academicYears = Array.isArray(academicYears) 
      ? academicYears.join(',') 
      : academicYears;
  }
  
  if (metricCodes) {
    queryParams.metricCodes = Array.isArray(metricCodes) 
      ? metricCodes.join(',') 
      : metricCodes;
  }
  
  if (profile) queryParams.profile = profile;
  if (cohortType) queryParams.cohortType = cohortType;
  if (period) queryParams.period = period;
  if (periodNumber !== undefined) queryParams.periodNumber = periodNumber;
  if (includeMetadata !== undefined) queryParams.includeMetadata = includeMetadata;
  if (priorAttainment) queryParams.priorAttainment = priorAttainment;
  if (pupilCharacteristic) queryParams.pupilCharacteristic = pupilCharacteristic;

  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}