export default {
  preset: 'ts-jest',
  bail: true,
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  clearMocks: true,
  testEnvironment: 'node',
  coverageProvider: 'v8',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'html', 'lcov', 'text'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  detectOpenHandles: false
}
