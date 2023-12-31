const router = require('express').Router();
const { response } = require('express');
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const sqlQueryText = `
      SELECT "id", "text", "isComplete", "completedAt" FROM "todos"
        ORDER BY "isComplete";
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

router.put('/:id', (req,res) => {
  let idOfToDo = req.params.id;
  // console.log(idOfToDo);
  console.log(req.body);
  const sqlText = `
    UPDATE "todos"
      SET "isComplete" = True, "completedAt" = CURRENT_TIMESTAMP 
      WHERE "id" = $1;`
  const sqlValues = [idOfToDo]
    pool.query(sqlText, sqlValues) 
      .then((dbResult) => {
        res.sendStatus(200)
      })
      .catch((dbError) => {
        console.log('PUT /todos/:id failed', dbError);
        res.sendStatus(500)
      })
})

router.delete('/:id', (req,res) => {
  let idOfToDoToDelete = req.params.id;
  const sqlText = `
    DELETE FROM "todos"
    WHERE "id" = $1;`
  const sqlValues = [idOfToDoToDelete]
    pool.query(sqlText,sqlValues)
      .then ((dbResult) => {
        res.sendStatus(200)
      })
      .catch((dbError) => {
        console.log('DELETE /todos/:id failed:', dbError);
        res.sendStatus(500);
      })
})

module.exports = router;
