import { getApiInstance, initialisedConfig } from '../../../config';
import { 
  PredictionInput,
  PredictionResponse 
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
export async function predictMultiTarget(params: PredictionInput): Promise<PredictionResponse> {
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

  // Create the payload
  const payload = {
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

  // Remove undefined values from payload
  Object.keys(payload).forEach(key => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  return await api.query(
    endpoint,
    {}, // Empty query parameters since we're using POST
    {
      apiKey: initialisedConfig.apiKey,
      method: 'POST',
      body: payload
    }
  );
}