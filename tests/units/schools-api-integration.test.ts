import { initializeSDK, reset, schools } from '../../src';

/**
 * IMPORTANT: These tests require a valid API key to be set in process.env.TEST_API_KEY
 * They perform real API requests against the Schools API endpoints.
 * 
 * Run with: TEST_API_KEY=your_api_key npx jest tests/units/schools-api-integration.test.ts
 */

// Skip all tests if no API key is provided
const testApiKey = process.env.TEST_API_KEY;
const describeIfApiKey = testApiKey ? describe : describe.skip;

describeIfApiKey('Schools API Integration Tests', () => {
  beforeAll(() => {
    initializeSDK({
      apiKey: testApiKey as string
    });
  });

  afterAll(() => {
    reset();
  });

  describe('Query Schools', () => {
    it('should query schools using name filter', async () => {
      const response = await schools.getSchools({
        name: 'St',
        limit: 5,
        page: 1
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result.length).toBeGreaterThan(0);
      expect(response.pagination).toBeDefined();
    });

    it('should get schools using an area filter (point)', async () => {
      const response = await schools.getSchools({
        area: [
          {
            type: 'point',
            radius: 5000,
            coordinates: [-0.1278, 51.5074] // London center
          }
        ],
        limit: 10
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result.length).toBeGreaterThan(0);
      
      // Verify returned schools have the expected structure
      const school = response.result[0];
      expect(school.id).toBeDefined();
      expect(school.name).toBeDefined();
      expect(school.type).toBeDefined();
      expect(school.location).toBeDefined();
      expect(school.coordinates).toBeDefined();
    });

    it('should query schools with specific field selection', async () => {
      const response = await schools.getSchools({
        fields: 'id,name,type,status',
        limit: 5
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result.length).toBeGreaterThan(0);
      
      // Check that only the requested fields are returned
      const school = response.result[0];
      expect(school.id).toBeDefined();
      expect(school.name).toBeDefined();
      expect(school.type).toBeDefined();
      expect(school.status).toBeDefined();
      // These should be undefined since they weren't requested
      expect(school.location).toBeUndefined();
      expect(school.coordinates).toBeUndefined();
    });
  });

  describe('Get School by ID', () => {
    it('should fetch details of a specific school (ID: 601)', async () => {
      const response = await schools.getSchoolById({
        id: 601
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result).toBeDefined();
      expect(response.result.id).toBe(601);
      expect(response.result.name).toBeDefined();
      expect(response.result.type).toBeDefined();
      expect(response.result.location).toBeDefined();
      expect(response.result.coordinates).toBeDefined();
    });
  });

  describe('Search Schools', () => {
    it('should search for schools matching a query term', async () => {
      const response = await schools.search({
        query: 'St Mary',
        limit: 10,
        status: 'open'
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result.length).toBeGreaterThan(0);
      
      // Verify search results have score and brief info
      const result = response.result[0];
      expect(result.id).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.score).toBeDefined();
      expect(result.status).toBe('open');
    });
  });

  describe('Autocomplete Schools', () => {
    it('should provide autocomplete suggestions for school names', async () => {
      const response = await schools.autocomplete({
        prefix: 'St',
        limit: 5
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result.length).toBeGreaterThan(0);
      
      // Verify autocomplete results format
      const result = response.result[0];
      expect(result.id).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.name.toLowerCase()).toContain('st');
    });
  });

  describe('Get Metrics', () => {
    it('should fetch metrics for a specific school', async () => {
      const response = await schools.metrics.get({
        schools: [601],
        metric: ['attendance_overall'],
        year: '2022-2023'
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result.length).toBe(1);
      
      const schoolMetrics = response.result[0];
      expect(schoolMetrics.school.id).toBe(601);
      expect(schoolMetrics.metrics).toBeDefined();
      expect(schoolMetrics.metrics.length).toBeGreaterThan(0);
    });

    it('should fetch multiple metrics for multiple schools', async () => {
      const response = await schools.metrics.get({
        schools: [601, 602],
        metric: ['attendance_overall', 'attainment_reading'],
        year: '2022-2023'
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result.length).toBe(2);
      
      // Verify the first school has the expected metrics
      const firstSchool = response.result[0];
      expect(firstSchool.school.id).toBeDefined();
      expect(firstSchool.metrics.length).toBeGreaterThan(0);
    });
  });

  describe('Get Time Series Metrics', () => {
    it('should fetch time series metrics data', async () => {
      const response = await schools.metrics.timeSeries({
        schools: [601],
        metric: ['attendance_overall'],
        from: '2018-2019',
        to: '2022-2023'
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result.length).toBe(1);
      
      const schoolTimeSeries = response.result[0];
      expect(schoolTimeSeries.school.id).toBe(601);
      expect(schoolTimeSeries.metrics).toBeDefined();
      expect(schoolTimeSeries.metrics.length).toBeGreaterThan(0);
      
      // Verify time series data structure
      const metricData = schoolTimeSeries.metrics[0];
      expect(metricData.id).toBeDefined();
      expect(metricData.series).toBeDefined();
      expect(metricData.series.length).toBeGreaterThan(0);
      
      // Verify individual time points
      const timePoint = metricData.series[0];
      expect(timePoint.year).toBeDefined();
      expect(timePoint.value).toBeDefined();
    });
  });

  describe('Get Geographic Metrics', () => {
    it('should fetch metrics aggregated by geographic areas', async () => {
      const response = await schools.metrics.geographic({
        metric: ['attendance_overall'],
        year: '2022-2023',
        areas: [
          {
            type: 'entity',
            entityType: 'local_authority_district',
            ids: ['E09000033'] // Westminster
          }
        ]
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result.length).toBe(1);
      
      const areaMetrics = response.result[0];
      expect(areaMetrics.area.id).toBe('E09000033');
      expect(areaMetrics.area.name).toBe('Westminster');
      expect(areaMetrics.metrics).toBeDefined();
      expect(areaMetrics.metrics.length).toBeGreaterThan(0);
    });

    it('should fetch metrics for multiple geographic areas', async () => {
      const response = await schools.metrics.geographic({
        metric: ['attendance_overall'],
        year: '2022-2023',
        areas: [
          {
            type: 'entity',
            entityType: 'local_authority_district',
            ids: ['E09000033', 'E09000001'] // Westminster and City of London
          }
        ]
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.result.length).toBe(2);
    });
  });
});