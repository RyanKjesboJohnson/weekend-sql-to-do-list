const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

const TEST_DB_NAME = 'prime_testing'

const POSTGRES_INSTANCE = {
  host: 'localhost',
  port: 5432,
}

const TESTING_INSTANCE = {
  host: 'localhost',
  port: 5432,
  database: TEST_DB_NAME
}


async function resetTestDatabase() {
  const client = new Client(POSTGRES_INSTANCE);
  await client.connect();
  
  try {
    await client.query(`DROP DATABASE IF EXISTS ${TEST_DB_NAME} WITH (FORCE);`)
    await client.query(`CREATE DATABASE ${TEST_DB_NAME};`)
    await client.end()
    return Promise.resolve({
      outcome: 'resetTestDatabase success'
    })
  } catch (err) {
    console.error(`Failed to reset ${TEST_DB_NAME}:`, err)
    await client.end();
    return Promise.reject({
      outcome: 'resetTestDatabase fail',
      message: err
    })
  }
}

async function executeSqlFile(filename) {
  const filepath = path.resolve(__dirname, `../../${filename}`)
  console.info(filepath)
  const sqlFile = fs.readFileSync(filepath, 'utf8');

  const client = new Client(TESTING_INSTANCE);

  await client.connect();
  
  try {
    const res = await client.query(sqlFile)
    await client.end();
    return Promise.resolve({
      outcome: 'executeSqlFile success'
    })
  } catch (err) {
    console.error(`Failed to execute ${filename}:`, err)
    await client.end();
    return Promise.reject({
      outcome: 'executeSqlFile fail',
      message: err
    })
  }
}


module.exports = { resetTestDatabase, executeSqlFile }
