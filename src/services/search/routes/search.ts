import { getApiInstance, initialisedConfig } from '../../../config';
import { UnifiedSearchInput, UnifiedSearchResponse } from '@vepler/search-types';

/**
 * Unified Search API
 * GET /search
 *
 * Searches across multiple data sources based on query intent.
 *
 * @param params Search query parameters
 * @returns Promise containing search results
 */
export async function search(params: UnifiedSearchInput): Promise<UnifiedSearchResponse> {
  const {
    query,
    limit = 10,
    offset = 0,
    source
  } = params;

  // Validate required parameters
  if (!query) {
    throw new Error('The "query" parameter must be provided');
  }

  const api = getApiInstance('search');
  const endpoint = '';

  const queryParams: Record<string, string | number> = {
    query,
    limit
  };

  if (offset !== undefined) {
    queryParams.offset = offset;
  }

  if (source !== undefined) {
    queryParams.source = source;
  }

  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
