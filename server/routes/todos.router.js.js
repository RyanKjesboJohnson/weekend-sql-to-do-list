const router = require('express').Router();
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


module.exports = router;
