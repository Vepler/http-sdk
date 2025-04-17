import { initializeSDK } from '../../src/config';
import areaReferenceAPI from '../../src/services/area-reference/service';

describe('Validate Area Reference Within API', () => {
  beforeAll(() => {
    initializeSDK({
      apiKey: process.env.ADMIN_API_KEY
    });
  });

  it('Find areas within coordinates', async () => {
    try {
      const result = await areaReferenceAPI.within({
        lat: 51.5074,
        lng: -0.1278,
        radius: 1000,
        type: 'county',
        includeGeometry: false
      });

      console.log('API Result:', JSON.stringify(result, null, 2));
      
      expect(result).toBeDefined();
      
      // Verify response format
      if (result) {
        // New unified format with results array
        expect(result.results).toBeDefined();
        expect(Array.isArray(result.results)).toBeTruthy();
        
        if (result.results.length > 0) {
          const firstItem = result.results[0];
          expect(firstItem.id).toBeDefined();
          expect(firstItem.name).toBeDefined();
          expect(firstItem.type).toEqual('county');
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  });
});
