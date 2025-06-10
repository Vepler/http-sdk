import { initializeSDK, safety, reset } from '../../src';
import { GetMetricsQueryParams } from '@vepler/safety-types';

// Mock the API service
jest.mock('@vepler/http-client', () => {
  return {
    create: jest.fn().mockImplementation(() => {
      return {
        query: jest.fn().mockImplementation((endpoint, params) => {
          if (endpoint === '/geography/metrics') {
            return Promise.resolve([
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
                    crimeCount: 50,
                    crimeRate: 5,
                    crimeScore: 3
                  },
                  {
                    category: 'violence',
                    crimeCount: 30,
                    crimeRate: 3,
                    crimeScore: 4
                  }
                ],
                timeSeriesData: [
                  {
                    period: '2022-01',
                    category: 'theft',
                    crimeCount: 50,
                    crimeRate: 5,
                    crimeScore: 3
                  },
                  {
                    period: '2022-01',
                    category: 'violence',
                    crimeCount: 30,
                    crimeRate: 3,
                    crimeScore: 4
                  }
                ]
              }
            ]);
          }
          return Promise.resolve([]);
        })
      };
    })
  };
});

describe('Safety API', () => {
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
      const params: GetMetricsQueryParams = {
        geographicCodes: 'E01000001,E01000002',
        periods: '2022-01,2022-02',
        mergeAreas: false,
        includeTimeSeries: true,
        months: 12
      };

      const response = await safety.geography.getMetrics(params);

      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response).toHaveLength(1);
      
      const firstResult = response[0];
      expect(firstResult?.geographicCode).toBe('E01000001');
      expect(firstResult?.name).toBe('Test Area');
      expect(firstResult?.population).toBe(10000);
      expect(firstResult?.totalCrimeCount).toBe(100);
      expect(firstResult?.categories).toHaveLength(2);
      expect(firstResult?.timeSeriesData).toHaveLength(2);
    });

    it('should fetch crime metrics for geographic areas using date range', async () => {
      const params: GetMetricsQueryParams = {
        geographicCodes: 'E01000001,E01000002',
        startDate: '2022-01',
        endDate: '2022-12',
        mergeAreas: false,
        includeTimeSeries: true,
        months: 12
      };

      const response = await safety.geography.getMetrics(params);

      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response).toHaveLength(1);
      
      const firstResult = response[0];
      expect(firstResult?.geographicCode).toBe('E01000001');
      expect(firstResult?.totalCrimeCount).toBe(100);
    });

    it('should throw an error if neither periods nor date range is provided', async () => {
      const params: GetMetricsQueryParams = {
        geographicCodes: 'E01000001,E01000002'
      };

      await expect(safety.geography.getMetrics(params)).rejects.toThrow(
        'Either "periods" or both "startDate" and "endDate" must be provided'
      );
    });

    it('should throw an error if only startDate is provided without endDate', async () => {
      const params: GetMetricsQueryParams = {
        geographicCodes: 'E01000001,E01000002',
        startDate: '2022-01'
      };

      await expect(safety.geography.getMetrics(params)).rejects.toThrow(
        'Either "periods" or both "startDate" and "endDate" must be provided'
      );
    });
  });
});