import { getApiInstance, initialisedConfig } from '../../../config';
import { GetTilesParams } from '@vepler/planning-register-types';

export async function getMapTile(params: GetTilesParams): Promise<ArrayBuffer> {
  const { z, x, y } = params;

  const api = getApiInstance('planning-register');
  const endpoint = `/tiles`;
  const slug = `${z}/${x}/${y}`;

  return await api.get(endpoint, slug, {
    apiKey: initialisedConfig.apiKey,
    responseType: 'arraybuffer',
  });
}
