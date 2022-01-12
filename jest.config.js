const { defaults } = require('jest-config');

module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    '!src/**/__tests__/*.{js,jsx,ts,tsx}',
    '!**/*.mock.{js,jsx,ts,tsx}',
  ],
  coverageProvider: 'babel',
  coverageReporters: [
    'json',
    'text-summary',
    'clover',
    'html',
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/jest/file.mock.ts',
    '~(.*)$': '<rootDir>/$1',
  },
  setupFiles: ['<rootDir>/jest/configure.ts'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
};
