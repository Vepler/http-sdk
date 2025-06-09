import { getApiInstance, initialisedConfig } from '../../../config';

// POI service uses the area-reference API for all endpoints

export interface GetNearestPoiParams {
  lat: number;
  lng: number;
  types: string;
  limit?: number;
  radius?: number;
}

export interface PoiEntity {
  id: string;
  name: string;
  type: string;
  code: string;
  location: {
    lat: number;
    lng: number;
  };
  distance: number;
}

export interface GetNearestPoiResponse {
  query: {
    location: {
      lat: number;
      lng: number;
    };
    radius: number;
    limit: number;
    types: string;
  };
  result: PoiEntity[];
  count: number;
}

export async function getNearestPoi(params: GetNearestPoiParams): Promise<GetNearestPoiResponse> {
  const { 
    lat,
    lng,
    types,
    limit,
    radius
  } = params;

  const api = getApiInstance('area-reference');
  const endpoint = '/poi/nearest';
  
  const queryParams: Record<string, string | number> = {
    lat,
    lng,
    types
  };
  
  if (limit !== undefined) queryParams.limit = limit;
  if (radius !== undefined) queryParams.radius = radius;
  
  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}