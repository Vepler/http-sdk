import { initializeSDK, getApiInstance } from '../../src/config';
import areaReferenceAPI from '../../src/services/area-reference/service';
import { getAutocomplete, LocationResult } from '../../src/services/area-reference/routes/get-autocomplete';

// Mock the API class
const mockQueryFn = jest.fn();
const mockApiInstance = {
  query: mockQueryFn
};

// Mock the getApiInstance function
jest.mock('../../src/config', () => {
  const originalModule = jest.requireActual('../../src/config');

  return {
    ...originalModule,
    getApiInstance: jest.fn(() => mockApiInstance),
    initialisedConfig: { apiKey: 'test-api-key' }
  };
});

describe('Area Reference Autocomplete API', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Default mock implementation for query
    mockQueryFn.mockResolvedValue({
      results: [
        { id: 'loc1', name: 'London', type: 'city' },
        { id: 'loc2', name: 'Liverpool', type: 'city' }
      ],
      success: true
    });
  });

  it('should call API with correct parameters for basic query', async () => {
    await areaReferenceAPI.locations.autocomplete({
      query: 'London'
    });

    expect(mockQueryFn).toHaveBeenCalledWith(
      '/locations/autocomplete',
      { query: 'London', types: undefined },
      { apiKey: 'test-api-key' }
    );
  });

  it('should call API with types parameter when provided', async () => {
    await areaReferenceAPI.locations.autocomplete({
      query: 'Birmingham',
      types: 'city'
    });

    expect(mockQueryFn).toHaveBeenCalledWith(
      '/locations/autocomplete',
      { query: 'Birmingham', types: 'city' },
      { apiKey: 'test-api-key' }
    );
  });

  it('should handle API errors properly', async () => {
    // Mock a failed response
    mockQueryFn.mockRejectedValueOnce(new Error('API error'));

    try {
      await areaReferenceAPI.locations.autocomplete({
        query: 'London'
      });
      fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should return different results for different queries', async () => {
    // Mock different responses for different queries
    mockQueryFn.mockImplementation((endpoint, params) => {
      if (params.query === 'London') {
        return Promise.resolve({
          results: [{ id: 'loc1', name: 'London', type: 'city' }],
          success: true
        });
      } else if (params.query === 'Manchester') {
        return Promise.resolve({
          results: [{ id: 'loc2', name: 'Manchester', type: 'city' }],
          success: true
        });
      }
    });

    const londonResult = await areaReferenceAPI.locations.autocomplete({
      query: 'London'
    });

    const manchesterResult = await areaReferenceAPI.locations.autocomplete({
      query: 'Manchester'
    });

    expect(mockQueryFn).toHaveBeenCalledTimes(2);
    expect(londonResult).toBeDefined();
    expect(manchesterResult).toBeDefined();

    if (londonResult && manchesterResult) {
      expect(londonResult.results[0].name).toBe('London');
      expect(manchesterResult.results[0].name).toBe('Manchester');
    }
  });
});
