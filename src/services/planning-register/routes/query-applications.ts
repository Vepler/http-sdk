import { getApiInstance, initialisedConfig } from '../../../config';
import {
  ApplicationQuery,
  QueryApplicationResponse
} from '@vepler/planning-register-types';

export async function queryApplications(query: ApplicationQuery): Promise<QueryApplicationResponse> {
  const api = getApiInstance('planning-register');
  const endpoint = '/application/query';

  return await api.post(
    endpoint,
    query,
    {
      apiKey: initialisedConfig.apiKey,
    }
  );
}
