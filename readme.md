# Vepler HTTP SDK

[![Build and Test](https://github.com/vepler/http-sdk/actions/workflows/build.yml/badge.svg)](https://github.com/vepler/http-sdk/actions/workflows/build.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vepler_http-sdk&metric=alert_status)](https://sonarcloud.io/dashboard?id=vepler_http-sdk)
[![npm version](https://badge.fury.io/js/%40vepler%2Fhttp-sdk.svg)](https://badge.fury.io/js/%40vepler%2Fhttp-sdk)

The Vepler HTTP SDK provides a simple interface to interact with Propbar API services.

## Installation

```bash
npm install @vepler/http-sdk
```

Or with yarn:

```bash
yarn add @vepler/http-sdk
```

## Usage

```typescript
import { initializeSDK, property, areaReference } from '@vepler/http-sdk';

// Initialise the SDK first
initializeSDK({
  apiKey: 'your-api-key',
  // Optional configuration
  timeout: 120000, // Default: 60000ms (60 seconds)
  logLevel: 'debug' // Default: 'info'
});

// Example: Get property by ID
const propertyData = await property.getById({
  locationIds: ['123456'],
  attributes: ['address', 'price']
});

// Example: Find areas within a location (single type)
const response = await areaReference.within({
  lat: 51.5074,
  lng: -0.1278,
  radius: 2,
  type: 'lsoa21'
});
// Result format: { results: AreaResult[] }

// Example: Find multiple area types using a comma-separated string
const multipleAreas1 = await areaReference.within({
  lat: 51.5074,
  lng: -0.1278,
  radius: 5,
  type: 'lsoa21,msoa21,county'
});

// Example: Find multiple area types using an array (more convenient in code)
const multipleAreas2 = await areaReference.within({
  lat: 51.5074,
  lng: -0.1278,
  radius: 5,
  type: ['lsoa21', 'msoa21', 'county'] // Array is automatically joined with commas
});

// Results will include items of all the requested types
// You can filter by type if needed: 
const lsoaResults = multipleAreas1.results.filter(item => item.type === 'lsoa21');
const msoa21Results = multipleAreas1.results.filter(item => item.type === 'msoa21');

// Example: Query metrics 
const metrics = await areaReference.metrics.query({
  metricIds: '1',
  geographicEntityTypes: 'lsoa21',
  attributes: 'geographicCode',
});
```

## Error Handling

The SDK provides detailed error classes to make handling API errors easier:

```typescript
import { 
  initializeSDK, 
  PropbarApiError,
  PropbarTimeoutError,
  PropbarNetworkError, 
  PropbarAuthenticationError,
  PropbarValidationError 
} from '@vepler/http-sdk';

try {
  const metrics = await areaReference.metrics.query({
    metricIds: '1',
    geographicEntityTypes: 'lsoa21',
    attributes: 'geographicCode',
  });
} catch (error) {
  if (error instanceof PropbarTimeoutError) {
    console.error(`Request timed out after ${error.timeout}ms: ${error.message}`);
    // Handle timeout, maybe retry
  } else if (error instanceof PropbarNetworkError) {
    console.error(`Network error: ${error.message}`);
    // Handle network issues
  } else if (error instanceof PropbarAuthenticationError) {
    console.error(`Authentication error: ${error.message}`);
    // Handle auth issues
  } else if (error instanceof PropbarValidationError) {
    console.error(`Validation error: ${error.message}`);
    // Handle validation issues
  } else if (error instanceof PropbarApiError) {
    console.error(`API error: ${error.message}`);
    // Handle general API errors
  } else {
    console.error(`Unknown error: ${error.message}`);
  }
}
```

Each error includes:

- Clear error message
- Endpoint where the error occurred
- Parameters used in the request
- HTTP status code (when available)
- Original error object for debugging

## Configuration

You can customise the SDK with these options:

```typescript
initializeSDK({
  apiKey: 'your-api-key',
  timeout: 120000, // Request timeout in milliseconds (default is 60000ms/60s)
  logLevel: 'debug', // Log level (debug, info, warn, error)
  propertyHost: 'https://custom-api-host.com/property', // Override default API host
  areaReferenceHost: 'https://custom-api-host.com/area-reference', // Override default API host
  headers: { // Custom headers to include in all requests
    'Custom-Header': 'value'
  }
});
```

## Environment

The SDK supports both production and development environments:

```typescript
// Use development environment (longer timeouts, more debugging)
initializeSDK({ apiKey: 'your-api-key' }, 'development');

// Use production environment (default)
initializeSDK({ apiKey: 'your-api-key' }, 'production');
```

## Development

### Setup
```bash
# Install dependencies
yarn install
```

### Testing
```bash
# Run tests
yarn test

# Run tests with coverage
yarn test:coverage
```

### Building
```bash
# Build the package
yarn build
```

### Linting and Formatting
```bash
# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## Compatibility

- Node.js: 20.x or later recommended
- TypeScript: 4.1.x or later
- Browsers via bundlers (webpack, rollup, etc.)

## Security

Please see [SECURITY.md](SECURITY.md) for details on our security policy and how to report vulnerabilities.

## License

MIT