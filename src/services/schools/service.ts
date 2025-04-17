import { getSchools } from './routes/get-schools';
import { getSchoolById } from './routes/get-school-by-id';
import { searchSchools } from './routes/search-schools';
import { autocompleteSchools } from './routes/autocomplete-schools';
import { getMetrics } from './routes/get-metrics';
import { getGeographicMetrics } from './routes/get-geographic-metrics';

export default {
  getSchools,
  getSchoolById,
  search: searchSchools,
  metrics: {
    get: getMetrics,
    geographic: getGeographicMetrics
  },
  autocomplete: autocompleteSchools
}