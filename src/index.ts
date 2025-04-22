/**
 * @license
 * Vepler HTTP SDK
 * Copyright (c) 2023-2025 Vepler Limited. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the
 * License at https://opensource.org/licenses/MIT
 */

import { initializeSDK as initSDK, reset } from './config';
import * as PropertyService from './services/property/service';
import * as AreaReferenceService from './services/area-reference/service';
import * as CrimeService from './services/crime/service';
import * as RoverService from './services/demographics/service';
import * as SchoolsService from './services/schools/service';

// Export types for external usage
// Area Reference types
export type { GeographicEntity, QueryByTypeParams, QueryByTypeResponse } from './services/area-reference/routes/query-by-type';
export type { BorderAreasParams, BorderAreasResponse } from './services/area-reference/routes/border-areas';

// Schools types
export type { SchoolsQueryParams, SchoolsResponse } from '@vepler/schools-types/api/endpoints/schools';
export type { SchoolByIdResponse } from '@vepler/schools-types/api/endpoints/schools-by-id';
export type { GetSchoolByIdParams } from './services/schools/routes/get-school-by-id';
export type { SchoolSearchQueryParams, SchoolSearchResponse } from '@vepler/schools-types/api/endpoints/search';
export type { SchoolAutocompleteQueryParams, SchoolAutocompleteResponse } from '@vepler/schools-types/api/endpoints/search';
export type { MetricsQueryParams, MetricsResponse } from '@vepler/schools-types/api/endpoints/metrics';
export type { MetricsGeographicRequestBody, MetricsGeographicResponse } from '@vepler/schools-types/api/endpoints/metrics-geographic';
export {
  initSDK as initializeSDK,
  reset
};

const routes = {
  property: PropertyService.default,
  areaReference: AreaReferenceService.default,
  crime: CrimeService.default,
  rover: RoverService.default,
  schools: SchoolsService.default
}

export const property = routes.property
export const areaReference = routes.areaReference
export const crime = routes.crime
export const rover = routes.rover
export const schools = routes.schools

export default routes;
