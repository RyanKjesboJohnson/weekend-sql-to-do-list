const router = require('express').Router();
const { response } = require('express');
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const sqlQueryText = `
      SELECT "id", "text", "isComplete" FROM "todos"
        ORDER BY "id";
    `
  
    // Now how do we mail this SQL query to the db?
    pool.query(sqlQueryText)
      .then((dbResult) => {
        console.log('dbResult.rows:', dbResult.rows)
        res.send(dbResult.rows)
      })
      .catch((dbError) => {
        res.sendStatus(500)
      })});

router.post('/', (req, res) => {
    console.log("POST /todos got a post request");
    console.log(req.body);
    const sqlQueryText = `
        INSERT INTO "todos"
            ("text")
            VALUES
            ($1)
        `
    const sqlValues = [
        req.body.text
    ]

    pool.query(sqlQueryText, sqlValues)
    .then ((dbresult) => {
        res.sendStatus(201)
    })
    .catch((dbError) => {
        console.log('POST /todos SQL query failed', dbError)
        res.sendStatus(500)
    })
})
module.exports = router;
