import { getApiInstance, initialisedConfig } from '../../../config';

// Connectivity service uses the area-reference API for all endpoints

export interface GetConnectivityScoresParams {
  geographicCodes: string;
  includeBreakdown?: boolean;
  includeAreaInfo?: boolean;
  dataPeriod?: string;
  startPeriod?: string;
  endPeriod?: string;
  includePeriodHistory?: boolean;
  periodLimit?: number;
  format?: 'basic' | 'detailed';
  limit?: number;
}

export interface ConnectivityScore {
  code: string;
  name?: string;
  type?: string;
  score: number;
  breakdown?: {
    [key: string]: number;
  };
  periodHistory?: {
    period: string;
    score: number;
  }[];
}

export interface GetConnectivityScoresResponse {
  result: ConnectivityScore[];
  success: boolean;
  metadata?: {
    totalCount: number;
    periodRange?: {
      start: string;
      end: string;
    };
  };
}

export async function getConnectivityScores(params: GetConnectivityScoresParams): Promise<GetConnectivityScoresResponse> {
  const { 
    geographicCodes,
    includeBreakdown,
    includeAreaInfo,
    dataPeriod,
    startPeriod,
    endPeriod,
    includePeriodHistory,
    periodLimit,
    format,
    limit
  } = params;

  const api = getApiInstance('area-reference');
  const endpoint = `/connectivity/${geographicCodes}`;
  
  const queryParams: Record<string, string | number | boolean> = {};
  
  if (includeBreakdown !== undefined) queryParams.includeBreakdown = includeBreakdown;
  if (includeAreaInfo !== undefined) queryParams.includeAreaInfo = includeAreaInfo;
  if (dataPeriod !== undefined) queryParams.dataPeriod = dataPeriod;
  if (startPeriod !== undefined) queryParams.startPeriod = startPeriod;
  if (endPeriod !== undefined) queryParams.endPeriod = endPeriod;
  if (includePeriodHistory !== undefined) queryParams.includePeriodHistory = includePeriodHistory;
  if (periodLimit !== undefined) queryParams.periodLimit = periodLimit;
  if (format !== undefined) queryParams.format = format;
  if (limit !== undefined) queryParams.limit = limit;
  
  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}