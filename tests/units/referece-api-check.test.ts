import { initializeSDK, areaReference, reset } from '../../src';

// Mock the API service
jest.mock('@vepler/http-client', () => {
  return {
    create: jest.fn().mockImplementation(() => {
      return {
        query: jest.fn().mockImplementation((endpoint, params) => {
          if (endpoint === '/within') {
            return Promise.resolve({
              results: [
                {
                  code: 'E01000001',
                  name: 'Test Area',
                  type: 'lsoa21'
                }
              ],
              count: 1
            });
          }
          return Promise.resolve({ results: [], count: 0 });
        })
      };
    })
  };
});

describe('validateAPIAccess', () => {
  beforeEach(() => {
    initializeSDK({
      apiKey: 'test-api-key'
    });
  });

  afterEach(() => {
    reset();
    jest.clearAllMocks();
  });

  it('Area Reference Result', async () => {
    const test = await areaReference.within({
        lat: 51.5074,
        lng: -0.1278,
        radius: 1000,
        type: 'lsoa21'
      });
    
    expect(test).toBeDefined();
    expect(test.results).toHaveLength(1);
    expect(test.count).toBe(1);
    expect(test.results[0].code).toBe('E01000001');
  });
});
