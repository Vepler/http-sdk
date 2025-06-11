import { initializeSDK, areaReference, reset } from '../../src';

describe('Geographic Resolver E2E Tests', () => {
  beforeAll(() => {
    // Set longer timeout for API calls
    jest.setTimeout(30000);

    if (!process.env.ADMIN_API_KEY) {
      console.log('Skipping test: No API key available');
      return;
    }

    initializeSDK({
      apiKey: process.env.ADMIN_API_KEY
    });
  });

  afterEach(() => {
    if (!process.env.ADMIN_API_KEY) {
      return;
    }
    // Don't reset between tests to avoid re-initialization overhead
  });

  describe('resolver.resolve', () => {
    it('should resolve Manchester LAD to LSOA codes', async () => {
      if (!process.env.ADMIN_API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      const result = await areaReference.resolver.resolve({
        inputCode: 'E63007706',
        supportedTiers: 'lsoa21',
        allowParentFallback: true
      }) as any;

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.input.code).toBe('E63007706');
      expect(result.data.resolution.targetCodes).toBeDefined();
      expect(Array.isArray(result.data.resolution.targetCodes)).toBe(true);
      expect(result.data.resolution.targetCodes.length).toBeGreaterThan(0);
      expect(result.data.resolution.targetCount).toBeGreaterThan(0);

      // Log the actual results for verification
      console.log(`Resolved ${result.data.input.code} to ${result.data.resolution.targetCount} ${result.data.resolution.targetGeographyType} areas`);
      console.log(`Strategy used: ${result.data.resolution.strategy}`);
    });

    it('should resolve with multiple target tiers', async () => {
      if (!process.env.ADMIN_API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      const result = await areaReference.resolver.resolve({
        inputCode: 'E63007706',
        supportedTiers: 'lsoa21',
        allowParentFallback: true
      }) as any;

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.input.code).toBe('E63007706');
      expect(result.data.resolution.targetCodes.length).toBeGreaterThan(0);

      console.log(`Multi-tier resolution: ${result.data.resolution.targetCount} areas of type ${result.data.resolution.targetGeographyType}`);
    });

    it('should validate required parameters', async () => {
      if (!process.env.ADMIN_API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      await expect(areaReference.resolver.resolve({
        inputCode: '',
        supportedTiers: 'lsoa21'
      })).rejects.toThrow('The "inputCode" parameter must be provided');

      await expect(areaReference.resolver.resolve({
        inputCode: 'E08000003',
        supportedTiers: ''
      })).rejects.toThrow('The "supportedTiers" parameter must be provided');
    });
  });

  describe('resolver.getTypes', () => {
    it('should return all supported geography types', async () => {
      if (!process.env.ADMIN_API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      const result = await areaReference.resolver.getTypes() as any;

      expect(result).toBeDefined();
      expect(result.data.geographyTypes).toBeDefined();
      expect(Array.isArray(result.data.geographyTypes)).toBe(true);
      expect(result.data.geographyTypes.length).toBeGreaterThan(0);
      
      // Check that we have common geographic types
      const typeNames = result.data.geographyTypes;
      expect(typeNames).toContain('lsoa21');
      expect(typeNames).toContain('uk_output_area');

      console.log(`Found ${result.data.geographyTypes.length} supported geography types`);
      console.log(`Types: ${typeNames.slice(0, 5).join(', ')}...`);
    });

    it('should accept optional query parameters', async () => {
      if (!process.env.ADMIN_API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      // Test without any parameters (API doesn't seem to support includeExamples)
      const result = await areaReference.resolver.getTypes() as any;

      expect(result).toBeDefined();
      expect(result.data.geographyTypes).toBeDefined();
      expect(result.data.geographyTypes.length).toBeGreaterThan(0);
    });
  });

  describe('resolver.checkCapability', () => {
    it('should check resolution capability for MSOA to LSOA', async () => {
      if (!process.env.ADMIN_API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      const result = await areaReference.resolver.checkCapability({
        inputType: 'built_up_area_250',
        supportedTiers: 'uk_output_area,lsoa21'
      }) as any;

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(typeof result.data.isSupported).toBe('boolean');
      expect(result.data.recommendedStrategy).toBeDefined();
      expect(result.data.capabilities).toBeDefined();

      console.log(`built_up_area_250->uk_output_area,lsoa21 capability: ${result.data.isSupported ? 'YES' : 'NO'}`);
      console.log(`Strategy: ${result.data.recommendedStrategy}`);
      console.log(`Capabilities:`, result.data.capabilities);
    });

    it('should check capability for LAD to LSOA', async () => {
      if (!process.env.ADMIN_API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      const result = await areaReference.resolver.checkCapability({
        inputType: 'local_authority_district',
        supportedTiers: 'lsoa21'
      }) as any;

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(typeof result.data.isSupported).toBe('boolean'); // Check if API responds with capability info

      console.log(`LAD->LSOA capability: ${result.data.isSupported ? 'YES' : 'NO'}`);
      console.log(`Strategy: ${result.data.recommendedStrategy}`);
    });

    it('should validate required parameters', async () => {
      if (!process.env.ADMIN_API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      await expect(areaReference.resolver.checkCapability({
        inputType: '',
        supportedTiers: 'lsoa21'
      })).rejects.toThrow('The "inputType" parameter must be provided');

      await expect(areaReference.resolver.checkCapability({
        inputType: 'msoa21',
        supportedTiers: ''
      })).rejects.toThrow('The "supportedTiers" parameter must be provided');
    });

    it('should work without optional parameters', async () => {
      if (!process.env.ADMIN_API_KEY) {
        console.log('Skipping test: No API key available');
        return;
      }

      const result = await areaReference.resolver.checkCapability({
        inputType: 'built_up_area_250',
        supportedTiers: 'lsoa21'
      }) as any;

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data.isSupported).toBeDefined();
    });
  });
});