import { initializeSDK, crime, reset } from '../../src';
import { QueryGeographyMetricsParams } from '../../src/services/crime/routes/query-geography-metrics';

// Mock the API service
jest.mock('@vepler/http-client', () => {
  return {
    create: jest.fn().mockImplementation(() => {
      return {
        query: jest.fn().mockImplementation((endpoint, params) => {
          if (endpoint === '/geography/metrics') {
            return Promise.resolve({
              success: true,
              result: [
                {
                  geographicCode: 'E01000001',
                  name: 'Test Area',
                  population: 10000,
                  period: '2022-01',
                  totalCrimeCount: 100,
                  totalCrimeRate: 10,
                  totalCrimeScore: 5,
                  categories: [
                    {
                      category: 'theft',
                      count: 50,
                      rate: 5,
                      score: 3
                    },
                    {
                      category: 'violence',
                      count: 30,
                      rate: 3,
                      score: 4
                    }
                  ],
                  timeSeriesData: [
                    {
                      period: '2022-01',
                      categories: {
                        theft: 50,
                        violence: 30
                      }
                    }
                  ]
                }
              ]
            });
          }
          return Promise.resolve({ success: false });
        })
      };
    })
  };
});

describe('Crime API', () => {
  beforeEach(() => {
    // Initialize the SDK before each test
    initializeSDK({
      apiKey: 'test-api-key'
    });
  });

  afterEach(() => {
    // Reset the SDK after each test
    reset();
    jest.clearAllMocks();
  });

  describe('Geography Metrics', () => {
    it('should fetch crime metrics for geographic areas using periods', async () => {
      const params: QueryGeographyMetricsParams = {
        geographicCodes: 'E01000001,E01000002',
        periods: '2022-01,2022-02',
        mergeAreas: false,
        includeTimeSeries: true,
        months: 12
      };

      const response = await crime.geography.metrics(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);
      
      const firstResult = response?.result[0];
      expect(firstResult?.geographicCode).toBe('E01000001');
      expect(firstResult?.name).toBe('Test Area');
      expect(firstResult?.population).toBe(10000);
      expect(firstResult?.totalCrimeCount).toBe(100);
      expect(firstResult?.categories).toHaveLength(2);
      expect(firstResult?.timeSeriesData).toHaveLength(1);
    });

    it('should fetch crime metrics for geographic areas using date range', async () => {
      const params: QueryGeographyMetricsParams = {
        geographicCodes: 'E01000001,E01000002',
        startDate: '2022-01',
        endDate: '2022-12',
        mergeAreas: false,
        includeTimeSeries: true,
        months: 12
      };

      const response = await crime.geography.metrics(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);
      
      const firstResult = response?.result[0];
      expect(firstResult?.geographicCode).toBe('E01000001');
      expect(firstResult?.totalCrimeCount).toBe(100);
    });

    it('should throw an error if neither periods nor date range is provided', async () => {
      const params: QueryGeographyMetricsParams = {
        geographicCodes: 'E01000001,E01000002'
      };

      await expect(crime.geography.metrics(params)).rejects.toThrow(
        'Either "periods" or both "startDate" and "endDate" must be provided'
      );
    });

    it('should throw an error if only startDate is provided without endDate', async () => {
      const params: QueryGeographyMetricsParams = {
        geographicCodes: 'E01000001,E01000002',
        startDate: '2022-01'
      };

      await expect(crime.geography.metrics(params)).rejects.toThrow(
        'Either "periods" or both "startDate" and "endDate" must be provided'
      );
    });
  });
});