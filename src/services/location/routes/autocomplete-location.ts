import { getApiInstance, initialisedConfig } from '../../../config';
import { 
  AutocompleteQueryParams, 
  SuccessResponse, 
  AutocompleteResult 
} from '@vepler/locations-types';

export async function autocompleteLocation(
  params: AutocompleteQueryParams
): Promise<SuccessResponse<AutocompleteResult[]>> {
  const { 
    q, 
    limit = 10, 
    offset = 0
  } = params;

  // Validate required parameters
  if (!q) {
    throw new Error('The "q" parameter must be provided');
  }

  const api = getApiInstance('locator');
  const endpoint = '/autocomplete';

  const queryParams: AutocompleteQueryParams = {
    q,
    limit,
    offset
  };

  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}