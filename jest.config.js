module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ],
  testMatch: [
    '**/tests/**/*.test.ts'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setup.ts'
  ]
};