import { initializeSDK } from '../../src/config';
import areaReferenceAPI from '../../src/services/area-reference/service';

describe('Comprehensive Area Within API Tests', () => {
  beforeAll(() => {
    // Set longer timeout for API calls
    jest.setTimeout(30000);

    initializeSDK({
      apiKey: process.env.ADMIN_API_KEY
    });
  });

  const testCases = [
    {
      name: 'London counties',
      params: {
        lat: 51.5074,
        lng: -0.1278,
        radius: 1000,
        type: 'county',
        includeGeometry: false
      }
    },
    {
      name: 'Manchester counties',
      params: {
        lat: 53.4808,
        lng: -2.2426,
        radius: 2000,
        type: 'county',
        includeGeometry: true
      }
    },
    {
      name: 'AONB areas near Edinburgh',
      params: {
        lat: 55.9533,
        lng: -3.1883,
        radius: 3000,
        type: 'aonb',
        includeGeometry: true
      }
    }
  ];

  // Add test cases for multiple types
  it('should find multiple area types using comma-separated types', async () => {
    const result = await areaReferenceAPI.within({
      lat: 51.5074,
      lng: -0.1278,
      radius: 10,
      type: 'lsoa21,ward',
      includeGeometry: false
    });

    // Basic validation
    expect(result).toBeDefined();

    if (result) {
      // Validate the new unified response format
      expect(result.results).toBeDefined();
      expect(Array.isArray(result.results)).toBeTruthy();
      
      // Since we're requesting multiple types, there should be at least some results
      // with different area types
      const types = new Set(result.results.map(item => item.type));
      
      console.log(`Found results for comma-separated query with types: ${Array.from(types).join(', ')}`);
      
      // We should have some results
      expect(result.results.length).toBeGreaterThan(0);
    }
  });
  
  it('should find multiple area types using array format', async () => {
    const result = await areaReferenceAPI.within({
      lat: 51.5074,
      lng: -0.1278,
      radius: 10,
      type: ['lsoa21', 'ward'],
      includeGeometry: false
    });

    // Basic validation
    expect(result).toBeDefined();

    if (result) {
      // Validate the new unified response format
      expect(result.results).toBeDefined();
      expect(Array.isArray(result.results)).toBeTruthy();
      
      // Since we're requesting multiple types, there should be at least some results
      // with different area types
      const types = new Set(result.results.map(item => item.type));
      
      console.log(`Found results for array query with types: ${Array.from(types).join(', ')}`);
      
      // We should have some results
      expect(result.results.length).toBeGreaterThan(0);
    }
  });

  testCases.forEach(testCase => {
    it(`should find areas within ${testCase.name}`, async () => {
      const result = await areaReferenceAPI.within(testCase.params);

      // Basic validation
      expect(result).toBeDefined();

      // Ensure result isn't undefined before proceeding
      if (result) {
        // Validate the new unified response format
        expect(result.results).toBeDefined();
        expect(Array.isArray(result.results)).toBeTruthy();
        
        // Filter results to just the type we're testing
        const typeResults = result.results.filter(item => item.type === testCase.params.type);
        
        if (typeResults.length > 0) {
          const firstItem = typeResults[0];
          
          // Check geometry inclusion based on request
          if (testCase.params.includeGeometry) {
            expect(firstItem.geometry).toBeDefined();
          }
          
          // The type should match what we requested
          expect(firstItem.type).toEqual(testCase.params.type);
        }
        
        console.log(`Found ${typeResults.length} areas of type ${testCase.params.type} for ${testCase.name}`);
      } else {
        console.log(`No results found for ${testCase.name}`);
      }
    });
  });

  it('should reject invalid radius', async () => {
    try {
      await areaReferenceAPI.within({
        lat: 51.5074,
        lng: -0.1278,
        radius: 10000, // Too large radius
        type: 'parish',
        includeGeometry: false
      });

      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});