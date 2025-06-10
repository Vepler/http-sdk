# Vepler HTTP SDK

<div align="center">

[![Build and Test](https://github.com/vepler/http-sdk/actions/workflows/build.yml/badge.svg)](https://github.com/vepler/http-sdk/actions/workflows/build.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vepler_http-sdk&metric=alert_status)](https://sonarcloud.io/dashboard?id=vepler_http-sdk)
[![npm version](https://badge.fury.io/js/%40vepler%2Fhttp-sdk.svg)](https://badge.fury.io/js/%40vepler%2Fhttp-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**The definitive TypeScript SDK for UK property technology**

*Access comprehensive property data, school metrics, demographics, planning applications, and more through a single, powerful API*

[Quick Start](#-quick-start) • [API Reference](#-api-reference) • [Examples](#-what-you-can-build)

</div>

---

## 🚀 Quick Start

Get up and running in under 60 seconds:

```bash
npm install @vepler/http-sdk
```

```typescript
import { initializeSDK, property, schools, areaReference, safety } from '@vepler/http-sdk';

// Initialize once
initializeSDK({ apiKey: 'your-api-key-here' });

// Get property details
const propertyData = await property.getProperty({
  propertyIds: ['12345678'],
  attributes: ['address', 'uprn']
});

// Find nearby schools
const nearbySchools = await schools.getSchools({
  filter: { lat: 51.5074, lng: -0.1278, radius: 1 },
  limit: 10
});

// Discover local areas
const localAreas = await areaReference.within({
  lat: 51.5074, lng: -0.1278, radius: 2,
  type: ['lsoa21', 'msoa21']
});
```

🎯 **Ready to get started?** Contact us for API access and start building immediately.

---

## 📊 What You Can Build

The Vepler SDK powers the next generation of property technology applications:

| **Use Case** | **Services Used** | **Example** |
|-------------|-------------------|-------------|
| 🏠 **Property Search Platforms** | Property + Area Reference + Schools | Build comprehensive property listings with local amenities |
| 📈 **Market Analytics Dashboards** | Demographics + Safety + Property Predictor | Create data-driven investment analysis tools |
| 🏫 **School Catchment Finders** | Schools + Area Reference + Location | Help families find homes near top-rated schools |
| 🏗️ **Planning & Development Tools** | Planning Register + Area Reference + Demographics | Track development opportunities and planning applications |
| 🔍 **Location Intelligence Apps** | POI + Connectivity + Demographics + Safety | Build comprehensive neighbourhood analysis tools |

---

## 🛠 Core Services

### **Property Intelligence**
| Service | Purpose | Key Methods |
|---------|---------|-------------|
| **Property** | Property details, addresses, valuations | `getProperty` `getPropertyById` `queryProperty` |
| **Property Predictor** | AI-powered property valuations | `predictMultiTarget` |
| **Council Tax Register** | Council tax bands and property taxes | `getProperty` |

### **Geographic & Demographic Data**
| Service | Purpose | Key Methods |
|---------|---------|-------------|
| **Area Reference** | Geographic boundaries and area data | `within` `children` `border` `metrics.query` `resolver.resolve` `resolver.getTypes` `resolver.checkCapability` |
| **Demographics** | Population and demographic analysis | `queryDemographics` |
| **Safety** | Crime statistics and safety metrics | `geography.getMetrics` `crime.getData` `neighborhoodWatch.getByLocation` |

### **Education & Amenities**
| Service | Purpose | Key Methods |
|---------|---------|-------------|
| **Schools** | School data, Ofsted ratings, performance | `getSchools` `search` `metrics.get` `autocomplete` |
| **POI** | Points of interest and amenities | `getNearestPoi` |

### **Planning & Infrastructure**
| Service | Purpose | Key Methods |
|---------|---------|-------------|
| **Planning Register** | Planning applications and decisions | `queryApplications` `getApplicationById` |
| **Connectivity** | Internet and infrastructure scores | `getConnectivityScores` |

### **Search & Location**
| Service | Purpose | Key Methods |
|---------|---------|-------------|
| **Search** | Unified search across all data types | `search` |
| **Location** | Address and street autocomplete | `autocompleteLocation` `autocompleteStreet` |

---

## 📋 API Reference

### Property Services

#### **Property Data**
```typescript
// Get property by property ID
const property = await property.getProperty({
  propertyIds: ['12345678', '87654321'],
  attributes: ['address', 'uprn', 'location'],
  includeGeometry: true
});

// Get property by location ID
const propertyByLocation = await property.getPropertyById({
  locationIds: ['loc_123'],
  attributes: ['address', 'price']
});

// Query properties with filters
const properties = await property.queryProperty({
  area: 'E01000001',
  limit: 50
});
```

#### **Property Valuations**
```typescript
// Predict property values using AI
const valuation = await propertyPredictor.predictMultiTarget({
  locationId: 'loc_123',
  propertyType: 'house',
  bedrooms: 3
});
```

### Geographic Services

#### **Area Reference & Boundaries**
```typescript
// Find areas within radius
const areasWithin = await areaReference.within({
  lat: 51.5074, lng: -0.1278, radius: 2,
  type: 'lsoa21'  // or ['lsoa21', 'msoa21', 'county']
});

// Get child areas
const childAreas = await areaReference.children({
  parentAreaId: 'E01000001',
  childType: 'lsoa21'
});

// Find bordering areas
const borderingAreas = await areaReference.border({
  areaId: 'E01000001'
});

// Query area metrics
const areaMetrics = await areaReference.metrics.query({
  metricIds: '1,2,3',
  geographicEntityTypes: 'lsoa21',
  attributes: 'geographicCode,value'
});

// Area type queries
const areasByType = await areaReference.query.byType({
  type: 'county',
  limit: 10
});

// Geographic resolution - resolve input geography to target tiers
const resolution = await areaReference.resolver.resolve({
  inputCode: 'E08000003',
  supportedTiers: 'lsoa21,msoa21',
  maxChildren: 100,
  allowParentFallback: false
});

// Get all supported geography types
const geographyTypes = await areaReference.resolver.getTypes();

// Check if geography can be resolved to target tiers
const capability = await areaReference.resolver.checkCapability({
  inputType: 'msoa21',
  supportedTiers: 'lsoa21',
  includeExplanation: true
});
```

#### **Demographics & Safety**
```typescript
// Get demographic data
const demographics = await rover.queryDemographics({
  geographicEntityIds: ['E01000001'],
  metricIds: ['pop_total', 'age_median']
});

// Crime and safety statistics
const safetyData = await safety.geography.getMetrics({
  geographicCodes: 'E01000001',
  periods: '2023-01,2023-02'
});

// Get crime data
const crimeData = await safety.crime.getData({
  area: 'E01000001',
  dateFrom: '2023-01',
  dateTo: '2023-12'
});

// Neighbourhood watch information
const neighbourhoodWatch = await safety.neighborhoodWatch.getByLocation({
  lat: 51.5074,
  lng: -0.1278,
  radius: 1000
});
```

### Education Services

#### **Schools Data**
```typescript
// Search schools with filters
const schools = await schools.getSchools({
  filter: { 
    lat: 51.5074, lng: -0.1278, radius: 2,
    phase: 'primary',
    ofstedRating: 'outstanding'
  },
  sort: 'ofstedRating',
  limit: 20
});

// Get specific school
const school = await schools.getSchoolById({
  schoolId: 'urn_123456'
});

// School search with text
const schoolSearch = await schools.search({
  query: 'St Mary Primary',
  location: { lat: 51.5074, lng: -0.1278 },
  radius: 5
});

// School metrics
const schoolMetrics = await schools.metrics.get({
  metricIds: ['attainment_ks2', 'progress_score'],
  schoolIds: ['urn_123456']
});

// Geographic school metrics
const geoMetrics = await schools.metrics.geographic({
  geographicEntityIds: ['E01000001'],
  metricIds: ['school_quality_score']
});

// School autocomplete
const suggestions = await schools.autocomplete({
  query: 'St Mary',
  limit: 10
});
```

### Planning & Infrastructure

#### **Planning Applications**
```typescript
// Query planning applications
const applications = await planningRegister.queryApplications({
  geographicEntityIds: ['E01000001'],
  status: 'approved',
  dateFrom: '2023-01-01'
});

// Get specific application
const application = await planningRegister.getApplicationById({
  applicationId: 'app_123456'
});

// Get map tiles for visualisation
const mapTile = await planningRegister.getMapTile({
  z: 12, x: 2048, y: 1365,
  layers: ['applications']
});
```

#### **Connectivity & Infrastructure**
```typescript
// Get connectivity scores
const connectivity = await connectivity.getConnectivityScores({
  geographicEntityIds: ['E01000001'],
  metricIds: ['broadband_speed', 'mobile_coverage']
});

// Find nearest points of interest
const nearestPOIs = await poi.getNearestPoi({
  lat: 51.5074, lng: -0.1278,
  categories: ['transport', 'retail'],
  radius: 1000
});
```

### Search & Location Services

#### **Unified Search**
```typescript
// Search across all data types
const searchResults = await search.search({
  query: 'Manchester',
  types: ['properties', 'schools', 'areas'],
  limit: 20
});
```

#### **Location Services**
```typescript
// Location autocomplete
const locations = await location.autocompleteLocation({
  query: 'Manch',
  limit: 10
});

// Street autocomplete
const streets = await location.autocompleteStreet({
  query: 'High St',
  location: { lat: 51.5074, lng: -0.1278 },
  radius: 5
});
```

---

## 🎨 Advanced Usage Patterns

### Error Handling
```typescript
import { 
  PropbarApiError,
  PropbarTimeoutError,
  PropbarNetworkError,
  PropbarAuthenticationError,
  PropbarValidationError 
} from '@vepler/http-sdk';

try {
  const data = await schools.getSchools({ limit: 50 });
} catch (error) {
  if (error instanceof PropbarTimeoutError) {
    console.error(`Request timed out: ${error.message}`);
    // Implement retry logic
  } else if (error instanceof PropbarAuthenticationError) {
    console.error(`Auth error: ${error.message}`);
    // Refresh API key or redirect to auth
  } else if (error instanceof PropbarValidationError) {
    console.error(`Validation error: ${error.message}`);
    // Fix request parameters
  }
}
```

### Performance Optimisation
```typescript
// Batch requests efficiently
const [properties, schools, areas] = await Promise.all([
  property.getProperty({ propertyIds: ['123'] }),
  schools.getSchools({ filter: { lat: 51.5074, lng: -0.1278, radius: 2 } }),
  areaReference.within({ lat: 51.5074, lng: -0.1278, radius: 2, type: 'lsoa21' })
]);

// Use specific attributes to reduce payload
const lightweightData = await property.getProperty({
  propertyIds: ['123'],
  attributes: ['address', 'uprn'] // Only request needed fields
});

// Implement pagination for large datasets
const getAllSchools = async (location: { lat: number, lng: number }) => {
  let page = 1;
  let allSchools = [];
  
  while (true) {
    const response = await schools.getSchools({
      filter: { ...location, radius: 5 },
      page,
      limit: 100
    });
    
    allSchools.push(...response.results);
    
    if (response.results.length < 100) break;
    page++;
  }
  
  return allSchools;
};
```

### Type Safety Best Practices
```typescript
import type { 
  SchoolsResponse, 
  PropertyEntity,
  GeographicEntity 
} from '@vepler/http-sdk';

// Use proper typing for API responses
const processSchoolData = (schools: SchoolsResponse) => {
  return schools.results.map(school => ({
    name: school.name,
    rating: school.ofstedRating,
    phase: school.phase
  }));
};

// Type-safe parameter building
const buildAreaQuery = (coords: { lat: number, lng: number }) => {
  const areaTypes = ['lsoa21', 'msoa21'] as const;
  
  return areaReference.within({
    ...coords,
    radius: 2,
    type: areaTypes
  });
};
```

---

## 🔧 Configuration & Environment

### Complete Configuration Options
```typescript
initializeSDK({
  apiKey: 'your-api-key',
  
  // Request settings
  timeout: 120000,              // 2 minutes timeout
  retries: 3,                   // Auto-retry failed requests
  
  // Logging
  logLevel: 'debug',            // 'debug' | 'info' | 'warn' | 'error'
  
  // Custom headers
  headers: {
    'User-Agent': 'MyApp/1.0.0',
    'Custom-Header': 'value'
  },
  
  // Service-specific hosts (advanced)
  propertyHost: 'https://custom.propbar.com/property',
  schoolsHost: 'https://custom.propbar.com/schools',
  
  // Environment-specific settings
  rateLimit: {
    requests: 1000,             // Requests per minute
    burst: 50                   // Burst capacity
  }
});
```

### Environment Setup
```typescript
// Development environment (longer timeouts, verbose logging)
initializeSDK({ 
  apiKey: process.env.PROPBAR_DEV_API_KEY,
  logLevel: 'debug',
  timeout: 180000
}, 'development');

// Production environment (optimised settings)
initializeSDK({ 
  apiKey: process.env.PROPBAR_API_KEY,
  logLevel: 'warn',
  timeout: 60000,
  retries: 3
}, 'production');

// Custom middleware
initializeSDK({
  apiKey: 'your-key',
  middleware: [
    // Add request logging
    (request) => {
      console.log(`Making request to: ${request.endpoint}`);
      return request;
    },
    // Add response caching
    (request, response) => {
      cache.set(request.endpoint, response);
      return response;
    }
  ]
});
```

---

## 🧪 Testing & Development

### Mock Implementation for Testing
```typescript
// Jest test example
import { initializeSDK, property } from '@vepler/http-sdk';

// Mock the SDK for testing
jest.mock('@vepler/http-sdk', () => ({
  initializeSDK: jest.fn(),
  property: {
    getProperty: jest.fn()
  }
}));

describe('Property Service', () => {
  beforeEach(() => {
    (property.getProperty as jest.Mock).mockResolvedValue({
      result: [{
        id: '123',
        address: '123 Test Street',
        uprn: 'UPRN123'
      }],
      success: true
    });
  });

  it('should fetch property data', async () => {
    const result = await property.getProperty({
      propertyIds: ['123']
    });
    
    expect(result.success).toBe(true);
    expect(result.result[0].address).toBe('123 Test Street');
  });
});
```

### Development Commands
```bash
# Install dependencies
npm install

# Run tests
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report

# Code quality
npm run lint               # Check code style
npm run lint:fix           # Fix auto-fixable issues
npm run format             # Format code with Prettier

# Build
npm run build              # Compile TypeScript
npm run build:watch        # Watch mode compilation
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs", 
    "lib": ["ES2020"],
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## 📚 Resources

### Documentation & Guides
- 📖 Complete API documentation available in this README
- 🎯 Quick start guide provided above
- 💡 Use case examples included in this documentation
- 🔧 All configuration options documented below

### Community & Support
- 🐛 [Bug Reports](https://github.com/vepler/http-sdk/issues)
- 📧 Contact support for technical assistance
- 💡 Community discussions welcome in GitHub issues
- 🚀 Feature requests via GitHub issues

### Legal & Security
- 🔒 [Security Policy](SECURITY.md)
- ⚖️ [MIT License](LICENSE)
- 🛡️ Security vulnerabilities can be reported via [SECURITY.md](SECURITY.md)
- 📋 Terms and privacy policies available upon request

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `npm test`
5. Submit a pull request

---

## 📊 Compatibility & Requirements

| **Requirement** | **Version** |
|----------------|-------------|
| **Node.js** | ≥ 20.x |
| **TypeScript** | ≥ 4.1.x |
| **Browsers** | Modern browsers via bundlers |

### Framework Support
✅ **React** • ✅ **Vue** • ✅ **Angular** • ✅ **Svelte** • ✅ **Next.js** • ✅ **Nuxt** • ✅ **Express** • ✅ **Fastify**

---

<div align="center">

**Built with ❤️ by [Vepler](https://vepler.com)**

*Powering the future of property technology*

</div>