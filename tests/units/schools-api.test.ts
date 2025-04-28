import { initializeSDK, reset } from '../../src';
import { MetricsQueryOptions } from '@vepler/schools-types/api/endpoints/metrics';
import { MetricsTimeSeriesQueryOptions } from '@vepler/schools-types/api/endpoints/metrics-timeseries';
import { GeographicMetricsQueryOptions, GeographicType } from '@vepler/schools-types/api/endpoints/metrics-geographic';
import { SchoolsQueryParams } from '@vepler/schools-types/api/endpoints/schools';

// Mock the HTTP client
jest.mock('@vepler/http-client', () => {
  return {
    create: jest.fn().mockImplementation(() => {
      return {
        query: jest.fn().mockImplementation((endpoint) => {
          if (endpoint === '/601') {
            return Promise.resolve({
              success: true,
              data: {
                id: 601,
                URN: 100601,
                name: 'Example Primary School',
                slug: 'example-primary-school',
                type: 'primary',
                subType: 'academy',
                status: 'open',
                coordinates: [-0.118092, 51.509865],
                details: {
                  ageRange: {
                    from: 4,
                    to: 11
                  }
                }
              }
            });
          }

          if (endpoint === '/metrics') {
            return Promise.resolve({
              success: true,
              data: {
                metrics: [
                  {
                    schoolId: 601,
                    schoolName: 'Example Primary School',
                    schoolURN: 100601,
                    metricCode: 'attendance_overall',
                    academicYear: 'GB_2022-2023',
                    academicYearName: '2022-2023',
                    value: '95.6',
                    cohortType: 'all',
                    period: 'annual',
                    periodNumber: null
                  }
                ],
                meta: {
                  total: 1
                }
              }
            });
          }

          if (endpoint === '/metrics/timeseries') {
            return Promise.resolve({
              success: true,
              data: {
                series: [
                  {
                    timePeriod: '2018-2019',
                    timestamp: 1546300800000,
                    granularity: 'annual',
                    attendance_overall: '94.3'
                  },
                  {
                    timePeriod: '2019-2020',
                    timestamp: 1577836800000,
                    granularity: 'annual',
                    attendance_overall: '91.2'
                  }
                ],
                metrics: [
                  {
                    id: 1,
                    code: 'attendance_overall',
                    description: 'Overall Attendance',
                    category: 'attendance',
                    metadata: {
                      nationalAverage: 94.2,
                      isHigherBetter: true,
                      units: '%'
                    }
                  }
                ],
                metadata: {
                  version: '1.0',
                  generatedAt: new Date().toISOString()
                }
              }
            });
          }

          return Promise.resolve({ success: false });
        }),
        post: jest.fn().mockImplementation((endpoint) => {
          if (endpoint === '/') {
            return Promise.resolve({
              success: true,
              data: {
                schools: [
                  {
                    id: 601,
                    URN: 100601,
                    name: 'Example Primary School',
                    slug: 'example-primary-school',
                    type: 'primary',
                    subType: 'academy',
                    status: 'open'
                  }
                ],
                pagination: {
                  total: 1,
                  pages: 1,
                  currentPage: 1,
                  pageSize: 10
                }
              }
            });
          }

          if (endpoint === '/metrics/geographic') {
            return Promise.resolve({
              success: true,
              data: {
                areas: [
                  {
                    geographyCode: 'E09000033',
                    geographyName: 'Westminster',
                    geographyType: 'localAuthority',
                    schoolCount: 85,
                    metrics: [
                      {
                        metricCode: 'attendance_overall',
                        average: 94.8,
                        count: 85
                      }
                    ]
                  }
                ]
              }
            });
          }

          return Promise.resolve({ success: false });
        })
      };
    })
  };
});

describe('Schools API', () => {
  beforeEach(() => {
    // Initialize the SDK with a test API key
    initializeSDK({
      apiKey: 'test-api-key'
    });
  });

  afterEach(() => {
    reset();
    jest.clearAllMocks();
  });

  describe('getSchoolById', () => {
    it('should fetch a school by ID', async () => {
      const { schools } = require('../../src');
      
      const response = await schools.getSchoolById({
        id: 601
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.data.id).toBe(601);
      expect(response.data.name).toBe('Example Primary School');
      expect(response.data.details.ageRange.from).toBe(4);
      expect(response.data.details.ageRange.to).toBe(11);
    });
  });

  describe('getSchools', () => {
    it('should query schools using filters', async () => {
      const { schools } = require('../../src');
      
      const queryParams: SchoolsQueryParams = {
        name: 'Example',
        page: 1,
        limit: 10
      };
      
      const response = await schools.getSchools(queryParams);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.data.schools.length).toBeGreaterThan(0);
      expect(response.data.schools[0].name).toBe('Example Primary School');
    });
  });

  describe('getMetrics', () => {
    it('should fetch metrics for a school', async () => {
      const { schools } = require('../../src');
      
      const params: MetricsQueryOptions = {
        schoolIds: [601],
        metricCodes: ['attendance_overall']
      };
      
      const response = await schools.metrics.get(params);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.data.metrics.length).toBe(1);
      expect(response.data.metrics[0].schoolId).toBe(601);
      expect(response.data.metrics[0].metricCode).toBe('attendance_overall');
      expect(response.data.metrics[0].value).toBe('95.6');
    });
  });

  describe('getTimeSeriesMetrics', () => {
    it('should fetch time series metrics for a school', async () => {
      const { schools } = require('../../src');
      
      const params: MetricsTimeSeriesQueryOptions = {
        schoolId: 601,
        metricCodes: ['attendance_overall']
      };
      
      const response = await schools.metrics.timeSeries(params);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.data.series.length).toBe(2);
      expect(response.data.series[0].timePeriod).toBe('2018-2019');
      expect(response.data.series[0].attendance_overall).toBe('94.3');
      expect(response.data.metrics[0].code).toBe('attendance_overall');
    });
  });

  describe('getGeographicMetrics', () => {
    it('should fetch metrics aggregated by geographic area', async () => {
      const { schools } = require('../../src');
      
      const params: GeographicMetricsQueryOptions = {
        metricCodes: ['attendance_overall'],
        geography: {
          type: 'localAuthority' as GeographicType,
          codes: ['E09000033']
        }
      };
      
      const response = await schools.metrics.geographic(params);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.data.areas.length).toBe(1);
      expect(response.data.areas[0].geographyCode).toBe('E09000033');
      expect(response.data.areas[0].geographyName).toBe('Westminster');
      expect(response.data.areas[0].metrics[0].metricCode).toBe('attendance_overall');
      expect(response.data.areas[0].metrics[0].average).toBe(94.8);
    });
  });
});