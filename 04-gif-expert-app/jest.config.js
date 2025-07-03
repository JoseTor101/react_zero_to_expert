export default {
  setupFiles: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
  "\\.(css|less|scss|sass)$": "<rootDir>/tests/__mocks__/styleMock.js"
},
};
