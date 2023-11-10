const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(express.static('server/public'));
const pg = require('pg');

const pool = new pg.Pool({
    // Need to know the hostname, the port, and
    // the database name:
    hostname: 'Localhost',
    port: 5432,
    database: 'jazzy_sql'
  })


app.get('/songs', (req, res) => {
    const sqlQueryText = `
      SELECT * FROM "songs"
        ORDER BY "released";
    `
  
    pool.query(sqlQueryText)
      .then((dbResult) => {
        console.log('dbResult.rows:', dbResult.rows)
        res.send(dbResult.rows)
      })
      .catch((dbError) => {
        res.sendStatus(500)
      })
  
  });

app.get('/artists', (req, res) => {
    const sqlQueryText = `
      SELECT * FROM "artists"
        ORDER BY "birthdate";
    `
      pool.query(sqlQueryText)
      .then((dbResult) => {
        console.log('dbResult.rows:', dbResult.rows)
        res.send(dbResult.rows)
      })
      .catch((dbError) => {
        res.sendStatus(500)
      })
  
  });

app.post('/songs', (req, res) => {
    console.log('POST /songs got a request, here is req.body:')
    console.log(req.body)
    const sqlQueryText = `
      INSERT INTO "songs"
        ("title", "length", "released")
        VALUES
        ($1, $2, $3);
    `
    const sqlValues = [
      req.body.title,
      req.body.length,
      req.body.released,

    ]
    pool.query(sqlQueryText, sqlValues)
      .then((dbResult) => {
        res.sendStatus(201)
      })
      .catch((dbError) => {
        console.log('POST /songs SQL query failed:', dbError)
        res.sendStatus(500)
      })})

// app.get('/songs', (req, res) => {
//     console.log(`In /songs GET`);
//     res.send(songList);
// });

// app.post('/songs', (req, res) => {
//     console.log(`In /songs POST with`, req.body);
//     songList.push(req.body);
//     res.sendStatus(201);
// });

app.post('/artists', (req, res) => {
    console.log('POST /artists got a request, here is req.body:')
    console.log(req.body)
    const sqlQueryText = `
      INSERT INTO "artists"
        ("name", "birthdate")
        VALUES
        ($1, $2);
    `
    const sqlValues = [
      req.body.name,
      req.body.birthdate,
    ]
    pool.query(sqlQueryText, sqlValues)
      .then((dbResult) => {
        res.sendStatus(201)
      })
      .catch((dbError) => {
        console.log('POST /songs SQL query failed:', dbError)
        res.sendStatus(500)
      })})

app.listen(PORT, () => {
  console.log('listening on port', PORT)
});
