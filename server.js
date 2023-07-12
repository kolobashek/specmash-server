const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");

const app = express();
const port = 8081;

// Добавим body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Инициализируем passport
app.use(passport.initialize());
app.use(passport.session());

// Определим стратегию LocalStrategy
passport.use(
  new LocalStrategy(function (username, password, done) {
    // ...
  })
);

function authenticateToken(req, res, next) {
  // проверка токена
  if (!valid) {
    return res.status(401).json({ error: "Неавторизованный запрос" });
  }
  next();
}

// GET
app.get("/users", authenticateToken, async (req, res) => {
  try {
    const result = await db.pool.query("select * from users");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// Добавление пользователя
app.put("/users", async (req, res) => {
  const sql = "INSERT INTO users SET ?";
  try {
    await db.pool.query(sql, [req.body]);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// обновление пользователя в БД
app.put("/users/:id", async (req, res) => {
  // обновление пользователя в БД
});

// Удаление пользователя
app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";
  try {
    await db.pool.query(sql, [userId]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Роут для активации/деактивации пользователя (поле isactive):
app.patch("/users/:id/activate", async (req, res) => {
  // изменение isactive
});

app.post("/register", passport.authenticate("local"), (req, res) => {
  // регистрация и выдача JWT
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  // выдача токена
});

app.listen(port, () => console.log(`Listening on port ${port}`));
