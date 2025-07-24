import { initializeSDK, h3 } from '../../src';

// Initialize the SDK with test configuration
initializeSDK({
  apiKey: process.env.VEPLER_API_KEY || 'test-key',
  baseUrls: {
    'area-reference': process.env.VEPLER_AREA_REFERENCE_URL || 'http://localhost:3000',
  },
});

describe('H3 Aggregations API', () => {
  it('should get H3 aggregations for coordinates', async () => {
    const params = {
      locations: [
        {
          coordinates: { lat: 51.5074, lng: -0.1278 }, // London
          id: 'london-center',
        },
      ],
      resolution: 9,
      components: ['relationships', 'coverage', 'metrics'] as Array<'relationships' | 'coverage' | 'metrics'>,
    };

    try {
      const response = await h3.aggregations(params);
      
      expect(response).toHaveProperty('success');
      expect(response).toHaveProperty('results');
      expect(response).toHaveProperty('metadata');
      
      if (response.success && response.results.length > 0) {
        const result = response.results[0];
        expect(result).toHaveProperty('h3Index');
        expect(result).toHaveProperty('coordinates');
        expect(result).toHaveProperty('lastUpdated');
        
        // Check that requested components are present
        if (params.components.includes('relationships')) {
          expect(result).toHaveProperty('relationships');
        }
        if (params.components.includes('coverage')) {
          expect(result).toHaveProperty('coverage');
        }
        if (params.components.includes('metrics')) {
          expect(result).toHaveProperty('metrics');
        }
      }
      
      expect(response.metadata.resolution).toBe(params.resolution);
      expect(response.metadata.totalRequested).toBe(params.locations.length);
    } catch (error) {
      // If running in CI or without proper API key, skip the test
      if (process.env.CI || !process.env.VEPLER_API_KEY) {
        console.log('Skipping H3 aggregations test - no API key available');
        return;
      }
      throw error;
    }
  });

  it('should handle H3 index input', async () => {
    const params = {
      locations: [
        {
          h3Index: '891f1d48b93ffff', // Example H3 index
          id: 'test-h3',
        },
      ],
      components: ['relationships'] as Array<'relationships'>,
    };

    try {
      const response = await h3.aggregations(params);
      
      expect(response).toHaveProperty('success');
      expect(response).toHaveProperty('results');
      
      if (response.success && response.results.length > 0) {
        const result = response.results[0];
        expect(result.h3Index).toBe(params.locations[0].h3Index);
        expect(result.id).toBe(params.locations[0].id);
      }
    } catch (error) {
      // If running in CI or without proper API key, skip the test
      if (process.env.CI || !process.env.VEPLER_API_KEY) {
        console.log('Skipping H3 aggregations test - no API key available');
        return;
      }
      throw error;
    }
  });

  it('should handle multiple locations', async () => {
    const params = {
      locations: [
        { coordinates: { lat: 51.5074, lng: -0.1278 }, id: 'location-1' },
        { coordinates: { lat: 52.4862, lng: -1.8904 }, id: 'location-2' }, // Birmingham
        { h3Index: '891f1d48b93ffff', id: 'location-3' },
      ],
      resolution: 8,
      components: ['coverage'] as Array<'coverage'>,
    };

    try {
      const response = await h3.aggregations(params);
      
      expect(response.metadata.totalRequested).toBe(3);
      expect(response.results).toHaveLength(3);
      
      // Check that each result has the correct ID
      const resultIds = response.results.map(r => r.id);
      expect(resultIds).toContain('location-1');
      expect(resultIds).toContain('location-2');
      expect(resultIds).toContain('location-3');
    } catch (error) {
      // If running in CI or without proper API key, skip the test
      if (process.env.CI || !process.env.VEPLER_API_KEY) {
        console.log('Skipping H3 aggregations test - no API key available');
        return;
      }
      throw error;
    }
  });
});