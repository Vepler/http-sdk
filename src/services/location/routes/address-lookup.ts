import { getApiInstance, initialisedConfig } from '../../../config';
import { createRequiredParameterError } from '../../../utils/errors';
import { 
  AddressLookupOptions,
  AddressLookupRequest,
  AddressLookupResponse,
  AddressLookupResult,
  AddressMatch,
  ProcessingStep,
  AddressLookupMetadata
} from '@vepler/locations-types';

// All types are now imported from @vepler/locations-types

/**
 * Address to UPRN matching with LLM-powered parsing
 * 
 * This endpoint provides intelligent address parsing and matching with:
 * - Fast-path optimization for well-formatted addresses (95%+ confidence)
 * - LLM-powered parsing for complex multi-address inputs
 * - Confidence scoring and fallback mechanisms
 * - Detailed processing insights
 * 
 * @param params - Address lookup request parameters
 * @returns Promise resolving to address matches with metadata
 * 
 * @example
 * ```typescript
 * import { location } from '@vepler/http-sdk';
 * 
 * // Simple address lookup
 * const result = await location.lookup({
 *   addressString: "10 Downing Street, London SW1A 2AA"
 * });
 * 
 * // Complex multi-address with options
 * const complexResult = await location.lookup({
 *   addressString: "37 barley avenue and 42 in pocklington YO442RW",
 *   options: {
 *     confidenceThreshold: 60,
 *     includeProcessingDetails: true,
 *     maxResults: 10
 *   }
 * });
 * ```
 */
export async function addressLookup(
  params: AddressLookupRequest
): Promise<AddressLookupResponse> {
  const { addressString, options = {} } = params;

  // Validate required parameters
  if (!addressString) {
    throw new Error(createRequiredParameterError('addressString'));
  }

  if (addressString.length < 5) {
    throw new Error('Address string must be at least 5 characters long');
  }

  if (addressString.length > 500) {
    throw new Error('Address string must be less than 500 characters');
  }

  const api = getApiInstance('locator');
  const endpoint = '/address/enhanced-lookup';

  // Build request body
  const requestBody: AddressLookupRequest = {
    addressString,
    options: {
      confidenceThreshold: options.confidenceThreshold || 70,
      fallbackThreshold: options.fallbackThreshold || 60,
      maxResults: options.maxResults || 5,
      enableFallback: options.enableFallback !== false,
      includeProcessingDetails: options.includeProcessingDetails || false,
      timeout: options.timeout || 120000
    }
  };

  // Extended timeout for LLM processing
  const requestOptions = {
    apiKey: initialisedConfig.apiKey,
    timeout: Math.max(requestBody.options?.timeout || 120000, 150000) // At least 2.5 minutes
  };

  return await api.post(endpoint, requestBody, requestOptions);
}