const pg = require('pg')

let databaseName = 'weekend_to_do_app_yge2'
let pool;

if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
          rejectUnauthorized: false
      }
  });
}
else{
pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: databaseName,
    allowExitOnIdle: true 
})}

module.exports = pool
