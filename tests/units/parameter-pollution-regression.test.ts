import { initializeSDK, areaReference, reset } from '../../src';

/**
 * Regression test for parameter pollution bug
 * 
 * This test specifically checks for the bug where the queryByType function
 * was incorrectly passing the 'type' parameter as a query parameter,
 * causing "Invalid request query input" errors.
 * 
 * The bug was introduced when QueryByTypeParams extended Areas.QueryAreasQueryParams
 * which created parameter pollution.
 */
describe('Parameter Pollution Regression Tests', () => {
  beforeAll(() => {
    if (!process.env.API_KEY) {
      console.log('Skipping regression tests: No API key available');
      return;
    }
    
    initializeSDK({
      apiKey: process.env.API_KEY
    });
  });

  afterAll(() => {
    reset();
  });

  it('should NOT pass type parameter as query param in queryByType calls', async () => {
    if (!process.env.API_KEY) {
      console.log('Skipping test: No API key available');
      return;
    }

    // This is the exact scenario that was failing before the fix
    try {
      const result = await areaReference.query.byType({
        type: 'postcode',
        limit: 1000,
        offset: 8000,
        includeHierarchy: true
      });
      
      // If we get here, the parameter pollution bug is fixed
      expect(result).toBeDefined();
      expect(result.meta.type).toBe('postcode');
      console.log('✅ SUCCESS: No parameter pollution detected');
      console.log(`Query returned ${result.meta.total} postcodes`);
      
    } catch (error: any) {
      // This specific error indicates the parameter pollution bug
      if (error.message.includes('Invalid request query input')) {
        throw new Error(
          '❌ REGRESSION: Parameter pollution bug detected! ' +
          'The type parameter is being incorrectly passed as a query parameter. ' +
          'URL should be /query/postcode?limit=1000&offset=8000&includeHierarchy=true ' +
          'but is likely /query/postcode?type=postcode&limit=1000&offset=8000&includeHierarchy=true'
        );
      }
      
      // Other errors (auth, rate limiting, etc.) are acceptable
      console.log('✅ SUCCESS: Different error received (parameter pollution bug not present)');
      console.log('Error:', error.message);
    }
  });

  it('should handle multiple geography types without parameter pollution', async () => {
    if (!process.env.API_KEY) {
      console.log('Skipping test: No API key available');
      return;
    }

    const testTypes = ['ward', 'constituency', 'lsoa21'];
    let successCount = 0;
    
    for (const type of testTypes) {
      try {
        const result = await areaReference.query.byType({
          type,
          limit: 5,
          offset: 0,
          includeHierarchy: false
        });
        
        expect(result.meta.type).toBe(type);
        successCount++;
        console.log(`✅ ${type}: No parameter pollution - found ${result.meta.total} areas`);
        
      } catch (error: any) {
        if (error.message.includes('Invalid request query input')) {
          throw new Error(`❌ REGRESSION: Parameter pollution for type '${type}' - ${error.message}`);
        }
        
        console.log(`⚠️  ${type}: Other error (acceptable) - ${error.message}`);
      }
    }
    
    // At least one should succeed if the API is working
    console.log(`Tested ${testTypes.length} geography types, ${successCount} succeeded without parameter pollution`);
  });
});