DROP TABLE IF EXISTS "todos";

CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"text" TEXT,
	"isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todos"
  ("text")
  VALUES 
  ('Build a CRUD app'),
  ('Make my app look nice');
  
 ALTER TABLE "todos"
 ADD "completedAt" TIMESTAMP;
 
 UPDATE "todos"
 SET "completedAt" = CURRENT_TIMESTAMP
 WHERE "id" = 7;