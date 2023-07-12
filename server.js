const express = require("express");
const db = require("./db");
const app = express();
const port = 8081;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET
app.get("/users", async (req, res) => {
  try {
    const result = await db.pool.query("select * from users");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// POST
app.post("/users", async (req, res) => {
  let task = req.body;
  try {
    const result = await db.pool.query(
      "insert into users (description) values (?)",
      [task.description]
    );
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.put("/users", async (req, res) => {
  let task = req.body;
  try {
    const result = await db.pool.query(
      "update users set description = ?, completed = ? where id = ?",
      [task.description, task.completed, task.id]
    );
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.delete("/users", async (req, res) => {
  let id = req.query.id;
  try {
    const result = await db.pool.query("delete from users where id = ?", [id]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
