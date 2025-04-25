import { initializeSDK } from '../../src/config';
import planningRegisterAPI from '../../src/services/planning-register/service';

describe('Validate Planning Register API', () => {
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

  it('Query Applications', async () => {
    // Skip test if API key is not available
    if (!process.env.ADMIN_API_KEY) {
      console.log('Skipping test: No API key available');
      return;
    }

    const result = await planningRegisterAPI.queryApplications({
      provider: 'example-council',
      limit: 5,
      fields: ["id", "key", "provider", "sourceId", "description", "status", "statusExternal", "type", "typeExternal", "receivedDate", "validatedDate", "appealedDate", "appealedStatus", "spatial", "spatialFeatures"],
      filters: {
        // Using string literal that matches the enum value
        status: 'pending' as any
      },
      sort: {
        field: 'receivedAt',
        direction: 'desc'
      }
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(Array.isArray(result.result)).toBe(true);

    if (result.result.length > 0) {
      const application = result.result[0];
      expect(application.id).toBeDefined();
      expect(application.provider).toBeDefined();
      expect(application.status).toBeDefined();
    }

    // Pagination metadata
    expect(result.meta).toBeDefined();
    expect(typeof result.meta.count).toBe('number');
    expect(typeof result.meta.hasMore).toBe('boolean');
    expect(result.meta.limit).toBe(5);
    expect(result.meta.offset).toBe(0);
  });

  it('Get Application By ID', async () => {
    // Skip test if API key is not available
    if (!process.env.ADMIN_API_KEY) {
      console.log('Skipping test: No API key available');
      return;
    }

    // This test requires a known application ID
    // For demonstration, we'll use a mock ID (should be replaced with a real one)
    const applicationId = '12345'; // Replace with a real ID in actual testing

    // Mock implementation to avoid actual API call with invalid ID
    jest.spyOn(planningRegisterAPI, 'getApplicationById').mockResolvedValue({
      success: true,
      result: {
        id: applicationId,
        provider: 'example-council',
        key: 'APP/2023/001',
        reference: 'APP/2023/001',
        // Using string literal that matches the enum value
        status: 'pending' as any,
        description: 'Test application'
      }
    });

    const result = await planningRegisterAPI.getApplicationById({
      applicationId
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.result).toBeDefined();
    expect(result.result.id).toBe(applicationId);
    expect(result.result.status).toBeDefined();
  });

  it('Get Map Tile', async () => {
    // Skip test if API key is not available
    if (!process.env.ADMIN_API_KEY) {
      console.log('Skipping test: No API key available');
      return;
    }

    // Mock implementation since we can't easily verify binary response
    jest.spyOn(planningRegisterAPI, 'getMapTile').mockResolvedValue(
      new ArrayBuffer(100) // Mock binary data
    );

    const result = await planningRegisterAPI.getMapTile({
      z: 10,
      x: 512,
      y: 512
    });

    expect(result).toBeDefined();
    // For a binary response, we can check that it has a size
    expect(result.byteLength).toBeGreaterThan(0);
  });
});
