const { defineConfig } = require("cypress");
const { resetTestDatabase, executeSqlFile } = require('./cypress/__utils__/db-setup.js')


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:run', async (details) => {
        await resetTestDatabase()
        await executeSqlFile('database.sql')
      })
      on('after:run', async (results) => {
        // results will look something like this when run via `cypress run`:
        // {
        //   totalDuration: 81,
        //   totalSuites: 0,
        //   totalTests: 1,
        //   totalFailed: 0,
        //   totalPassed: 1,
        //   totalPending: 0,
        //   totalSkipped: 0,
        //   browserName: 'electron',
        //   browserVersion: '59.0.3071.115',
        //   osName: 'darwin',
        //   osVersion: '16.7.0',
        //   cypressVersion: '3.1.0',
        //   config: {
        //     projectId: '1qv3w7',
        //     baseUrl: 'http://example.com',
        //     viewportWidth: 1000,
        //     viewportHeight: 660,
        //     // ... more properties...
        //   }
        //   // ... more properties...
        //   }
        // }
        if (results) {
          // results will be undefined in interactive mode
          console.log(
            results.totalPassed,
            'out of',
            results.totalTests,
            'passed'
          )
        }
      })
    },
    baseUrl: 'http://localhost:5002',
  }
});
