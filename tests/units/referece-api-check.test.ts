import {  initializeSDK } from '../../src/config';
import { getAreas } from '../../src/services/area-reference/routes/get-areas';

describe('validateAPIAccess', () => {
  beforeAll(() => {
    initializeSDK({
      apiKey: process.env.ADMIN_API_KEY
    });
  })

  it('Area Reference Result', async () => {
    const test = await getAreas({
        field: 'lsoa21',
        ids: ['E01000001'],
      });
  });
});
