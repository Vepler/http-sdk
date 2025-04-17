import { getApiInstance, initialisedConfig } from '../../../config';

export interface GetAutocompleteParams {
  query: string;
  types?: string;
}

export interface LocationResult {
  id: string;
  name: string;
  type: string;
  [key: string]: string | number | boolean | null | object;
}

export interface GetAutocompleteResponse {
  results: LocationResult[];
  success: boolean;
}

export async function getAutocomplete(params: GetAutocompleteParams): Promise<GetAutocompleteResponse> {
  const { query, types } = params;

  const api = getApiInstance('area-reference');
  const endpoint = '/search/locations/autocomplete';

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
