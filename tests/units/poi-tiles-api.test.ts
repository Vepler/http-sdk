import { initializeSDK } from '../../src/config';
import poiAPI from '../../src/services/poi/service';

describe('Validate POI Tiles API', () => {
  beforeAll(() => {
    initializeSDK({
      apiKey: process.env.ADMIN_API_KEY
    });
  });

  it('Fetch POI tiles', async () => {
    const result = await poiAPI.tiles({
      tiles: '10/512/512,10/513/512',
      format: 'geojson',
      limit: 100
    });

    // Add proper validation
    expect(result).toBeDefined();
    expect(result.type).toBe('FeatureCollection');
    expect(result.success).toBe(true);
    expect(Array.isArray(result.features)).toBe(true);
    expect(result.meta).toBeDefined();
    expect(result.meta.tilesQueried).toBeGreaterThan(0);
    
    if (result) {
      console.log('POI Tiles Result:', {
        totalFeatures: result.meta.totalFeatures,
        tilesQueried: result.meta.tilesQueried,
        executionTimeMs: result.meta.executionTimeMs
      });
    }
  });

  it('Fetch POI tiles with category filter', async () => {
    const result = await poiAPI.tiles({
      tiles: '10/512/512',
      format: 'geojson',
      categories: 'cafe,restaurant',
      limit: 50,
      includeMetadata: true
    });

    expect(result).toBeDefined();
    expect(result.type).toBe('FeatureCollection');
    expect(result.success).toBe(true);
    expect(result.meta.categoryFilters).toBeDefined();
    expect(result.meta.limitPerTile).toBe(50);
  });
});