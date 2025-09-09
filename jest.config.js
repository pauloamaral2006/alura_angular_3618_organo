module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/",
  },
  transform: {
    "^.+\\.(ts|mjs|js|html)$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
};
