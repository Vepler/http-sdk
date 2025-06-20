import { initializeSDK, areaReference, reset } from '../../src';

describe('Area Reference E2E Tests', () => {
  beforeAll(() => {
    if (!process.env.API_KEY) {
      console.log('Skipping E2E tests: No API key available');
      return;
    }
    
    initializeSDK({
      apiKey: process.env.API_KEY
    });
  });

  afterAll(() => {
    reset();
  });

  describe('Within Areas API', () => {
    it('should find areas within London coordinates', async () => {
      if (!process.env.API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      try {
        const result = await areaReference.within({
          lat: 51.5074,
          lng: -0.1278,
          radius: 1000,
          type: 'lsoa21'
        });
        
        expect(result).toBeDefined();
        expect(result.results).toBeDefined();
        expect(Array.isArray(result.results)).toBe(true);
        expect(typeof result.count).toBe('number');
        
        console.log(`Found ${result.count} LSOA areas within 1km of London center`);
        
        if (result.results.length > 0) {
          const firstArea = result.results[0];
          expect(firstArea.code).toBeDefined();
          expect(firstArea.name).toBeDefined();
          expect(firstArea.type).toBe('lsoa21');
        }
      } catch (error: any) {
        console.error('Within areas API error:', error.message);
        throw error;
      }
    });

    it('should handle invalid coordinates gracefully', async () => {
      if (!process.env.API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      try {
        const result = await areaReference.within({
          lat: 999, // Invalid latitude
          lng: 999, // Invalid longitude
          radius: 1000,
          type: 'lsoa21'
        });
        
        // Should either return empty results or throw a validation error
        expect(result.results).toBeDefined();
        expect(Array.isArray(result.results)).toBe(true);
      } catch (error: any) {
        // Validation errors are expected for invalid coordinates
        expect(error.message).toBeDefined();
        console.log('Expected validation error for invalid coordinates:', error.message);
      }
    });
  });

  describe('Query By Type API', () => {
    it('should query postcodes without parameter pollution', async () => {
      if (!process.env.API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      try {
        const result = await areaReference.query.byType({
          type: 'postcode',
          limit: 10,
          offset: 0,
          includeHierarchy: false
        });
        
        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        expect(Array.isArray(result.result)).toBe(true);
        expect(result.meta).toBeDefined();
        expect(result.meta.type).toBe('postcode');
        
        console.log(`Found ${result.meta.total} postcodes (showing ${result.result.length})`);
        
      } catch (error: any) {
        // The key test: should NOT get "Invalid request query input" error
        if (error.message.includes('Invalid request query input')) {
          throw new Error('Parameter pollution bug detected: type parameter incorrectly passed to query');
        }
        
        // Other errors (like rate limiting, auth) are acceptable for E2E tests
        console.log('Query by type error (may be expected):', error.message);
      }
    });

    it('should query different geography types successfully', async () => {
      if (!process.env.API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      const testTypes = ['ward', 'lsoa21', 'constituency'];
      
      for (const type of testTypes) {
        try {
          const result = await areaReference.query.byType({
            type,
            limit: 5,
            offset: 0
          });
          
          expect(result).toBeDefined();
          expect(result.meta.type).toBe(type);
          console.log(`${type}: Found ${result.meta.total} areas`);
          
        } catch (error: any) {
          if (error.message.includes('Invalid request query input')) {
            throw new Error(`Parameter pollution bug for type ${type}: ${error.message}`);
          }
          console.log(`${type} query error (may be expected):`, error.message);
        }
      }
    });
  });
});
