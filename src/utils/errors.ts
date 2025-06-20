/**
 * Standardized error message utilities for consistent error handling across the SDK
 */

/**
 * Creates a standardized required parameter error message
 * @param paramName - The name of the required parameter
 * @returns Formatted error message
 */
export function createRequiredParameterError(paramName: string): string {
  return `Parameter "${paramName}" is required`;
}

/**
 * Creates a standardized mutually exclusive parameters error message
 * @param paramGroup1 - First group of parameters
 * @param paramGroup2 - Second group of parameters
 * @returns Formatted error message
 */
export function createMutuallyExclusiveError(
  paramGroup1: string,
  paramGroup2: string
): string {
  return `Parameters ${paramGroup1} and ${paramGroup2} are mutually exclusive`;
}

/**
 * Creates a standardized "either/or" parameter error message
 * @param paramGroup1 - First group of parameters
 * @param paramGroup2 - Second group of parameters
 * @returns Formatted error message
 */
export function createEitherOrParameterError(
  paramGroup1: string,
  paramGroup2: string
): string {
  return `Either ${paramGroup1} or ${paramGroup2} must be provided`;
}

/**
 * Creates a standardized conditional parameter error message
 * @param dependentParam - Parameter that depends on another
 * @param requiredParam - Parameter that is required when dependent is provided
 * @returns Formatted error message
 */
export function createConditionalParameterError(
  dependentParam: string,
  requiredParam: string
): string {
  return `Parameter "${requiredParam}" is required when "${dependentParam}" is provided`;
}