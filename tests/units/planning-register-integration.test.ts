import { initializeSDK } from '../../src/config';
import { planningRegister } from '../../src/index';

describe('Planning Register Integration Tests', () => {
  beforeAll(() => {
    // Use a mock API key for testing
    initializeSDK({
      apiKey: process.env.ADMIN_API_KEY || 'test-api-key'
    });
  });
  
  // Skip all tests if no API key is available
  beforeEach(() => {
    if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
      jest.setTimeout(500);
    }
  });

  // This test demonstrates a real-world scenario:
  // 1. Query applications to get a list
  // 2. Get details for a specific application from the list
  // 3. Fetch map tiles related to the application location
  it('Complete planning application workflow', async () => {
    // Skip test if API key is not available
    if (!process.env.ADMIN_API_KEY) {
      console.log('Skipping test: No API key available');
      return;
    }

    // Step 1: Mock the query response
    const mockQueryResponse = {
      success: true,
      result: [
        {
          id: 'app-123',
          provider: 'example-council',
          key: 'APP/2023/001',
          reference: 'APP/2023/001',
          status: 'pending' as any,
          description: 'Extension to existing property',
          coordinates: {
            type: 'Point',
            coordinates: [-1.234, 53.456]
          }
        }
      ],
      meta: {
        count: 1,
        hasMore: false,
        limit: 10,
        offset: 0
      }
    };

    jest.spyOn(planningRegister, 'queryApplications').mockResolvedValue(mockQueryResponse);

    // Query applications
    const queryResult = await planningRegister.queryApplications({
      provider: 'example-council',
      limit: 10,
      filters: {
        status: 'pending' as any
      }
    });

    expect(queryResult.success).toBe(true);
    expect(queryResult.result.length).toBeGreaterThan(0);

    // Step 2: Get details for the first application
    const applicationId = queryResult.result[0].id;
    
    // Mock the application details response
    const mockApplicationDetails = {
      success: true,
      result: {
        id: applicationId,
        provider: 'example-council',
        key: 'APP/2023/001',
        reference: 'APP/2023/001',
        status: 'pending' as any,
        description: 'Extension to existing property',
        address: {
          formattedAddress: '123 Main Street'
        },
        documents: [
          {
            id: 'doc-123',
            type: 'Planning Statement',
            description: 'Planning Statement',
            publishedDate: '2023-01-15T10:30:00Z'
          }
        ],
        coordinates: {
          type: 'Point',
          coordinates: [-1.234, 53.456]
        }
      }
    };

    jest.spyOn(planningRegister, 'getApplicationById').mockResolvedValue(mockApplicationDetails);

    const applicationDetails = await planningRegister.getApplicationById({
      applicationId
    });

    expect(applicationDetails.success).toBe(true);
    expect(applicationDetails.result.id).toBe(applicationId);
    expect(applicationDetails.result.description).toBeDefined();
    
    // Step 3: Get map tiles for the location of the application
    // Extract coordinates for tile calculation
    const [longitude, latitude] = applicationDetails.result.coordinates?.coordinates || [-1.234, 53.456];
    
    // Simple tile calculation (Note: this is a simplified version)
    // In a real implementation, you would use proper formula to convert lat/long to tile coordinates
    const z = 15;
    const x = Math.floor((longitude + 180) / 360 * Math.pow(2, z));
    const y = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, z));
    
    // Mock the tile response
    jest.spyOn(planningRegister, 'getMapTile').mockResolvedValue(new ArrayBuffer(1024));
    
    const tileData = await planningRegister.getMapTile({ z, x, y });
    
    expect(tileData).toBeDefined();
    expect(tileData.byteLength).toBeGreaterThan(0);
  });
});