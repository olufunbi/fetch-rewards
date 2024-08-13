const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  viewportHeight: 660,
  viewportWidth: 1000,
  watchForFileChanges: false,
  defaultCommandTimeout: 30000,
  videosFolder: 'reports/e2e/videos',
  videoUploadOnPasses: false,
  screenshotsFolder: 'reports/e2e/screenshots',
  chromeWebSecurity: false,
  video: false,
  scrollBehavior: false,
  retries: {
    runMode: 0,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
      return config
    },
    specPattern: 'cypress/e2e/**/*.{feature,features}',
    baseUrl: 'http://sdetchallenge.fetch.com',
  },
});
