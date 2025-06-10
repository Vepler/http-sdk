import { getApiInstance, initialisedConfig } from '../../../config';
import { Search } from '@vepler/area-reference-types';

export async function getAutocomplete(params: Search.GetAutocompleteQueryParams): Promise<Search.GetAutocompleteResponse> {
  const { query, types } = params;

  const api = getApiInstance('area-reference');
  const endpoint = '/locations/autocomplete';

  return await api.query(
    endpoint,
    {
      query,
      types
    },
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}
