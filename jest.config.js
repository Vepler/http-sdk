module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/**/*.ts',
    'tests/**/*.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: { },
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'tests',
    '<rootDir>/src/index.ts',
    '<rootDir>/tests',
  ],
  testMatch: ['**/*.test.ts'],
};
