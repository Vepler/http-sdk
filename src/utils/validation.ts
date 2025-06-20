import { createRequiredParameterError } from './errors';

/**
 * Validation utilities for parameter checking
 */

/**
 * Validates that required parameters are provided
 * @param params - Object containing parameters
 * @param requiredParams - Array of parameter names that are required
 * @throws Error if any required parameter is missing
 */
export function validateRequiredParameters(
  params: Record<string, unknown>,
  requiredParams: string[]
): void {
  for (const param of requiredParams) {
    if (!params[param]) {
      throw new Error(createRequiredParameterError(param));
    }
  }
}

/**
 * Filters undefined values from an object, useful for API request bodies
 * @param obj - Object to filter
 * @returns New object with undefined values removed
 */
export function filterUndefined<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  const result: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  
  return result;
}

/**
 * Processes array parameters for API requests (e.g., joins arrays to strings)
 * @param value - The value to process
 * @param separator - Separator to use for joining arrays (default: ',')
 * @returns Processed value
 */
export function processArrayParameter(
  value: unknown,
  separator: string = ','
): unknown {
  if (Array.isArray(value)) {
    return value.join(separator);
  }
  return value;
}