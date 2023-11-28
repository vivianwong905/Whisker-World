/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,
    
    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: ['<rootDir>/mocks/prismaMock.js'],

    // handles images
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|svg)$": "<rootDir>/mocks/fileMock.js",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },

    //handles msw for mocking the api response
    testEnvironmentOptions: {
        customExportConditions: [''],
      },
      //set up for msw text encoder error
      setupFiles: ['./jest.pollyfills.js'],

      modulePathIgnorePatterns: ["<rootDir>/client/__tests__/utils.js"]
}