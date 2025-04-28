import { initializeSDK, reset, schools } from '../../src';
import { SchoolsQueryParams } from '@vepler/schools-types/api/endpoints/schools';
import { SchoolByIdQueryParams } from '@vepler/schools-types/api/endpoints/schools-by-id';
import { SchoolSearchQueryParams } from '@vepler/schools-types/api/endpoints/search';
import { SchoolAutocompleteQueryParams } from '@vepler/schools-types/api/endpoints/search';
import { MetricsTimeSeriesQueryOptions } from '@vepler/schools-types/api/endpoints/metrics-timeseries';
import {
  GeographicMetricsQueryOptions,
} from '@vepler/schools-types/api/endpoints/metrics-geographic';

// Use proper types directly from @vepler/schools-types

// Mock the API service for testing without real API calls
jest.mock('@vepler/http-client', () => {
  return {
    create: jest.fn().mockImplementation(() => {
      return {
        query: jest.fn().mockImplementation((endpoint, params) => {
          // Mock responses for different endpoints
          if (endpoint === '/') {
            return Promise.resolve({
              success: true,
              result: [
                {
                  id: 601,
                  URN: 100601,
                  name: 'Test Primary School',
                  slug: 'test-primary-school',
                  type: 'primary',
                  subType: 'academy',
                  status: 'open',
                  location: {
                    address: '123 School Street, London',
                    postcode: 'SW1A 1AA',
                    authority: 'Westminster'
                  },
                  coordinates: [-0.118092, 51.509865],
                  details: {
                    ageRange: {
                      from: 4,
                      to: 11
                    },
                    gender: 'Mixed',
                    religion: 'None',
                    hasNursery: true
                  },
                  currentRating: 'good',
                  overlays: [
                    {
                      type: 'lsoa',
                      id: 'E01000123'
                    }
                  ]
                }
              ],
              pagination: {
                total: 1,
                pages: 1,
                currentPage: 1,
                pageSize: 10
              }
            });
          } else if (endpoint === '/601') {
            return Promise.resolve({
              success: true,
              result: {
                id: 601,
                URN: 100601,
                name: 'Test Primary School',
                slug: 'test-primary-school',
                type: 'primary',
                subType: 'academy',
                status: 'open',
                location: {
                  address: '123 School Street, London',
                  postcode: 'SW1A 1AA',
                  authority: 'Westminster'
                },
                coordinates: [-0.118092, 51.509865],
                details: {
                  ageRange: {
                    min: 4,
                    max: 11
                  },
                  gender: 'Mixed',
                  religion: 'None',
                  hasNursery: true
                },
                currentRating: 'good',
                ofstedRatings: [
                  {
                    date: '2022-05-15',
                    rating: 'good',
                    report: {
                      url: 'https://example.com/report.pdf',
                      summary: 'The school provides a good standard of education...',
                      judgements: {
                        overall: 'good',
                        leadership: 'outstanding',
                        teaching: 'good'
                      }
                    }
                  }
                ],
                overlays: [
                  {
                    type: 'lsoa',
                    id: 'E01000123'
                  }
                ]
              }
            });
          } else if (endpoint === '/search/schools') {
            return Promise.resolve({
              success: true,
              result: [
                {
                  id: 601,
                  URN: 100601,
                  name: 'Test Primary School',
                  slug: 'test-primary-school',
                  type: 'primary',
                  status: 'open',
                  location: {
                    address: '123 School Street, London',
                    postcode: 'SW1A 1AA'
                  },
                  coordinates: [-0.118092, 51.509865],
                  score: 0.92
                }
              ]
            });
          } else if (endpoint === '/search/schools/autocomplete') {
            return Promise.resolve({
              success: true,
              result: [
                {
                  id: 601,
                  URN: 100601,
                  name: 'Test Primary School',
                  slug: 'test-primary-school',
                  type: 'primary',
                  status: 'open'
                }
              ]
            });
          } else if (endpoint === '/metrics') {
            return Promise.resolve({
              success: true,
              result: [
                {
                  school: {
                    id: 601,
                    URN: 100601,
                    name: 'Test Primary School'
                  },
                  metrics: [
                    {
                      id: 'attendance_overall',
                      name: 'Overall Attendance',
                      value: 95.6,
                      academicYears: ['2022-2023'],
                      national: 94.2,
                      category: 'attendance'
                    }
                  ]
                }
              ]
            });
          } else if (endpoint === '/metrics/timeseries') {
            return Promise.resolve({
              success: true,
              result: [
                {
                  school: {
                    id: 601,
                    URN: 100601,
                    name: 'Test Primary School'
                  },
                  metrics: [
                    {
                      id: 'attendance_overall',
                      name: 'Overall Attendance',
                      series: [
                        {
                          year: '2018-2019',
                          value: 94.3,
                          national: 93.8
                        },
                        {
                          year: '2019-2020',
                          value: 91.2,
                          national: 90.5
                        },
                        {
                          year: '2020-2021',
                          value: 93.1,
                          national: 92.7
                        }
                      ]
                    }
                  ]
                }
              ]
            });
          }
          return Promise.resolve({ success: false });
        }),
        post: jest.fn().mockImplementation((endpoint, body) => {
          if (endpoint === '/') {
            return Promise.resolve({
              success: true,
              result: [
                {
                  id: 601,
                  URN: 100601,
                  name: 'Test Primary School',
                  slug: 'test-primary-school',
                  type: 'primary',
                  subType: 'academy',
                  status: 'open',
                  location: {
                    address: '123 School Street, London',
                    postcode: 'SW1A 1AA',
                    authority: 'Westminster'
                  },
                  coordinates: [-0.118092, 51.509865],
                  details: {
                    ageRange: {
                      from: 4,
                      to: 11
                    },
                    gender: 'Mixed',
                    religion: 'None',
                    hasNursery: true
                  },
                  currentRating: 'good',
                  overlays: [
                    {
                      type: 'lsoa',
                      id: 'E01000123'
                    }
                  ]
                }
              ],
              pagination: {
                total: 1,
                pages: 1,
                currentPage: 1,
                pageSize: 10
              }
            });
          } else if (endpoint === '/metrics/geographic') {
            return Promise.resolve({
              success: true,
              result: [
                {
                  area: {
                    id: 'E09000033',
                    name: 'Westminster',
                    type: 'local_authority_district'
                  },
                  metrics: [
                    {
                      id: 'attendance_overall',
                      name: 'Overall Attendance',
                      value: 94.8,
                      academicYears: ['2022-2023'],
                      national: 94.2,
                      count: 85
                    },
                    {
                      id: 'attainment_reading',
                      name: 'Reading Attainment',
                      value: 73.2,
                      academicYears: ['2022-2023'],
                      national: 70.5,
                      count: 85
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

describe('Schools API', () => {
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

  describe('Query Schools', () => {
    it('should get a list of schools with various filters', async () => {
      const params: SchoolsQueryParams = {
        name: 'Test',
        page: 1,
        limit: 10,
        sort: '-name',
        filter: 'type=primary,status=open',
        area: [
          {
            type: 'entity',
            entityType: 'local_authority_district',
            ids: ['E09000033']
          }
        ]
      };

      const response = await schools.getSchools(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);

      // Using type assertion to handle array access
      const firstResult = (response?.result as any)?.[0];
      expect(firstResult?.id).toBe(601);
      expect(firstResult?.name).toBe('Test Primary School');
      expect(firstResult?.type).toBe('primary');
      expect(firstResult?.status).toBe('open');
      expect(firstResult?.location.authority).toBe('Westminster');
      expect(firstResult?.coordinates).toHaveLength(2);
      // Using type assertion for the school details
      const details = firstResult?.details as any;
      expect(details.ageRange.from).toBe(4);
      expect(details.ageRange.to).toBe(11);
      expect(firstResult?.currentRating).toBe('good');
    });

    it('should handle bounding box area filter', async () => {
      const params: SchoolsQueryParams = {
        area: [
          {
            type: 'bbox',
            coordinates: [-0.2, 51.4, 0.1, 51.6]
          }
        ],
        limit: 10
      };

      const response = await schools.getSchools(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);
    });

    it('should handle polygon area filter', async () => {
      const params: SchoolsQueryParams = {
        area: [
          {
            type: 'polygon',
            coordinates: [
              [-0.12, 51.50],
              [-0.13, 51.52],
              [-0.10, 51.52],
              [-0.09, 51.51],
              [-0.12, 51.50]
            ]
          }
        ],
        limit: 10
      };

      const response = await schools.getSchools(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);
    });

    it('should handle point radius area filter', async () => {
      const params: SchoolsQueryParams = {
        area: [
          {
            type: 'point',
            radius: 1000,
            coordinates: [-0.1278, 51.5074]
          }
        ],
        limit: 10
      };

      const response = await schools.getSchools(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);
    });
  });

  describe('Get School by ID', () => {
    it('should fetch a single school by ID', async () => {
      const params: SchoolByIdQueryParams & { id: number } = {
        id: 601
      };

      const response = await schools.getSchoolById(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toBeDefined();

      const school = response?.result;
      expect(school?.id).toBe(601);
      expect(school?.URN).toBe(100601);
      expect(school?.name).toBe('Test Primary School');
      expect(school?.type).toBe('primary');
      expect(school?.status).toBe('open');
      expect(school?.location.address).toBe('123 School Street, London');
      expect(school?.coordinates).toEqual([-0.118092, 51.509865]);
      expect(school?.ofstedRatings).toHaveLength(1);
      expect(school?.ofstedRatings?.[0]?.date).toBe('2022-05-15');
      expect(school?.ofstedRatings?.[0]?.rating).toBe('good');
      expect(school?.ofstedRatings?.[0]?.report?.judgements?.leadership).toBe('outstanding');
    });

    it('should throw an error if id is not provided', async () => {
      const params: any = {};

      await expect(schools.getSchoolById(params)).rejects.toThrow(
        'The "id" parameter must be provided'
      );
    });
  });

  describe('Search Schools', () => {
    it('should search for schools by name with high relevancy', async () => {
      const params: SchoolSearchQueryParams = {
        query: 'Test Primary',
        limit: 20,
        status: 'open',
        type: 'primary'
      };

      const response = await schools.search(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);

      // Using type assertion to handle array access
      const firstResult = (response?.result as any)?.[0];
      expect(firstResult?.id).toBe(601);
      expect(firstResult?.name).toBe('Test Primary School');
      expect(firstResult?.score).toBe(0.92);
      expect(firstResult?.type).toBe('primary');
      expect(firstResult?.status).toBe('open');
    });

    it('should throw an error if query is not provided', async () => {
      const params: any = {
        limit: 20
      };

      await expect(schools.search(params)).rejects.toThrow(
        'The "query" parameter must be provided'
      );
    });
  });

  describe('Autocomplete Schools', () => {
    it('should get autocomplete suggestions for school names', async () => {
      const params: SchoolAutocompleteQueryParams = {
        prefix: 'Test',
        limit: 10,
        status: 'open'
      };

      const response = await schools.autocomplete(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);

      // Using type assertion to handle array access
      const firstResult = (response?.result as any)?.[0];
      expect(firstResult?.id).toBe(601);
      expect(firstResult?.name).toBe('Test Primary School');
      expect(firstResult?.type).toBe('primary');
      expect(firstResult?.status).toBe('open');
    });

    it('should throw an error if prefix is not provided', async () => {
      const params: any = {
        limit: 10
      };

      await expect(schools.autocomplete(params)).rejects.toThrow(
        'The "prefix" parameter must be provided'
      );
    });
  });

  describe('Get Metrics', () => {
    it('should retrieve metrics for a specific school', async () => {
      const params: any = {
        schoolIds: [601],
        metricCodes: ['attendance_overall'],
        academicYears: ['2022-2023']
      };

      const response = await schools.metrics.get(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);

      // Using type assertion to handle array access
      const firstResult = (response?.result as any)?.[0];
      expect(firstResult?.school.id).toBe(601);
      expect(firstResult?.school.name).toBe('Test Primary School');
      expect(firstResult?.metrics).toHaveLength(1);
      expect(firstResult?.metrics[0].id).toBe('attendance_overall');
      expect(firstResult?.metrics[0].value).toBe(95.6);
      expect(firstResult?.metrics[0].academicYears[0]).toBe('2022-2023');
      expect(firstResult?.metrics[0].national).toBe(94.2);
    });

    it('should throw an error if schools parameter is not provided', async () => {
      const params: any = {
        metricCodes: ['attendance_overall']
      };

      await expect(schools.metrics.get(params)).rejects.toThrow(
        'The "schoolIds" parameter must be provided'
      );
    });

    it('should throw an error if metric parameter is not provided', async () => {
      const params: any = {
        schoolIds: [601]
      };

      await expect(schools.metrics.get(params)).rejects.toThrow(
        'Either "metricCodes" or "profile" parameter must be provided'
      );
    });

    it('should handle string school ID parameter', async () => {
      const params: any = {
        schoolIds: '601',
        metricCodes: 'attendance_overall',
        academicYears: ['2022-2023']
      };

      const response = await schools.metrics.get(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);
    });
  });

  describe('Get Time Series Metrics', () => {
    it('should retrieve metrics data in time series format', async () => {
      const params: MetricsTimeSeriesQueryOptions = {
        schoolId: 601,
        metricCodes: ['attendance_overall'],
        academicYears: ['2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023']
      };

      const response = await schools.metrics.timeSeries(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);

      // Using type assertion to handle array access
      const firstResult = (response?.result as any)?.[0];
      expect(firstResult?.school.id).toBe(601);
      expect(firstResult?.school.name).toBe('Test Primary School');
      expect(firstResult?.metrics).toHaveLength(1);
      expect(firstResult?.metrics[0].id).toBe('attendance_overall');
      expect(firstResult?.metrics[0].series).toHaveLength(3);
      expect(firstResult?.metrics[0].series[0].year).toBe('2018-2019');
      expect(firstResult?.metrics[0].series[0].value).toBe(94.3);
      expect(firstResult?.metrics[0].series[1].year).toBe('2019-2020');
      expect(firstResult?.metrics[0].series[2].year).toBe('2020-2021');
    });

    it('should throw an error if schoolId parameter is not provided', async () => {
      const params: any = {
        metricCodes: ['attendance_overall']
      };

      await expect(schools.metrics.timeSeries(params)).rejects.toThrow(
        'The "schoolId" parameter must be provided'
      );
    });

    it('should throw an error if metricCodes parameter is not provided', async () => {
      const params: any = {
        schoolId: 601
      };

      await expect(schools.metrics.timeSeries(params)).rejects.toThrow(
        'Either "metricCodes" or "profile" parameter must be provided'
      );
    });
  });

  describe('Get Geographic Metrics', () => {
    it('should retrieve metrics aggregated by geographic areas', async () => {
      const params: GeographicMetricsQueryOptions = {
        metricCodes: ['attendance_overall', 'attainment_reading'],
        academicYearId: 'GB_2022-2023',
        geography: {
          type: 'lsoa',
          codes: ['E09000033']
        }
      };

      const response = await schools.metrics.geographic(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);

      // Using type assertion to handle array access
      const firstResult = (response?.result as any)?.[0];
      expect(firstResult?.area.id).toBe('E09000033');
      expect(firstResult?.area.name).toBe('Westminster');
      expect(firstResult?.area.type).toBe('local_authority_district');
      expect(firstResult?.metrics).toHaveLength(2);
      expect(firstResult?.metrics[0].id).toBe('attendance_overall');
      expect(firstResult?.metrics[0].value).toBe(94.8);
      expect(firstResult?.metrics[0].count).toBe(85);
      expect(firstResult?.metrics[1].id).toBe('attainment_reading');
    });

    it('should throw an error if metricCodes parameter is not provided', async () => {
      const params: any = {
        geography: {
          type: 'lsoa',
          codes: ['E09000033']
        }
      };

      await expect(schools.metrics.geographic(params)).rejects.toThrow(
        'Either "metricCodes" or "profile" parameter must be provided'
      );
    });

    it('should throw an error if geography parameter is not provided', async () => {
      const params: any = {
        metricCodes: ['attendance_overall']
      };

      await expect(schools.metrics.geographic(params)).rejects.toThrow(
        'The "geography" parameter must be provided'
      );
    });

    it('should handle different parameters and options', async () => {
      const params: GeographicMetricsQueryOptions = {
        metricCodes: ['attendance_overall', 'attainment_reading'],
        academicYearId: 'GB_2022-2023',
        geography: {
          type: 'lsoa',
          codes: ['E09000033']
        },
        profile: 'ks2',
        hierarchicalResults: true,
        includeMetadata: true
      };

      const response = await schools.metrics.geographic(params);

      expect(response).toBeDefined();
      expect(response?.success).toBe(true);
      expect(response?.result).toHaveLength(1);
    });
  });
});
