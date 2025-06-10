# Pull Request

## Description

<!-- Describe the purpose of this PR along with any background information and the impacts of the proposed change. For UI changes, please include screenshots. -->

### Type of Change
<!-- Mark the relevant option with an "x" -->

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring
- [ ] Dependency update
- [ ] Test improvements
- [ ] Other (please describe):

## Changes Made

<!-- Provide a detailed list of changes made in this PR -->

- 
- 
- 

## Vepler Property Ecosystem Impact

<!-- Describe how this change affects the Vepler property ecosystem -->

### Services Affected
<!-- Mark the relevant services with an "x" -->

- [ ] Property Data
- [ ] Safety (Crime Data)
- [ ] Schools
- [ ] Area Reference
- [ ] Planning Register
- [ ] Demographics
- [ ] Location/Address Lookup
- [ ] Property Predictor
- [ ] Connectivity
- [ ] POI (Points of Interest)
- [ ] Council Tax Register
- [ ] Search
- [ ] SDK Core/Configuration

### PropTech Use Cases
<!-- Describe how this change benefits PropTech developers using the Vepler ecosystem -->

- Property platforms:
- Estate agents:
- Landlords/investors:
- Other:

## Testing

<!-- Describe how this can be tested by reviewers. Include details of your testing environment, and the tests you ran to see how your change affects other areas of the code, etc. -->

### Test Coverage
- [ ] This change adds test coverage for new functionality
- [ ] This change maintains existing test coverage
- [ ] Tests pass locally with `npm test`
- [ ] TypeScript compilation succeeds with `npm run build`

### Manual Testing Steps
1. 
2. 
3. 

### Property Data Testing
<!-- If applicable, describe how property data was tested -->
- [ ] Tested with realistic property data (anonymised)
- [ ] Verified UPRN handling
- [ ] Tested UK postcode validation
- [ ] Confirmed geographic code handling

## Related Issues

<!-- Link any related issues here -->
- Closes #
- Relates to #
- Fixes #

## Checklist

<!-- Mark completed items with an "x" -->

### Code Quality
- [ ] My code follows the Vepler TypeScript style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new TypeScript errors or warnings
- [ ] I have run `npm run lint` and addressed any issues
- [ ] I have run `npm run format` to ensure consistent formatting

### Documentation
- [ ] I have made corresponding changes to the documentation
- [ ] I have updated README.md if needed
- [ ] I have added/updated JSDoc comments for public APIs
- [ ] I have updated type definitions for new functionality

### Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested the change in a realistic PropTech development scenario
- [ ] I have considered edge cases and error scenarios

### Security & Privacy
- [ ] This change does not expose sensitive property data
- [ ] API keys and credentials are not logged or exposed
- [ ] I have followed data privacy best practices
- [ ] Rate limiting considerations have been addressed

### Compatibility
- [ ] This change maintains backward compatibility (or is marked as breaking)
- [ ] I have considered the impact on existing PropTech applications
- [ ] Dependencies are compatible with Node.js >=20.0.0
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)

<!-- Add screenshots to help explain your changes -->

## Breaking Changes

<!-- If this is a breaking change, describe what developers need to do to migrate -->

### Migration Guide
```typescript
// Before
// Previous API usage

// After  
// New API usage
```

## Performance Impact

<!-- Describe any performance implications -->

- [ ] No performance impact
- [ ] Improves performance
- [ ] May impact performance (explain below)

<!-- If performance impact, please explain -->

## Additional Notes

<!-- Add any other notes about the PR here -->

---

### Reviewer Guidelines

When reviewing this PR, please consider:

1. **PropTech Impact**: How does this change benefit UK property technology developers?
2. **Type Safety**: Are TypeScript types comprehensive and accurate?
3. **API Design**: Is the API intuitive for property developers?
4. **Documentation**: Is the change well-documented for PropTech use cases?
5. **Testing**: Are property-specific scenarios adequately tested?
6. **Performance**: Will this scale well for property data applications?