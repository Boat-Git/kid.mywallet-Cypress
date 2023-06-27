const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  env: {
    username: '',
    password: '',
  },
  reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
  },
  e2e: {

    baseUrl: 'https://uat-kid.mywallet.co',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*'],
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
