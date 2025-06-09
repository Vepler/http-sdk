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
import * as PlanningRegisterService from './services/planning-register/service';
import * as SearchService from './services/search/service';
import * as PropertyPredictorService from './services/property-predictor/service';
import * as LocationService from './services/location/service';
import * as CouncilRegisterService from './services/council-tax-register/service';
import * as ConnectivityService from './services/connectivity/service';
import * as PoiService from './services/poi/service';

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

// Planning Register types
export type {
  ApplicationQuery,
  QueryApplicationResponse,
  GetApplicationParams,
  GetApplicationResponse,
  GetTilesParams,
  PlanningApplication,
  PlanningStatus
} from '@vepler/planning-register-types';

// Search types
export type { UnifiedSearchInput, UnifiedSearchResponse } from '@vepler/search-types';

// Property Predictor types
export type { IMultiTargetPredictionRequest, IMultiTargetPredictionResponse } from '@vepler/property-predictor-types';

// Location types
export type {
  AutocompleteQueryParams,
  SuccessResponse,
  AutocompleteResult,
  StreetAutocompleteQueryParams,
  StreetAutocompleteResult
} from '@vepler/locations-types';

// Council Register types
export type {
  GetPropertyRequest,
  GetPropertyResponse,
  PropertyDetail,
  PropertyTaxBandDetail
} from '@vepler/council-register-types';

export {
  initSDK as initializeSDK,
  reset
};

const routes = {
  property: PropertyService.default,
  areaReference: AreaReferenceService.default,
  crime: CrimeService.default,
  rover: RoverService.default,
  schools: SchoolsService.default,
  planningRegister: PlanningRegisterService.default,
  search: SearchService.default,
  propertyPredictor: PropertyPredictorService.default,
  location: LocationService.default,
  councilRegister: CouncilRegisterService.default,
  connectivity: ConnectivityService.default,
  poi: PoiService.default
}

export const property = routes.property
export const areaReference = routes.areaReference
export const crime = routes.crime
export const rover = routes.rover
export const schools = routes.schools
export const planningRegister = routes.planningRegister
export const search = routes.search
export const propertyPredictor = routes.propertyPredictor
export const location = routes.location
export const councilRegister = routes.councilRegister
export const connectivity = routes.connectivity
export const poi = routes.poi

export default routes;
