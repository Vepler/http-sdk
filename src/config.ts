// config.ts

import ApiService from '@vepler/http-client';

interface SDKConfig {
  propertyHost?: string;
  areaReferenceHost?: string;
  safetyHost?: string;
  roverHost?: string;
  schoolsHost?: string;
  planningRegisterHost?: string;
  searchHost?: string;
  propertyPredictorHost?: string;
  locatorHost?: string;
  councilRegisterHost?: string;
  timeout?: number;
  apiKey?: string;
  logLevel?: string;
  headers?: Record<string, string>;
}

export let initialisedConfig: Record<string, unknown> = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiInstances: Record<string, any> = {};
let isInitialized = false;

const defaultConfig = {
  production: {
    propertyHost: process.env.SVC_PROPERTY_HOST || 'https://api2.propbar.co.uk/property',
    areaReferenceHost: process.env.AREA_REFERENCE_HOST || 'https://api2.propbar.co.uk/area-reference',
    safetyHost: process.env.SAFETY_HOST || 'https://api2.propbar.co.uk/safety',
    roverHost: process.env.SVC_ROVER_HOST || 'https://api2.propbar.co.uk/rover',
    schoolsHost: process.env.SCHOOLS_HOST || 'https://api2.propbar.co.uk/schools',
    planningRegisterHost: process.env.PLANNING_REGISTER_HOST || 'https://api2.propbar.co.uk/planning-register',
    searchHost: process.env.SEARCH_HOST || 'https://api2.propbar.co.uk/search',
    propertyPredictorHost: process.env.PROPERTY_PREDICTOR_HOST || 'https://api2.propbar.co.uk/linked-avm',
    locatorHost: process.env.SVC_LOCATIONS_HOST || 'https://api2.propbar.co.uk/locator',
    councilRegisterHost: process.env.SVC_COUNCIL_TAX_HOST || 'https://api2.propbar.co.uk/council-tax',
    timeout: 60000, // 60 seconds default timeout
    logLevel: 'info',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  development: {
    propertyHost: process.env.SVC_PROPERTY_HOST || 'https://api2.propbar.co.uk/property',
    areaReferenceHost: process.env.AREA_REFERENCE_HOST || 'https://api2.propbar.co.uk/area-reference',
    safetyHost: process.env.SAFETY_HOST || 'https://api2.propbar.co.uk/safety',
    roverHost: process.env.SVC_ROVER_HOST || 'https://api2.propbar.co.uk/rover',
    schoolsHost: process.env.SCHOOLS_HOST || 'https://api2.propbar.co.uk/schools',
    planningRegisterHost: process.env.PLANNING_REGISTER_HOST || 'https://api2.propbar.co.uk/planning-register',
    searchHost: process.env.SEARCH_HOST || 'https://api2.propbar.co.uk/search',
    propertyPredictorHost: process.env.PROPERTY_PREDICTOR_HOST || 'https://api2.propbar.co.uk/linked-avm',
    locatorHost: process.env.SVC_LOCATIONS_HOST || 'https://api2.propbar.co.uk/locator',
    councilRegisterHost: process.env.SVC_COUNCIL_TAX_HOST || 'https://api2.propbar.co.uk/council-tax',
    timeout: 60000, // 60 seconds default timeout
    logLevel: 'debug',
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

export const initializeSDK = (config: SDKConfig = defaultConfig.production, env: 'production' | 'development' = 'production') => {
  // Prevent re-initialization
  if (isInitialized) {
    console.warn('SDK has already been initialized. Call reset() first if you want to re-initialize.');
    return;
  }

  const environmentConfig = defaultConfig[env];

  const commonConfig = {
    timeout: config.timeout || environmentConfig.timeout,
    logLevel: config.logLevel || environmentConfig.logLevel,
    headers: config.headers || environmentConfig.headers,
    apiKey: config.apiKey || null
  };

  // If no API key is provided, throw an error
  if (!commonConfig.apiKey) {
    throw new Error('An API key must be provided');
  }

  try {
    apiInstances['property'] = ApiService.create({
      ...commonConfig,
      host: config.propertyHost || environmentConfig.propertyHost,
    });

    apiInstances['area-reference'] = ApiService.create({
      ...commonConfig,
      host: config.areaReferenceHost || environmentConfig.areaReferenceHost,
    });

    apiInstances['safety'] = ApiService.create({
      ...commonConfig,
      host: config.safetyHost || environmentConfig.safetyHost,
    });

    apiInstances['rover'] = ApiService.create({
      ...commonConfig,
      host: config.roverHost || environmentConfig.roverHost,
    });
    
    apiInstances['schools'] = ApiService.create({
      ...commonConfig,
      host: config.schoolsHost || environmentConfig.schoolsHost,
    });
    
    apiInstances['planning-register'] = ApiService.create({
      ...commonConfig,
      host: config.planningRegisterHost || environmentConfig.planningRegisterHost,
    });
    
    apiInstances['search'] = ApiService.create({
      ...commonConfig,
      host: config.searchHost || environmentConfig.searchHost,
    });

    apiInstances['property-predictor'] = ApiService.create({
      ...commonConfig,
      host: config.propertyPredictorHost || environmentConfig.propertyPredictorHost,
    });

    apiInstances['locator'] = ApiService.create({
      ...commonConfig,
      host: config.locatorHost || environmentConfig.locatorHost,
    });
    
    apiInstances['council-register'] = ApiService.create({
      ...commonConfig,
      host: config.councilRegisterHost || environmentConfig.councilRegisterHost,
    });

    initialisedConfig = commonConfig;
    isInitialized = true;

    return { success: true };
  } catch (error) {
    console.error('Error initializing SDK:', error);
    throw new Error(`Failed to initialize SDK: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getApiInstance = (service: string): any => {
  // Check if SDK is initialized
  if (!isInitialized) {
    throw new Error(
      `SDK not initialized. Call initializeSDK() before using any API services. Example: 
      import { initializeSDK } from '@vepler/http-sdk';
      initializeSDK({ apiKey: 'your-api-key' });`
    );
  }

  const apiInstance = apiInstances[service];

  if (!apiInstance) {
    throw new Error(`Service '${service}' does not exist. Available services are: ${Object.keys(apiInstances).join(', ')}`);
  }

  return apiInstance;
};

// Add a reset function for testing and re-initialization
export const reset = () => {
  Object.keys(apiInstances).forEach(key => delete apiInstances[key]);
  initialisedConfig = {};
  isInitialized = false;
};
