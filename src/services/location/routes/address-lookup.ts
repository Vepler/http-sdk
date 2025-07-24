import { getApiInstance, initialisedConfig } from '../../../config';
import { createRequiredParameterError } from '../../../utils/errors';

/**
 * Request options for address lookup
 */
export interface AddressLookupOptions {
  /**
   * Minimum confidence threshold for results (0-100)
   * @default 70
   */
  confidenceThreshold?: number;
  
  /**
   * Fallback confidence threshold (0-100)
   * @default 60
   */
  fallbackThreshold?: number;
  
  /**
   * Maximum number of results to return (1-10)
   * @default 5
   */
  maxResults?: number;
  
  /**
   * Enable fallback matching if primary search fails
   * @default true
   */
  enableFallback?: boolean;
  
  /**
   * Include detailed processing steps in response
   * @default false
   */
  includeProcessingDetails?: boolean;
  
  /**
   * Request timeout in milliseconds (10000-300000)
   * @default 120000
   */
  timeout?: number;
}

/**
 * Address lookup request
 */
export interface AddressLookupRequest {
  /**
   * Address string to parse and match against UPRNs
   * Must be between 5-500 characters
   */
  addressString: string;
  
  /**
   * Optional configuration options
   */
  options?: AddressLookupOptions;
}

/**
 * Address match result
 */
export interface AddressMatch {
  /**
   * Unique Property Reference Number
   */
  uprn: string;
  
  /**
   * Full formatted address
   */
  address: string;
  
  /**
   * Confidence score (0-100)
   */
  confidence: number;
  
  /**
   * Source of the match
   */
  source: 'elasticsearch-exact' | 'elasticsearch-partial' | 'elasticsearch-fuzzy' | 'elasticsearch-direct' | 'postcode-fallback';
  
  /**
   * Original address string that was searched
   */
  originalAddress: string;
}

/**
 * Processing step information
 */
export interface ProcessingStep {
  /**
   * Step name/identifier
   */
  step: string;
  
  /**
   * Step execution status
   */
  status: 'success' | 'failed' | 'skipped';
  
  /**
   * Confidence score for this step
   */
  confidence: number;
  
  /**
   * Execution time in milliseconds
   */
  executionTimeMs: number;
  
  /**
   * Additional step details
   */
  details?: string;
}

/**
 * Address lookup response metadata
 */
export interface AddressLookupMetadata {
  /**
   * Number of addresses parsed from input
   */
  addressCount: number;
  
  /**
   * Total execution time in milliseconds
   */
  executionTimeMs: number;
  
  /**
   * Address pattern detected
   */
  pattern: 'single' | 'range' | 'multiple' | 'descriptive' | 'complex';
  
  /**
   * Whether fast-path optimization was used
   */
  fastPath?: boolean;
  
  /**
   * Detailed processing steps (if requested)
   */
  processingSteps?: ProcessingStep[];
}

/**
 * Address lookup response
 */
export interface AddressLookupResponse {
  /**
   * Request success status
   */
  success: boolean;
  
  /**
   * HTTP status code
   */
  statusCode: number;
  
  /**
   * Response data (if successful)
   */
  result?: {
    /**
     * Array of matched addresses
     */
    matches: AddressMatch[];
    
    /**
     * Overall confidence score
     */
    confidence: number;
    
    /**
     * Response metadata
     */
    metadata: AddressLookupMetadata;
  };
  
  /**
   * Error information (if failed)
   */
  error?: {
    /**
     * Error code
     */
    code: string;
    
    /**
     * Error message
     */
    message: string;
    
    /**
     * Whether the request can be retried
     */
    retryable: boolean;
  };
}

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