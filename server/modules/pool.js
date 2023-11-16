const pg = require('pg')

let databaseName = 'weekend-to-do-app'

if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
          rejectUnauthorized: false
      }
  });
}
else{
const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: databaseName,
    allowExitOnIdle: true 
})}

module.exports = pool
