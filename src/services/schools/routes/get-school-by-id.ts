import { getApiInstance, initialisedConfig } from '../../../config';
import { createRequiredParameterError } from '../../../utils/errors';
import {
  SchoolByIdQueryParams,
  SchoolByIdResponse,
} from '@vepler/schools-types/api/endpoints/schools-by-id';

export interface GetSchoolByIdParams extends SchoolByIdQueryParams {
  id: number;
}

export async function getSchoolById(
  params: GetSchoolByIdParams
): Promise<SchoolByIdResponse> {
  const { id, includeReports = true } = params;

  // Validate required parameters
  if (!id) {
    throw new Error(createRequiredParameterError('id'));
  }

  const api = getApiInstance('schools');
  const endpoint = `/${id}`;

  const queryParams: SchoolByIdQueryParams = {};

  if (includeReports !== undefined) {
    queryParams.includeReports = includeReports;
  }

  return await api.query(endpoint, queryParams, {
    apiKey: initialisedConfig.apiKey,
  });
}
