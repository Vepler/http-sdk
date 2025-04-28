import { getSchools } from './routes/get-schools';
import { getSchoolById, GetSchoolByIdParams } from './routes/get-school-by-id';
import { searchSchools } from './routes/search-schools';
import { autocompleteSchools } from './routes/autocomplete-schools';
import { getMetrics } from './routes/get-metrics';
import { getGeographicMetrics } from './routes/get-geographic-metrics';
import { getTimeSeriesMetrics } from './routes/get-timeseries-metrics';

// Re-export types
export { GetSchoolByIdParams };

export default {
  getSchools,
  getSchoolById,
  search: searchSchools,
  metrics: {
    get: getMetrics,
    timeSeries: getTimeSeriesMetrics,
    geographic: getGeographicMetrics
  },
  autocomplete: autocompleteSchools
}