import { getApiInstance, initialisedConfig } from '../../../config';

export interface QueryGeographyMetricsParams {
  geographicCodes: string;
  periods?: string;
  startDate?: string;
  endDate?: string;
  mergeAreas?: boolean;
  includeTimeSeries?: boolean;
  months?: number;
}

export interface CategoryMetrics {
  category: string;
  count: number;
  rate: number;
  score: number;
}

export interface AreaMetricsResponse {
  geographicCode: string;
  name: string;
  population: number;
  period: string;
  totalCrimeCount: number;
  totalCrimeRate: number;
  totalCrimeScore: number;
  categories: CategoryMetrics[];
  timeSeriesData: {
    period: string;
    categories: {
      [category: string]: number;
    };
  }[];
}

export interface QueryGeographyMetricsResponse {
  result: AreaMetricsResponse[];
  success: boolean;
}

const datePattern = /^\d{4}-\d{2}$/;

// This would be the actual Joi implementation in the API route handler
export const queryGeographyMetricsValidation = {
  query: {
    geographicCodes: {
      required: true,
      description: 'Comma-separated list of geographic codes'
    },
    periods: {
      description: 'Comma-separated list of periods in YYYY-MM format',
      custom: (value: string) => {
        // Split by comma and validate each period
        const periods = value.split(',');
        for (const period of periods) {
          if (!datePattern.test(period.trim())) {
            return new Error(`Invalid period format: ${period}`);
          }
        }
        return value;
      }
    },
    startDate: {
      description: 'Start date in YYYY-MM format for period range',
      custom: (value: string) => {
        if (!datePattern.test(value)) {
          return new Error(`Invalid date format: ${value}`);
        }
        return value;
      }
    },
    endDate: {
      description: 'End date in YYYY-MM format for period range',
      custom: (value: string) => {
        if (!datePattern.test(value)) {
          return new Error(`Invalid date format: ${value}`);
        }
        return value;
      }
    },
    mergeAreas: {
      default: false,
      description: 'Whether to merge all geographic areas into one combined result'
    },
    includeTimeSeries: {
      default: true,
      description: 'Whether to include time series data in the response'
    },
    months: {
      min: 1,
      max: 24,
      default: 12,
      description: 'Number of months to include in time series data'
    }
  },
  // This is a pseudo representation of Joi's .or() and .and() methods
  validationRules: [
    { type: 'or', fields: ['periods', 'startDate'] }
  ]
};

export async function queryGeographyMetrics(params: QueryGeographyMetricsParams): Promise<QueryGeographyMetricsResponse> {
  const {
    geographicCodes,
    periods,
    startDate,
    endDate,
    mergeAreas = false,
    includeTimeSeries = true,
    months = 12
  } = params;

  // Validate that either periods OR (startDate AND endDate) is provided
  if (!periods && !(startDate && endDate)) {
    throw new Error('Either "periods" or both "startDate" and "endDate" must be provided');
  }

  const api = getApiInstance('crime');
  const endpoint = `/geography/metrics`;
  
  return await api.query(
    endpoint,
    {
      geographicCodes,
      periods,
      startDate,
      endDate,
      mergeAreas,
      includeTimeSeries,
      months
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}