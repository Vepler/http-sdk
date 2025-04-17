# Vepler HTTP SDK Development Guidelines

## Build & Development Commands
- Build: `npm run build`
- Lint: `npm run lint` (fix with `npm run lint:fix`)
- Format: `npm run format`
- Test all: `npm run test`
- Test single file: `npx jest tests/units/filename.test.ts`
- Test watch mode: `npm run test:watch`
- Test coverage: `npm run test:coverage`

## Code Style Guidelines
- Use **TypeScript** with strict type checking
- **Naming**: camelCase for variables/functions, PascalCase for classes/interfaces
- **Imports**: group and sort imports by external/internal
- **Error handling**: throw errors with clear messages, proper type definitions
- **Formatting**: 
  - Single quotes for strings
  - Semicolons required
  - Trailing commas in ES5 mode
- Avoid using `any` type (only in tests when necessary)
- Use interfaces for object type definitions
- Follow existing service/routes architecture pattern