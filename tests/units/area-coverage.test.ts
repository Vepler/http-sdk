import { initializeSDK } from '../../src/config';
import areaReferenceAPI from '../../src/services/area-reference/service';

describe('Validate Area Reference Coverage API', () => {
  beforeAll(() => {
    initializeSDK({
      apiKey: process.env.ADMIN_API_KEY
    });
  });

  describe('Parameter validation', () => {
    it('should throw error when sourceCode is missing', async () => {
      await expect(
        areaReferenceAPI.coverage({
          sourceType: 'ward',
          coverageType: 'flood_risk'
        } as any)
      ).rejects.toThrow('sourceCode and sourceType are required parameters');
    });

    it('should throw error when sourceType is missing', async () => {
      await expect(
        areaReferenceAPI.coverage({
          sourceCode: 'E05000001',
          coverageType: 'flood_risk'
        } as any)
      ).rejects.toThrow('sourceCode and sourceType are required parameters');
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
      ).rejects.toThrow('targetType is required when targetCode is provided');
    });

    it('should throw error when coverageValue is used without coverageType', async () => {
      await expect(
        areaReferenceAPI.coverage({
          sourceCode: 'E05000001',
          sourceType: 'ward',
          coverageValue: 'high'
        })
      ).rejects.toThrow('coverageValue can only be used with coverageType');
    });
  });

  describe('Geography-to-geography coverage', () => {
    it('should calculate ward to constituency overlap', async () => {
      try {
        const result = await areaReferenceAPI.coverage({
          sourceCode: 'E05000001',
          sourceType: 'ward',
          targetCode: 'E14000530',
          targetType: 'constituency'
        });

        console.log('Geography-to-geography result:', JSON.stringify(result, null, 2));
        
        expect(result).toBeDefined();
        expect(result.sourceCode).toBe('E05000001');
        expect(result.sourceType).toBe('ward');
        expect(result.targetCode).toBe('E14000530');
        expect(result.targetType).toBe('constituency');
        expect(result.totalArea).toBeGreaterThan(0);
        expect(Array.isArray(result.coverage)).toBeTruthy();
        
        if (result.coverage.length > 0) {
          const firstResult = result.coverage[0];
          expect(firstResult.identifier).toBeDefined();
          expect(firstResult.area).toBeGreaterThanOrEqual(0);
          expect(firstResult.percentage).toBeGreaterThanOrEqual(0);
          expect(firstResult.percentage).toBeLessThanOrEqual(100);
        }
      } catch (error) {
        console.error('Geography-to-geography API Error:', error);
        throw error;
      }
    });
  });

  describe('Geography-to-type coverage', () => {
    it('should calculate flood risk coverage for a ward', async () => {
      try {
        const result = await areaReferenceAPI.coverage({
          sourceCode: 'E05000001',
          sourceType: 'ward',
          coverageType: 'flood_risk'
        });

        console.log('Geography-to-type result:', JSON.stringify(result, null, 2));
        
        expect(result).toBeDefined();
        expect(result.sourceCode).toBe('E05000001');
        expect(result.sourceType).toBe('ward');
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
      } catch (error) {
        console.error('Geography-to-type API Error:', error);
        throw error;
      }
    });

    it('should calculate coverage with specific value filter', async () => {
      try {
        const result = await areaReferenceAPI.coverage({
          sourceCode: 'E92000001',
          sourceType: 'country',
          coverageType: 'flood_risk',
          coverageValue: 'high'
        });

        console.log('Filtered coverage result:', JSON.stringify(result, null, 2));
        
        expect(result).toBeDefined();
        expect(result.sourceCode).toBe('E92000001');
        expect(result.sourceType).toBe('country');
        expect(result.coverageType).toBe('flood_risk');
        expect(result.coverageValue).toBe('high');
        expect(result.totalArea).toBeGreaterThan(0);
        expect(Array.isArray(result.coverage)).toBeTruthy();
      } catch (error) {
        console.error('Filtered coverage API Error:', error);
        throw error;
      }
    });

    it('should calculate coverage with breakdown aggregation', async () => {
      try {
        const result = await areaReferenceAPI.coverage({
          sourceCode: 'W92000004',
          sourceType: 'country',
          coverageType: 'flood_risk',
          aggregation: 'breakdown'
        });

        console.log('Breakdown aggregation result:', JSON.stringify(result, null, 2));
        
        expect(result).toBeDefined();
        expect(result.sourceCode).toBe('W92000004');
        expect(result.sourceType).toBe('country');
        expect(result.coverageType).toBe('flood_risk');
        expect(result.totalArea).toBeGreaterThan(0);
        expect(Array.isArray(result.coverage)).toBeTruthy();
        
        // With breakdown aggregation, we should get multiple coverage results
        if (result.coverage.length > 1) {
          const totalPercentage = result.coverage.reduce((sum, item) => sum + item.percentage, 0);
          expect(totalPercentage).toBeGreaterThan(0);
          expect(totalPercentage).toBeLessThanOrEqual(100);
        }
      } catch (error) {
        console.error('Breakdown aggregation API Error:', error);
        throw error;
      }
    });
  });
});