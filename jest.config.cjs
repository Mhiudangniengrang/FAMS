// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/../src/$1",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/fileMock.js"
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  detectOpenHandles: true,
};
