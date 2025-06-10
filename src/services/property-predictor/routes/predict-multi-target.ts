import { getApiInstance, initialisedConfig } from '../../../config';
import {
  IMultiTargetPredictionRequest,
  IMultiTargetPredictionResponse
} from '@vepler/property-predictor-types';

/**
 * Multi-Target Prediction
 * POST /predict/multi-target
 *
 * Makes predictions for property features like price, beds, floor area, etc.
 *
 * @param params Prediction parameters
 * @returns Promise containing prediction results
 */
export async function predictMultiTarget(params: IMultiTargetPredictionRequest): Promise<IMultiTargetPredictionResponse> {
  const {
    target,
    propertyType,
    postcode,
    floorArea,
    beds,
    baths,
    condition,
    yearBuilt,
    epc,
    price,
    transactionType = 'sale',
    detailed = false,
    longitude,
    latitude
  } = params;

  // Validate required parameters
  if (!target) {
    throw new Error('The "target" parameter must be provided');
  }

  // Either postcode or coordinates must be provided
  if (!postcode && !(longitude && latitude)) {
    throw new Error('Either "postcode" or both "longitude" and "latitude" must be provided');
  }

  const api = getApiInstance('property-predictor');
  const endpoint = '/predict/multi-target';

  // Create the payload as specified by the interface
  const payload: Partial<IMultiTargetPredictionRequest> = {
    target,
    propertyType,
    postcode,
    floorArea,
    beds,
    baths,
    condition,
    yearBuilt,
    epc,
    price,
    transactionType,
    detailed,
    longitude,
    latitude
  };

  return await api.post(
    endpoint,
    payload,
    {
      apiKey: initialisedConfig.apiKey
    }
  );
}
