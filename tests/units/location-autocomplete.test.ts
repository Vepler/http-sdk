import { initializeSDK, getApiInstance } from '../../src/config';
import areaReferenceAPI from '../../src/services/area-reference/service';
import { getAutocomplete } from '../../src/services/area-reference/routes/get-autocomplete';
import { Search } from '@vepler/area-reference-types';

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

    // Default mock implementation for query (using new response structure)
    mockQueryFn.mockResolvedValue({
      suggestions: [
        { id: 'loc1', text: 'London', type: 'city', type_display_name: 'City', score: 1.0, related_locations: [], entity_references: [], meta: { is_postcode: false, has_related_locations: false, query_type: 'place' } },
        { id: 'loc2', text: 'Liverpool', type: 'city', type_display_name: 'City', score: 0.9, related_locations: [], entity_references: [], meta: { is_postcode: false, has_related_locations: false, query_type: 'place' } }
      ],
      total: 2,
      query_analysis: { likely_type: 'place', deduplication: 'none' }
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
          suggestions: [{ id: 'loc1', text: 'London', type: 'city', type_display_name: 'City', score: 1.0, related_locations: [], entity_references: [], meta: { is_postcode: false, has_related_locations: false, query_type: 'place' } }],
          total: 1,
          query_analysis: { likely_type: 'place', deduplication: 'none' }
        });
      } else if (params.query === 'Manchester') {
        return Promise.resolve({
          suggestions: [{ id: 'loc2', text: 'Manchester', type: 'city', type_display_name: 'City', score: 1.0, related_locations: [], entity_references: [], meta: { is_postcode: false, has_related_locations: false, query_type: 'place' } }],
          total: 1,
          query_analysis: { likely_type: 'place', deduplication: 'none' }
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
      expect(londonResult.suggestions[0].text).toBe('London');
      expect(manchesterResult.suggestions[0].text).toBe('Manchester');
    }
  });
});
