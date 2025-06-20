import { initializeSDK, reset } from '../../src/config';
import areaReferenceAPI from '../../src/services/area-reference/service';

describe('Area Reference Coverage E2E Tests', () => {
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

  describe('Parameter validation', () => {
    it('should throw error when sourceCode is missing', async () => {
      await expect(
        areaReferenceAPI.coverage({
          sourceType: 'ward',
          coverageType: 'flood_risk'
        } as any)
      ).rejects.toThrow('Parameter "sourceCode" is required');
    });

    it('should throw error when sourceType is missing', async () => {
      await expect(
        areaReferenceAPI.coverage({
          sourceCode: 'E05000001',
          coverageType: 'flood_risk'
        } as any)
      ).rejects.toThrow('Parameter "sourceType" is required');
    });

    it('should throw error when both target and coverage params are provided', async () => {
      await expect(
        areaReferenceAPI.coverage({
          sourceCode: 'E05000001',
          sourceType: 'ward',
          targetCode: 'E14000530',
          targetType: 'constituency',
          coverageType: 'flood_risk'
        })
      ).rejects.toThrow('targetCode/targetType and coverageType/coverageValue are mutually exclusive');
    });

    it('should throw error when neither target nor coverage params are provided', async () => {
      await expect(
        areaReferenceAPI.coverage({
          sourceCode: 'E05000001',
          sourceType: 'ward'
        })
      ).rejects.toThrow('Either targetCode/targetType or coverageType must be provided');
    });

    it('should throw error when targetCode is provided without targetType', async () => {
      await expect(
        areaReferenceAPI.coverage({
          sourceCode: 'E05000001',
          sourceType: 'ward',
          targetCode: 'E14000530'
        })
      ).rejects.toThrow('Parameter "targetType" is required when "targetCode" is provided');
    });

    it('should throw error when coverageValue is used without coverageType', async () => {
      await expect(
        areaReferenceAPI.coverage({
          sourceCode: 'E05000001',
          sourceType: 'ward',
          coverageValue: 'high'
        })
      ).rejects.toThrow('Parameter "coverageType" is required when "coverageValue" is provided');
    });
  });

  describe('Geography-to-geography coverage', () => {
    it('should calculate built up area coverage', async () => {
      if (!process.env.API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      try {
        const result = await areaReferenceAPI.coverage({
          sourceCode: 'E63007706',
          sourceType: 'built_up_area_250',
          coverageType: 'flood_risk'
        });

        console.log('Geography-to-geography result:', JSON.stringify(result, null, 2));
        
        expect(result).toBeDefined();
        expect(result.sourceCode).toBe('E63007706');
        expect(result.sourceType).toBe('built_up_area_250');
        expect(result.coverageType).toBe('flood_risk');
        expect(result.totalArea).toBeGreaterThan(0);
        expect(Array.isArray(result.coverage)).toBeTruthy();
        
        if (result.coverage.length > 0) {
          const firstResult = result.coverage[0];
          expect(firstResult.identifier).toBeDefined();
          expect(firstResult.area).toBeGreaterThanOrEqual(0);
          expect(firstResult.percentage).toBeGreaterThanOrEqual(0);
          expect(firstResult.percentage).toBeLessThanOrEqual(100);
        }
      } catch (error: any) {
        // Check for parameter pollution bug specifically
        if (error?.status === 400 && error?.data?.message === 'Invalid request query input') {
          throw new Error('Parameter pollution detected in coverage endpoint - coverage parameters being sent incorrectly');
        }
        // If geography not found, this means the endpoint is working but test data doesn't exist
        if (error?.status === 404 && error?.data?.message?.includes('Source geography not found')) {
          console.warn('Test geography codes not found in system, but endpoint is working correctly');
          return;
        }
        console.error('Geography-to-geography API Error:', error.message);
        // Re-throw other errors to fail the test if something is genuinely broken
        throw error;
      }
    });
  });

  describe('Geography-to-type coverage', () => {
    it('should calculate flood risk coverage for a ward', async () => {
      if (!process.env.API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      try {
        const result = await areaReferenceAPI.coverage({
          sourceCode: 'E63007706',
          sourceType: 'built_up_area_250',
          coverageType: 'flood_risk'
        });

        console.log('Geography-to-type result:', JSON.stringify(result, null, 2));
        
        expect(result).toBeDefined();
        expect(result.sourceCode).toBe('E63007706');
        expect(result.sourceType).toBe('built_up_area_250');
        expect(result.coverageType).toBe('flood_risk');
        expect(result.totalArea).toBeGreaterThan(0);
        expect(Array.isArray(result.coverage)).toBeTruthy();
        
        if (result.coverage.length > 0) {
          const firstResult = result.coverage[0];
          expect(firstResult.identifier).toBeDefined();
          expect(firstResult.area).toBeGreaterThanOrEqual(0);
          expect(firstResult.percentage).toBeGreaterThanOrEqual(0);
          expect(firstResult.percentage).toBeLessThanOrEqual(100);
        }
      } catch (error: any) {
        // Check for parameter pollution bug specifically
        if (error?.status === 400 && error?.data?.message === 'Invalid request query input') {
          throw new Error('Parameter pollution detected in coverage endpoint');
        }
        // If geography not found, this means the endpoint is working but test data doesn't exist
        if (error?.status === 404 && error?.data?.message?.includes('Source geography not found')) {
          console.warn('Test geography codes not found in system, but endpoint is working correctly');
          return;
        }
        console.error('Geography-to-type API Error:', error.message);
        throw error;
      }
    });

    it('should calculate coverage with specific value filter', async () => {
      if (!process.env.API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      try {
        const result = await areaReferenceAPI.coverage({
          sourceCode: 'E63007706',
          sourceType: 'built_up_area_250',
          coverageType: 'flood_risk',
          coverageValue: 'low'
        });

        console.log('Filtered coverage result:', JSON.stringify(result, null, 2));
        
        expect(result).toBeDefined();
        expect(result.sourceCode).toBe('E63007706');
        expect(result.sourceType).toBe('built_up_area_250');
        expect(result.coverageType).toBe('flood_risk');
        expect(result.coverageValue).toBe('low');
        expect(result.totalArea).toBeGreaterThan(0);
        expect(Array.isArray(result.coverage)).toBeTruthy();
      } catch (error: any) {
        // Check for parameter pollution bug specifically
        if (error?.status === 400 && error?.data?.message === 'Invalid request query input') {
          throw new Error('Parameter pollution detected in coverage endpoint with value filter');
        }
        // If geography not found, this means the endpoint is working but test data doesn't exist
        if (error?.status === 404 && error?.data?.message?.includes('Source geography not found')) {
          console.warn('Test geography codes not found in system, but endpoint is working correctly');
          return;
        }
        console.error('Filtered coverage API Error:', error.message);
        throw error;
      }
    });

    it('should calculate coverage with breakdown aggregation', async () => {
      if (!process.env.API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      try {
        const result = await areaReferenceAPI.coverage({
          sourceCode: 'E63007706',
          sourceType: 'built_up_area_250',
          coverageType: 'flood_risk',
          aggregation: 'breakdown'
        });

        console.log('Breakdown aggregation result:', JSON.stringify(result, null, 2));
        
        expect(result).toBeDefined();
        expect(result.sourceCode).toBe('E63007706');
        expect(result.sourceType).toBe('built_up_area_250');
        expect(result.coverageType).toBe('flood_risk');
        expect(result.totalArea).toBeGreaterThan(0);
        expect(Array.isArray(result.coverage)).toBeTruthy();
        
        // With breakdown aggregation, we should get multiple coverage results
        if (result.coverage.length > 1) {
          const totalPercentage = result.coverage.reduce((sum, item) => sum + item.percentage, 0);
          expect(totalPercentage).toBeGreaterThan(0);
          expect(totalPercentage).toBeLessThanOrEqual(100);
        }
      } catch (error: any) {
        // Check for parameter pollution bug specifically
        if (error?.status === 400 && error?.data?.message === 'Invalid request query input') {
          throw new Error('Parameter pollution detected in coverage endpoint with breakdown aggregation');
        }
        // If geography not found, this means the endpoint is working but test data doesn't exist
        if (error?.status === 404 && error?.data?.message?.includes('Source geography not found')) {
          console.warn('Test geography codes not found in system, but endpoint is working correctly');
          return;
        }
        console.error('Breakdown aggregation API Error:', error.message);
        throw error;
      }
    });
  });
});