// config.ts

import ApiService from '@vepler/http-client';

interface SDKConfig {
  propertyHost?: string;
  areaReferenceHost?: string;
  crimeHost?: string;
  roverHost?: string;
  schoolsHost?: string;
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
    propertyHost: 'https://api2.propbar.co.uk/property',
    areaReferenceHost: 'https://api2.propbar.co.uk/area-reference',
    crimeHost: 'https://api2.propbar.co.uk/crime',
    roverHost: 'https://api2.propbar.co.uk/rover',
    schoolsHost: 'https://api2.vepler.co.uk/schools',
    timeout: 60000, // 60 seconds default timeout
    logLevel: 'info',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  development: {
    propertyHost: 'https://api2.propbar.co.uk/property',
    areaReferenceHost: 'https://api2.propbar.co.uk/area-reference',
    crimeHost: 'https://api2.propbar.co.uk/crime',
    roverHost: 'https://api2.propbar.co.uk/rover',
    schoolsHost: 'https://api2.vepler.co.uk/schools',
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

    apiInstances['crime'] = ApiService.create({
      ...commonConfig,
      host: config.crimeHost || environmentConfig.crimeHost,
    });

    apiInstances['rover'] = ApiService.create({
      ...commonConfig,
      host: config.roverHost || environmentConfig.roverHost,
    });
    
    apiInstances['schools'] = ApiService.create({
      ...commonConfig,
      host: config.schoolsHost || environmentConfig.schoolsHost,
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
