const fs = require("fs");
const tsconfigText = fs.readFileSync("./tsconfig.json", "utf-8");
// Remove comentários simples e de bloco
const tsconfigJson = tsconfigText.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
const { compilerOptions } = JSON.parse(tsconfigJson);

const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/",
  },
  transform: {
    "^.+\\.(css|scss|sass|less)$": "jest-transform-stub", // mock de estilos
    "^.+\\.html$": "jest-transform-stub", // mock de templates
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
};
