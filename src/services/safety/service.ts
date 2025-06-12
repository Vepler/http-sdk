import { queryGeographyMetrics } from './routes/query-geography-metrics';
import { getCatalog } from './routes/get-catalog';
import { getCrimeData } from './routes/get-crime-data';
import { getAreaStats } from './routes/get-area-stats';
import { getCategoryStats } from './routes/get-category-stats';
import { getNeighborhoodWatchByLocation } from './routes/get-neighborhood-watch-by-location';
import { getNeighborhoodWatchByArea } from './routes/get-neighborhood-watch-by-area';
import { getNeighborhoodWatchSchemeDetails } from './routes/get-neighborhood-watch-scheme-details';

export default {
  catalog: getCatalog,
  crime: {
    getData: getCrimeData,
    getAreaStats: getAreaStats,
    getCategoryStats: getCategoryStats,
  },
  geography: {
    getMetrics: queryGeographyMetrics,
  },
  neighborhoodWatch: {
    getByLocation: getNeighborhoodWatchByLocation,
    getByArea: getNeighborhoodWatchByArea,
    getSchemeDetails: getNeighborhoodWatchSchemeDetails,
  },
};
