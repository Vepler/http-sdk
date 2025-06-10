# Contributing to Vepler HTTP SDK

Thank you for your interest in contributing to the Vepler HTTP SDK! This guide will help you get started with contributing to our UK PropTech library.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies: `npm install`
4. **Create** a feature branch: `git checkout -b feature/amazing-feature`
5. **Make** your changes
6. **Test** your changes: `npm test`
7. **Submit** a pull request

## 📋 Development Setup

### Prerequisites

- **Node.js** ≥ 20.0.0
- **npm** or **yarn**
- **TypeScript** ≥ 4.1.x

### Installation

```bash
# Clone your fork
git clone https://github.com/your-username/http-sdk.git
cd http-sdk

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## 🏗️ Project Structure

```
src/
├── config.ts                  # SDK configuration
├── index.ts                   # Main exports
├── services/                  # Service modules
│   ├── property/             # Property data services
│   ├── safety/               # Crime and safety data
│   ├── schools/              # Education data
│   ├── area-reference/       # Geographic boundaries
│   └── ...                   # Other services
└── types.ts                  # Shared types

tests/
└── units/                    # Unit tests
```

## 🎯 PropTech-Specific Guidelines

### Working with Property Data

- **Privacy First**: Never log or expose sensitive property information
- **Rate Limiting**: Be mindful of API rate limits in examples and tests
- **Data Validation**: Always validate property data with TypeScript types
- **UPRN Handling**: Follow best practices for UPRN (Unique Property Reference Number) usage

### UK-Specific Considerations

- **Geographic Codes**: Use official ONS geographic codes (E01000001, etc.)
- **Postcode Format**: Follow UK postcode validation patterns
- **School Data**: Use official URN (Unique Reference Number) identifiers
- **Planning Applications**: Follow local authority application ID formats

## 📝 Code Style Guidelines

### TypeScript Standards

- **Strict Mode**: All code must compile with TypeScript strict mode
- **Type Safety**: Avoid `any` types - use proper interfaces and types
- **Naming**: Use camelCase for variables/functions, PascalCase for classes/interfaces
- **Imports**: Group and sort imports (external libraries first, then internal)

### Code Formatting

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Example Code Style

```typescript
// ✅ Good
import { GetPropertyParams, PropertyResponse } from '@vepler/property-types';

interface ServiceConfig {
  apiKey: string;
  timeout?: number;
}

export const getProperty = async (params: GetPropertyParams): Promise<PropertyResponse> => {
  // Implementation
};

// ❌ Bad
import * as types from '@vepler/property-types'

interface config {
  apiKey: any;
  timeout: any;
}

export const getProperty = (params: any) => {
  // Implementation
}
```

## 🧪 Testing Guidelines

### Writing Tests

- **Unit Tests**: Test individual functions and methods
- **Integration Tests**: Test service interactions
- **Mock External APIs**: Always mock external API calls
- **Property Data**: Use realistic but anonymised test data

### Test Structure

```typescript
import { initializeSDK, property, reset } from '../../src';

describe('Property Service', () => {
  beforeEach(() => {
    initializeSDK({ apiKey: 'test-api-key' });
  });

  afterEach(() => {
    reset();
    jest.clearAllMocks();
  });

  it('should fetch property data with valid UPRN', async () => {
    // Test implementation
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npx jest tests/units/property-api-check.test.ts

# Generate coverage report
npm run test:coverage
```

## 📚 Documentation

### Code Documentation

- **JSDoc Comments**: Document all public methods and interfaces
- **README Updates**: Update README.md for new features
- **Type Definitions**: Export types for external use

### Example Documentation

```typescript
/**
 * Retrieves property information by UPRN
 * @param params - Property query parameters
 * @param params.uprn - Unique Property Reference Number
 * @param params.attributes - Optional array of attributes to return
 * @returns Promise containing property data
 * @example
 * ```typescript
 * const property = await getProperty({
 *   uprn: '12345678',
 *   attributes: ['address', 'location']
 * });
 * ```
 */
export const getProperty = async (params: GetPropertyParams): Promise<PropertyResponse> => {
  // Implementation
};
```

## 🔧 Adding New Services

### Service Structure

When adding a new PropTech service:

1. **Create Service Directory**: `src/services/your-service/`
2. **Add Route Files**: Individual endpoint implementations
3. **Create Service File**: Main service export
4. **Update Config**: Add service configuration
5. **Export Types**: Add TypeScript type exports
6. **Write Tests**: Comprehensive test coverage
7. **Update Documentation**: README and examples

### Example Service

```typescript
// src/services/your-service/routes/get-data.ts
import { getApiInstance } from '../../../config';

export const getData = async (params: GetDataParams): Promise<GetDataResponse> => {
  const apiInstance = getApiInstance('your-service');
  return apiInstance.get('/data', { params });
};

// src/services/your-service/service.ts
import { getData } from './routes/get-data';

export default {
  getData
};
```

## 🚦 Pull Request Process

### Before Submitting

- [ ] Code compiles without errors: `npm run build`
- [ ] All tests pass: `npm test`
- [ ] Code is properly formatted: `npm run format`
- [ ] No linting errors: `npm run lint`
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated (if applicable)

### Pull Request Template

Please fill out the pull request template completely, including:

- **Description** of changes
- **Type of change** (bug fix, feature, etc.)
- **Testing** performed
- **Screenshots** (if UI changes)
- **Related issues**

### Review Process

1. **Automated Checks**: CI/CD pipeline runs automatically
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

## 🐛 Reporting Issues

### Before Reporting

- Search existing issues first
- Check if it's already fixed in the latest version
- Gather reproduction steps and environment details

### Issue Types

- **🐛 Bug Report**: Something isn't working correctly
- **✨ Feature Request**: Suggest new functionality
- **❓ Question**: Ask for help or clarification
- **📚 Documentation**: Improve or fix documentation

## 🌟 Recognition

Contributors are recognised in:

- **CHANGELOG.md**: Major contributions noted in release notes
- **GitHub Contributors**: Automatic recognition on repository
- **Community**: Highlighted in community discussions

## 📞 Getting Help

- **GitHub Issues**: General questions and bug reports
- **GitHub Discussions**: Community discussions and ideas
- **Documentation**: Check README.md and code comments

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

**Happy Contributing!** 🎉

Thank you for helping make UK PropTech development better for everyone.