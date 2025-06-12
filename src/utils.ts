export function filterDefinedParams<T extends Record<string, any>>(
  params: T,
  requiredFields: (keyof T)[]
): Record<string, any> {
  const result: Record<string, any> = {};

  // Always include required fields
  requiredFields.forEach((field) => {
    result[field as string] = params[field];
  });

  // Only include optional fields if they are defined
  Object.keys(params).forEach((key) => {
    if (!requiredFields.includes(key) && params[key] !== undefined) {
      result[key] = params[key];
    }
  });

  return result;
}
