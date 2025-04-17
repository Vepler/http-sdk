import {  initializeSDK } from '../../src/config';
import propertyAPI from '../../src/services/property/service';

describe('Validate Property API', () => {
  beforeAll(() => {
    initializeSDK({
      apiKey: process.env.ADMIN_API_KEY
    });
  })

  it('Fetch Property', async () => {
    const result = await propertyAPI.getProperty({
      propertyIds: ['SDl0M2Fjbk45c3Zac0hGbmtLQ0dqdz09'],
      attributes: ['locationId']
    });

    // Add proper validation
    expect(result).toBeDefined();
    if (result) {
      console.log(result);
    }
  });

  // it('Area Reference Result', async () => {
  //   const result = await propertyAPI.getPropertyById({
  //     locationIds: ['SDl0M2Fjbk45c3Zac0hGbmtLQ0dqdz09'],
  //   });
  //
  //   console.log(result);
  // });

});
