import { getApiInstance, initialisedConfig } from '../../../config';
import { filterUndefined, processArrayParameter } from '../../../utils/validation';

export interface QueryPropertyResult {
  result: object[];
  size: number;
  totalSize: number;
  success: boolean;
}

export interface GetPropertyBySourceParams {
  sourceIds?: string[];
  limit?: number;
  offset?: number;
  area?: Array<
    | {
        type: 'point';
        radius: number;
        coordinates: [number, number];
      }
    | {
        type: 'polygon';
        coordinates: [number, number][];
      }
    | {
        type: 'multipolygon';
        coordinates: [number, number][][];
      }
    | {
        type: 'postcode';
        value: string;
      }
    | {
        type: 'outcode';
        value: string;
      }
    | {
        locationId: string;
      }
  >;
  attributes?: string[];
  query?: Array<{
    operator: 'AND' | 'OR';
    groups: Array<{
      conditions: Array<{
        field: string;
        comparator: string;
        value: string | number | boolean | Array<string | number | boolean>;
      }>;
    }>;
  }>;
}

export async function queryProperty(
  params: GetPropertyBySourceParams
): Promise<QueryPropertyResult> {
  const {
    sourceIds,
    limit = 25,
    offset = 0,
    area,
    attributes,
    query,
  } = params;

  const api = getApiInstance('property');
  const endpoint = `/query`;

  const requestBody = filterUndefined({
    sourceIds,
    limit,
    offset,
    area,
    attributes: processArrayParameter(attributes),
    query,
  });

  return await api.post(endpoint, requestBody, {
    apiKey: initialisedConfig.apiKey,
  });
}
