import { getAreas } from './routes/get-areas';
import { queryMetrics } from './routes/query-metrics';
import { withinAreas } from './routes/within-areas';
import { getChildAreas } from './routes/get-child-areas';
import { queryByType } from './routes/query-by-type';
import { borderAreas } from './routes/border-areas';
import { coverage } from './routes/coverage';
import {
  resolveGeography,
  getGeographyTypes,
  checkResolutionCapability,
} from './routes/resolve-geography';

export default {
  get: getAreas,
  within: withinAreas,
  children: getChildAreas,
  border: borderAreas,
  coverage,
  metrics: {
    query: queryMetrics,
  },
  query: {
    byType: queryByType,
  },
  resolver: {
    resolve: resolveGeography,
    getTypes: getGeographyTypes,
    checkCapability: checkResolutionCapability,
  },
};
