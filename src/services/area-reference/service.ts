import { getAreas } from './routes/get-areas';
import { queryMetrics } from './routes/query-metrics';
import { withinAreas } from './routes/within-areas';
import { getAutocomplete } from './routes/get-autocomplete';
import { getChildAreas } from './routes/get-child-areas';
import { queryByType } from './routes/query-by-type';
import { borderAreas } from './routes/border-areas';

export default {
  get: getAreas,
  within: withinAreas,
  children: getChildAreas,
  border: borderAreas,
  metrics: {
    query: queryMetrics
  },
  locations: {
    autocomplete: getAutocomplete
  },
  query: {
    byType: queryByType
  }
}
