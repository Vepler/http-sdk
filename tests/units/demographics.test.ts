import { initializeSDK, reset } from '../../src';
import demographics from '../../src/services/demographics/service';

// Mock the HTTP client
jest.mock('@vepler/http-client', () => {
  return {
    create: jest.fn().mockImplementation(() => {
      return {
        query: jest.fn().mockImplementation((endpoint) => {
          if (endpoint === '/demographics/query') {
            return Promise.resolve({
              success: true,
              result: [
                {
                  geography_code: 'E01000001',
                  geography_name: 'Test Area 1',
                  ageBands: { '0-4': 120, '5-9': 130 },
                  ethnicGroup: { 'White': 850, 'Asian': 150 }
                },
                {
                  geography_code: 'E01000002',
                  geography_name: 'Test Area 2',
                  ageBands: { '0-4': 110, '5-9': 140 },
                  ethnicGroup: { 'White': 800, 'Asian': 200 }
                }
              ]
            });
          }
          return Promise.reject(new Error('Endpoint not mocked'));
        })
      };
    })
  };
});

describe('Validate Demographics API', () => {
  beforeEach(() => {
    reset();
    initializeSDK({
      apiKey: 'test-api-key'
    });
  });

  afterEach(() => {
    reset();
  });

  it('should fetch demographics data with new camelCase parameters', async () => {
    const result = await demographics.query({
      geographyCodes: 'E01000001,E01000002',
      topics: 'ageBands,ethnicGroup',
      includeMetadata: true
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.result).toHaveLength(2);
  });

  it('should work with optional parameters', async () => {
    const result = await demographics.query({
      geographyCodes: 'E01000001',
      format: 'array',
      censusPeriod: '58d24906-7162-45ee-9ae6-8092682c61c7',
      hierarchyLevel: 2
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });
});
