/* eslint-disable */
// Had to disable because I couldn't find a way to make EsLint understand Cypress. Will look more into it later.

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
});
