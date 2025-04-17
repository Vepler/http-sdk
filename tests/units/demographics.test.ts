import { initializeSDK } from '../../src/config';
import demographics from '../../src/services/demographics/service';

describe('Validate Demographics API', () => {
  beforeAll(() => {
    initializeSDK({
      apiKey: process.env.ADMIN_API_KEY
    });
  })

  it('Fetch Demographics Data', async () => {
    const result = await demographics.query({
      geography_type: 'lsoa',
      geography_codes: 'E01000001,E01000002',
      topics: 'ageBands,ethnicGroup',
      include_metadata: true
    });

    // Add proper validation
    expect(result).toBeDefined();
    if (result) {
      console.log(result);
    }
  });
});
