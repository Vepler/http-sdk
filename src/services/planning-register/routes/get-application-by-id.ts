import { getApiInstance, initialisedConfig } from '../../../config';
import {
  GetApplicationParams,
  GetApplicationResponse,
} from '@vepler/planning-register-types';

export async function getApplicationById(
  params: GetApplicationParams
): Promise<GetApplicationResponse> {
  const { applicationId } = params;

  const api = getApiInstance('planning-register');
  const endpoint = `/application`;

  return await api.get(endpoint, applicationId, {
    apiKey: initialisedConfig.apiKey,
  });
}
