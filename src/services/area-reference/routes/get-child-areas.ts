import { getApiInstance, initialisedConfig } from '../../../config';
import { Areas } from '@vepler/area-reference-types';

export async function getChildAreas(
  parentCode: string,
  childType?: string,
  options?: Areas.ChildrenQueryParams
): Promise<Areas.ChildrenResponse> {
  // Construct the endpoint path
  let endpoint = `/children/${parentCode}`;
  if (childType) {
    endpoint += `/${childType}`;
  }

  // Extract query parameters from options
  const {
    includeHierarchy = false,
    includeGeometry = false,
    limit = 100,
    offset = 0,
  } = options || {};

  const queryParams = {
    includeHierarchy,
    includeGeometry,
    limit,
    offset,
  };

  // Get API instance and make the request
  const api = getApiInstance('area-reference');

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}
