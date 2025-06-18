import { getNearestPoi } from './routes/get-nearest-poi';
import { getPoiTiles } from './routes/get-poi-tiles';

export default {
  nearest: getNearestPoi,
  tiles: getPoiTiles,
};
