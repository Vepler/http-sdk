import { getApiInstance, initialisedConfig } from '../../../config';
import { SchoolByIdQueryParams, SchoolByIdResponse } from '@vepler/schools-types/api/endpoints/schools-by-id';

export interface GetSchoolByIdParams extends SchoolByIdQueryParams {
  id: number;
}

export async function getSchoolById(
  params: GetSchoolByIdParams
): Promise<SchoolByIdResponse> {
  const { id, includeReports = true } = params;

  // Validate required parameters
  if (!id) {
    throw new Error('The "id" parameter must be provided');
  }

  const api = getApiInstance('schools');
  const endpoint = `/schools/${id}`;

  const queryParams: Record<string, string | number | boolean> = {};
  
  if (includeReports !== undefined) {
    queryParams.includeReports = includeReports;
  }

  return await api.query(
    endpoint,
    queryParams,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}